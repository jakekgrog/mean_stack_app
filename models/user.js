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
    avatar: {type:String, require: false, default:'data:image/jpeg;base64,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84f2h4Yofidq3l8m4s9Pum56n+yuSM/5x0r6Hh6s1inhr3Vnp5+7dp2ta2/n62PJzOjzLmXXTvqrenlrt3t18Kooor7c8UKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooA/RD9mb/knA/wCw5qf81r6EH/LT8f6189/szf8AJOB/2HNT/mtfQg/5afj/AFr8wzD/AJGWM/xn01D/AHeP9dSSiiiuY6gooooAKKKKACiiigAooooAKKKKACiiigAr86P2krK6T4lzXskObHUNNsFtrn0ZNNKt2/vKefbrX6L18H/tXf8AI0eGf+wL/wC5IV7HD7tmkF3jb/0l/ocWM/3f5L9D5Xooor9APnAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD9EP2Zv+ScD/sOan/Na+hB/wAtPx/rXz3+zN/yTgf9hzU/5rX0IP8Alp+P9a/MMw/5GWM/xn01D/d4/wBdSSiiiuY6gooooAKKKKACiiigAooooAKKKKACiiigAr4P/au/5Gjwz/2Bf/ckK+8K+D/2rv8AkaPDP/YF/wDckK9Xh7/kaR9Zfkjixn+7/JfofK9FFFfoZ84FFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfoh+zN/yTgf8AYc1P+a19CD/lp+P9a+dv2Y/+Scr/ANh3Uv6V9Ej/AJafj/WvzHMVbM8X/iT+9I+mof7vH+upJRRRXKdQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV8IftX/8jP4X/wCwJ/7k6+76+EP2r/8AkZ/C/wD2BD/6dK9PI/8AkaU/Rfkzixn+7/JfofK1FFFfop84FFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUV9I/s9fD/QfFl/r2r+IrODVLPSPsFra6dcc2K32rAksADz2GOSC4OOorkx1f6rhvrL1asmrq921a703vbda9jahQ+saba/Nd/60/wAvcP2Zv+SdTHsPFGok/wDlJ/z7446V9KlckHJ755PP68YPIxXPaJ4f0fw5Yf2doenQaXZ+f5/2W1GEySMkjJPJAGCx4H57zE4U5Pf2+n6V+b4qp7fESrpP3pSbvv736LXS+uh9HQh7KhFev4WSX5f8AlooorI3CiiigAooooAKKKKACiiigAooooAKKKKAGqu3nOa+E/2q/wDkaPDg9NBP66tu/r+ea+6icDpgtnPOf89favJPHnws8OePDBeauL03en6be2umfZ7o2VnZhu5Crwc45zgKGPyqoNdmVVlhsXDEVlaN7JL5Wv8ALVnLjKHt6EtbWejv/Xkz8xqKkuIfKuJoev2f9f8APpjr7VHX6XF80VLuk/vVz5kKKKKYBRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAV9R/srSSnxX4jg82YxHQjdDd0ydR0rtjuMg+xbrXy5X0Z+zLqkNr47vNO8k+fq+hX9t9pGP9Ewf7Zx2HPTn8egry81/wCRdjLdHB/dyt/PT7/M3wLaxKt/N+rP0Mooor87PqQooooAKKKKACiiigAooooAKKKKACiiigAooooAKa/3G/3W/kadWDrkslvomsXke3zbfTb+5H+9HpzHj6FfU9B16VUVeUVteSX3sT2fo/yPyPv/APj/ALz/AK+tR/pVWpZJfNlmmlH77t/np7/mair9Tp/w6f8Agj/6Sj5F7v1f5hRRRViCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAr2j4BanZ6X8T9H+0mdRf299ptqf+ohqrBiOx7Ef5zXi9aGl6peaNf2esWE3k3mn3X2q1uj3/T88f/qxxVD6xhJ4fZuMunW2/Trfre/3nRQdpRd7e9+h+xFFcp4T1208R6Bp2rWl3bXwuLYefcWwBBvAFDDA5ByW4I6Y5wcV1dfl0ouLcXunZ/1+R9PHZei/IKKKKQwooooAKKKKACiiigAooooAKKKKACiiigBhBJUZI5b+uP0ry/4q6rc6F4B8V6jY83sGmAAHB51QjSlOCD03ZBAGMBhXqRGRivkz9pbxrDYaFD4StZ5v7R1e4We4+z3IBGngncQfRiFwoxgKOua68DQdfFU4pdY38kpK/Xrt5bnPWreww7d90ui+f6X+/ufDdFFFfpcdIxX91fkfLhRRRVAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB9Pfs0+MdRtvFH/AAiB8qfR9XttRugZutnqGk4yB2wcZOemAQQQCPvnAxjt/k1+S3gDWJdC8Z+HNRjGRBqenqR2PUYPrkHmv1jJIUY5BHQd/m//AFV8DxDhlh8XdaKVpPS1tlfzff0se5llXmw+t2466vy+e+//AACeiiivFPUCiiigAooooAKKKKACiiigAooooAKKKKAMjUbkWFhdajLwLG2v7nAx/Blx/wCg/l15r8sfHfjHUvHfiO78R30MMEs+LS0trYn/AEPTxnliSSTgcknJOSx5Nfenx71caN8NNdITMuoCz0vHY+Y6tnP+ztIHPc1+bFfU8O4a98U1s1r0srO3z7eTPDzSvtQX9fD5+n4OwUUUV9eeWFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAWrO6+wXlleRf663uvtXP5+3v1x+PFfrT4f1SDXNE03V7WaKaK/tbK4VoDkEsFbJ5yQD3OMAHFfkZX3j+zd43OseHJfC19LB9t0H5dNgUhWutNw21uR8xViBgjgEk5AxXznElD22Hjil0dmuqjonpbul10Su72R6eWV17dxduVpWu7Ley69vT9D6mHQfQfypaKK+KPdCiiigAooooAKKKKACiiigAooooAKKKz55obSCa8mPkQwwG5uccdFJOfphs+p6+tNK7SW7aX36AfHP7U3iOGW48O+Fo/8AXQk6rc47AdPXjv8AU9+K+Pa774leMP8AhOvGWo65FF5EM4+y2pJ66fpGSc9PmJz9fxrga/SsnoewwUaDilJpOXZN2uvOzv6+Vj5WvW9virdE9e1l5/5rswooortMQooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigArufh54xm8E+KtO8RxnEEANpqluCM3en4xkHnBHY9R/PhqKyxGHWKi4te61ytPa1vzKjLllF9mn9zv8A1c/XvQ9a0/xFpdnrGmTCez1C3FzbNxyMDkYPXJxjj24Nbtfnz8APiVq+jeJNN8IzH7boWvXX2W1gGP8AiTX+QSM4PDYGR04B6gGv0CYlRx1J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'},
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
