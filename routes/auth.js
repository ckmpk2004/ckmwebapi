const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');


//User Registation
router.post('/register', async (req, res) => {

    //Make Sure data is vaild before adding user
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Check duplicate email registration
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('This email is aleady registed');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error);
    }
});

//User Login
router.post('/login', async (req,res) => {
     //Make Sure data is vaild before adding user
     const {error} = loginValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message);
     
     //Check if the email exists
     const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(400).send('Email or password is wrong');

     //Check is the passsword correct
     const validPassword = await bcrypt.compare(req.body.password, user.password);
     if(!validPassword) return res.status(400).send('Email or password is wrong');

     //JWT Token
     const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
     res.status(200).send({token})

     //res.send('Successfully Login!');
});


module.exports = router;