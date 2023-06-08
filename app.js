require('dotenv').config();
const express = require('express');
const expressLayouts = require ('express-ejs-layouts');
const app = express();
const path = require('path');
const connectDB = require('./server/config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const port = 5000 || process.env.PORT;
const bodyParser = require('body-parser');

app.use(session({
secret:'ejemplo prueba',
resave: false,
saveUninitialized: true,
Store: MongoStore.create,
mongoURL: process.env.MONGODB_URI
}));
//middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//connect database
connectDB();
passport.authenticate();

//static files
app.use(express.static('public'));

//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));


//routes
app.use('/', require('./server/routes/auth'));
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));


//handle 404
app.get('*', function(req, res){
    res.status(404).render('404')
})

app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
})