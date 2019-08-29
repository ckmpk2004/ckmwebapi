const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
        min:6
    },
    description: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    price:{
        type: String,
        required: true,
        max: 255,
    }
});

module.exports = mongoose.model('Games', gameSchema);