const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cokie-parser');
const handlebars = require('handlebars');

const mongoURI = require('./config/keys').mongoURI;
mongoose.connect(mongoURI, {useNewUrlParser: true});
// Passport Config
require('./config/passport')(passport);

app.use(function(req, res, next){
  res.locals.user = req.user || null;
  next();
});
app.engine('handlebars', exhbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Load Routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const app = express();
app.use(cookieParser);
app.use(session({
  secret: 'secret',
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());



// Use Routes
app.use('/auth', auth);
app.use('/',  index);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
});