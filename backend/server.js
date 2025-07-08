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