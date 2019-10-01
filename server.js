const express = require('express');
const app = express();
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

//Passport Config
require('./config/passport')(passport);

// Cennect Database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.get('/', (req, res) => res.send('Server Running'));
app.use('/users', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Hello world!'));
