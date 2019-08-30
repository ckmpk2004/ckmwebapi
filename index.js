const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

//cors options
const corsConfig = {
    origin: ["http://localhost:4200","https://ckmpk2004.github.io"],
    allowedHeaders: [
    'Access-Control-Allow-Origin',
    'Content-Type',
    'access-control-allow-credentials',
    'X-Requested-With',
    'Accept',
    'Authorization',
    'Access-Control-Allow-Methods',
    'auth-token'],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};

//Import Routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => console.log('Successfully connected to DB!')
);
mongoose.set('useFindAndModify', false);


//Middleware
app.use(express.json());
app.use(cors(corsConfig));
app.options('*', cors(corsConfig));

//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);

//Express server open
const listen_port = process.env.PORT || 8080;
app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));