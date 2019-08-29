const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

//Import Routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => console.log('Successfully connected to DB!')
);
mongoose.set('useFindAndModify', false);

//cors options
const corsOptions = {
  preflightMaxAge: 5, //Optional
  origins: ['localhost:4200'],
  allowHeaders: ['Authorization'],
  credentials:true,
  allowmethods:['GET', 'PUT', 'POST','DELETE','PATCH','OPTIONS'],
  exposeHeaders: ['Authorization']
}


//Middleware
app.use(express.json());
app.use(cors(corsOptions));

//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);


listen_port = process.env.PORT;
app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));