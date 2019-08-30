const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var bodyParser= require('body-parser');
const cors = require('cors');


//cors options
const corsConfig = {
    origin: ["http://localhost:4200"],
    allowedHeaders: ['Access-Control-Allow-Origin','Content-Type',
    'access-control-allow-credentials','X-Requested-With','Accept','authorization',
    'access-control-allow-methods'],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE"
};
//cors
app.use(bodyParser.json());
app.use(cors(corsConfig));


//Import Routes
const authRoute = require('./routes/auth');
const gameRoute = require('./routes/games');

//connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },
    () => console.log('Successfully connected to DB!')
);
mongoose.set('useFindAndModify', false);


//Middleware
app.use(express.json());


//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);


const listen_port = process.env.PORT || 8080;
app.options('*', cors(corsConfig));
app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));