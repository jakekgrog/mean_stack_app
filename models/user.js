const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

//check our if our email exists and is within 5-30 chars.
let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true
        }
    }
};

//check if our email is valid with regex. (At least one Upper,Symbol & Number / 8-35 characters )
let validEmailChecker = (email) => {
    if (!email) {
        return false;
    } else {
        const regex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regex.test(email);
    }
};


const emailValidators = [
    {
        validator: emailLengthChecker,
        message: 'Email must be between 5 and 30 characters'
    },
    {
        validator: validEmailChecker,
        message: 'Must be a valid email'
    }
];

//check our usename isn't blank / 3-15 chars
let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return true;
        }
    }
};

//check username against some simple regex
let validUsernameChecker = (username) => {
    if  (!username) {
        return false;
    } else {
        const regex = new RegExp(/^[a-zA-Z0-9]+$/);
        return regex.test(username);
    }
};

//username validators use our validator functions / spit out message on failure.
const usernameValidators = [
    {
        validator: usernameLengthChecker,
        message: "Username must be between 3 and 15 characters"
    },
    {
        validator: validUsernameChecker,
        message: 'Username must not have any special characters',
    },
];

//check our password is 8 - 35 chars
let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return true;
        }
    }
};

//check our password isn't empty and uses a cap, a symbol, a number
let validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regex.test(password);
    }
}

//password validators using password functions
const passwordValidators = [
    {
        validator: passwordLengthChecker,
        message: 'Password must be between 8 and 35 characters'
    },
    {
        validator: validPasswordChecker,
        message: 'Password must contain atleast one uppercase, lowercase, special character and number'
    }
];

//db schema with email/username/password fields.
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators }
});


userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema)
