const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else {
        if (email.length < 5 || email.length > 30) {
            return false;
        } else {
            return true;
        }
    }
};

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

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else {
        if (username.length < 3 || username.length > 15) {
            return false;
        } else {
            return true;
        }
    }
};

let validUsernameChecker = (username) => {
    if  (!username) {
        return false;
    } else {
        const regex = new RegExp(/^[a-zA-Z0-9]+$/);
        return regex.test(username);
    }
};

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

let passwordLengthChecker = (password) => {
    if (!password) {
        return false;
    } else {
        if (password.length < 8 || password.length > 35) {
            return false;
        } else {
            return true;
        }
    }
};

let validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        const regex = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regex.test(password);
    }
}

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


let validPhoneChecker = (phone) => {
    const regex = new RegExp(/^\d{0,10}$/);
    return regex.test(phone);
}

const phoneValidators = [
    {
        validator: validPhoneChecker,
        message: 'Phone number must be no more than 10 digits.'
    }
]

let bioLengthChecker = (bio) => {
    return bio.length < 300;
}

const bioValidators = [
    {
        validator: bioLengthChecker,
        message: 'Your bio must be shorter than 300 characters!'
    }
]

let websiteLengthChecker = (website) => {
    return website.length < 30;
}

const websiteValidators = [
    {
        validator: websiteLengthChecker,
        message: "Your website must be shorter than 30 characters."
    }
]

//defines a user model
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    password: { type: String, required: true, validate: passwordValidators },
    phone: {type:String, required:false, default:''},
    website: {type:String, required:false, default:''},
    bio: {type:String, required:false, default:''},
    isAdmin: {type: Number, required: false, default: 0 },
});

//Hashes password before saving to database.
userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema)
