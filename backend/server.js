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

(async () => {
  await connectDB();
  const app = express();

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
    if (req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        if (body) {
          try { console.log('Request body:', JSON.parse(body)); } catch { console.log('Request body:', body); }
        }
        next();
      });
    } else {
      next();
    }
  });

  app.use(passport.initialize());
  app.use(cors());
  app.use(express.json());

  app.use('/api/auth',  authRoutes);
  app.use('/api/scores', scoreRoutes);
  app.use('/api/lecturer', lecturerRoutes);
  app.use('/api', studentRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
})();