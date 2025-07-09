require('dotenv').config();
const express    = require('express');
const cors       = require('cors');
const passport   = require('passport');
const connectDB  = require('./config/db');
require('./config/passport');

const authRoutes  = require('./routes/auth');
const scoreRoutes = require('./routes/scores');
const lecturerRoutes = require('./routes/lecturer');
const studentRoutes = require('./routes/student');
const usersRoutes = require('./routes/users');

(async () => {
  await connectDB();
  const app = express();

  app.use(express.json()); // <-- Moved to the top, before any custom middleware

  // Print all users for debugging
  const User = require('./models/User');
  User.find().then(users => {
    console.log('All users in DB:');
    users.forEach(u => {
      console.log(`- ${u.email} / ${u.password} / verified: ${u.isVerified} / role: ${u.role}`);
    });
  });

  // Log all incoming requests and their bodies
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  });

  app.use(passport.initialize());
  app.use(cors());

  app.use('/api/auth',  authRoutes);
  app.use('/api/scores', scoreRoutes);
  app.use('/api/lecturer', lecturerRoutes);
  app.use('/api', studentRoutes);
  app.use('/api/users', usersRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
})();