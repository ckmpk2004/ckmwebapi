const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
var bodyParser= require('body-parser');
const cors = require('cors');

//cors options

app.use(bodyParser.json());
app.use(cors());

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

app.listen(listen_port, () => console.log('Backend server start up at port '+ listen_port));