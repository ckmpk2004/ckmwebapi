//User input Validation
const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = data =>{
    const schema = {
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
};

//Login Validation
const loginValidation = data =>{
    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema);
};

// new Game Validation
const gameValidation = data =>{
    const schema = {
        name: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        price: Joi.number().required()
    }
    return Joi.validate(data, schema);
};

// Change Game Validation
const gameChangeValidation = data =>{
    const schema = {
        name: Joi.string().min(1).required(),
        newName: Joi.string().allow(''),
        newDescription: Joi.string().min(1).required(),
        newPrice: Joi.number().required()
    }
    return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.gameValidation = gameValidation;
module.exports.gameChangeValidation = gameChangeValidation;