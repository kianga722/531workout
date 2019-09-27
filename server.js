const express = require('express');
const bodyParser = require('body-parser');
// Express
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Passport
const passport = require('passport');

// Mongoose
const mongoose = require('mongoose');

// Mongo Config
const path = require('path');
const config = require('./utils/config');

// Controllers
const workoutsRouter = require('./controllers/workouts');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

// Connect to Mongo
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Passport config
require('./utils/passport')(passport);

// CORS
app.use(cors());
// Body Parser
app.use(bodyParser.json());
// Cookie Parser
app.use(cookieParser());
// Passport middleware
app.use(passport.initialize());

// Routing
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/workouts', passport.authenticate('jwt', { session: false }), workoutsRouter);

// Only for testing
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(process.env.PORT || config.PORT, () => console.log(`Server started on port ${config.PORT}`));
