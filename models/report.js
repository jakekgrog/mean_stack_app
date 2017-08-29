const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const User = require('../models/user');
const config = require('../config/database');

//username validators & checkers
let usernameExistsChecker = (username) => {
    User.findOne({ username: username.toLowerCase()}, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: true, message: 'User found' });
                    } else {
                        res.json({ success: true, message: 'User does not exist' });
                    }
                }
    });
}


const usernameValidators = [
    {
        validator: usernameExistsChecker,
        message: "Username does not exist!"
    }
]


//message validators & checkers
let messageLengthChecker = (message) => {
    return message.length < 300;
}

const messageValidators = [
    {
        validator: messageLengthChecker,
        message: 'Your report description must be less than 300 characters'
    }
]

//Define report schema
const reportSchema = new Schema ({
    username: {type: String,required:true,unique:true, lowercase:true,validate: usernameValidators},
    message: {type: String,required:true, validate:messageValidators},

});

module.exports = mongoose.model('Report', reportSchema)