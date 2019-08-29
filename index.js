const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

//connect to DB
mongoose.connect(process.env.DB_CONNECT|| 'mongodb+srv://webAuthenUser:27065124@ckmmongodb-vgxt7.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true },
    () => console.log('Successfully connected to DB!')
);
mongoose.set('useFindAndModify', false);

//cors options
app.all('*', function(req, res, next) {
    var origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const corsOptions = {
  preflightMaxAge: 5, //Optional
  origins: ['localhost:4200'],
  allowHeaders: ['*'],
  credentials:true,
  allowmethods:['GET', 'PUT', 'POST','DELETE','PATCH','OPTIONS'],
  exposeHeaders: ['*']
}


//Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);


const listen_port = process.env.PORT || 8080;
app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));