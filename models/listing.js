const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

let titleLengthChecker = (title) => {
    if (!title) {
        return false;
    } else {
        if (title.length < 5 || title.length > 80) {
            return false;
        } else {
            return true;
        }
    }
};

let validTitleChecker = (title) => {
    if (!title) {
        return false;
    } else {
        const regex = new RegExp(/^[a-zA-Z0-9 ]+$/);
        return regex.test(title);
    }
};

const titleValidators = [
    {
        validator: titleLengthChecker,
        message: 'title must be between 5 and 50 characters'
    },
    {
        validator: validTitleChecker,
        message: 'Must be a valid title'
    }
];

let bodyLengthChecker = (body) => {
    if (!body) {
        return false;
    } else {
        if (body.length < 5 || body.length > 5000) {
            return false;
        } else {
            return true;
        }
    }
};

const bodyValidators = [
    {
        validator: bodyLengthChecker,
        message: "Body must be between 5 and 5000 characters"
    }
];

let commentLengthChecker = (comment) => {
    if (!comment[0]) {
        return false;
    } else {
        if (comment[0].length < 1 || comment[0].length > 500) {
            return false;
        } else {
            return true;
        }
    }
};

const commentValidators = [
    {
        validator: commentLengthChecker,
        message: 'Review must not exceed 500 characters'
    }
];

const listingSchema = new Schema({
    title: { type: String, required: true, validate: titleValidators },
    body: { type: String, required: true, validate: bodyValidators },
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
    reviews: [
        {
            comment: { type: String, validate: commentValidators },
            rating: { type: Number },
            commentator: { type: String }
        }
    ]
});

module.exports = mongoose.model('Listing', listingSchema);