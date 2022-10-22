const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
// error handling function
const handleErrors = (err) => {
    //evaluate the error objects that comes from User model and return a more useful object which can be sent as a JSON to the user
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    // duplicate error code
    if(err.code === 11000) {
        errors.email = 'This email already exists';
        return errors;
    }

    // validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });

        return errors;
    }
}

const maxAge = 3*24*60*60;
const createToken = (id) => {
    return jwt.sign({id}, 'samarth secret key', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) => {
    res.render('signup');
}

module.exports.signup_post = async (req, res) => {
    const {email, password} = req.body;
    // create a new user and place it in the User model in the database

    try{
        const user = await User.create({ email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000});
        res.status(201).json({user: user._id});
    }

    catch (err) {         // error handling
        const errors = handleErrors(err);
        res.status(201).json({ errors });
    }
}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.login_post = async (req, res) => {
    const {email, password} = req.body();

    console.log(email, password);
    res.send('user login');
}