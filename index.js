const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const cors_proxy = require('cors-anywhere');

//Import Routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

//connect to DB
mongoose.connect(process.env.DB_CONNECT|| 'mongodb+srv://webAuthenUser:27065124@ckmmongodb-vgxt7.azure.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true },
    () => console.log('Successfully connected to DB!')
);
mongoose.set('useFindAndModify', false);

//cors options
const corsOptions = {
  preflightMaxAge: 5, //Optional
  origins: ['localhost:4200'],
  allowHeaders: ['*'],
  credentials:true,
  allowmethods:['GET', 'PUT', 'POST','DELETE','PATCH','OPTIONS'],
  exposeHeaders: ['*']
}

app.use(function(req, res, next) { 
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

//Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);


const listen_port = process.env.PORT || 8080;

const host = process.env.HOST || '0.0.0.0';
/*
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(listen_port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + listen_port);
});
*/
app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));