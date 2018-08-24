const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const routes = require('./routes');
const passport = require('./passport');
const dbConnection = require('./models') ;
const MongoStore = require('connect-mongo')(session);

const app = express();
const PORT = process.env.PORT || 3001;

// Route requires

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: dbConnection }),
		resave: false, //required
		saveUninitialized: false //required
	})
);

// Passport
app.use(passport.initialize());
app.use(passport.session()); // calls the deserializeUser

// Routes
app.use(routes);

// Starting Server 
app.listen(PORT, () => {
	console.log(`🌎 App listening on PORT: ${PORT}`)
});
