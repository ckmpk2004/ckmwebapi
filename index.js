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


//Middleware
app.use(express.json());
app.use(cors());

//Route Middleware
app.use('/', authRoute);
app.use('/games', gameRoute);


listen_port = 3000;
app.listen(3000, () => console.log('Backend server start up at port '+ listen_port));