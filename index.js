const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var bodyParser= require('body-parser');
var cors = require('cors');
const cors_proxy = require('cors-anywhere');

//cors options
const corsOptions = {
    preflightMaxAge: 5, //Optional
    origins: ['localhost:4200'],
    allowHeaders: ['Authorization', 'Access-Control-Allow-Origin'],
    credentials:true,
    allowmethods:['GET', 'PUT', 'POST','DELETE','PATCH','OPTIONS'],
    exposeHeaders: ['Authorization', 'Access-Control-Allow-Origin']
  }

app.use(bodyParser.json());
app.use(cors(corsOptions));

//Import Routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

//connect to DB
mongoose.connect(process.env.DB_CONNECT|| 'mongodb+srv://webAuthenUser:27065124@ckmmongodb-vgxt7.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true },
    () => console.log('Successfully connected to DB!')
);
mongoose.set('useFindAndModify', false);


//Middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
   });
app.use(express.json());


//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);


const listen_port = process.env.PORT || 8080;

app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));