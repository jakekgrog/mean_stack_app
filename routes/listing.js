const User = require('../models/user');
const Listing = require('../models/listing');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    router.post('/newListing', (req, res) => {
        if (!req.body.title) {
            res.json({ success: false, message: 'Listing title is required' });
        } else {
            if (!req.body.body) {
                res.json({ success: false, message: 'Listing body required'});
            } else {
                if (!req.body.createdBy) {
                    res.json({ success: false, message: 'Listing creator is required' });
                } else {
                    const listing = new Listing({
                        title: req.body.title,
                        body: req.body.body,
                        createdBy: req.body.createdBy
                    });
                    listing.save((err) => {
                        if (err) {

                            if (err.errors) {
                                if (err.errors.title) {
                                    res.json({ success: false, message: err.errors.title.message });
                                } else {
                                    if (err.errors.body) {
                                        res.json({ success: false, message: err.errors.body.message });
                                    } else {
                                        if (err.errors.createdBy) {
                                            res.json({ success: false, message: err.errors.createdBy.message });
                                        } else {
                                            res.json({ success: false, message: err.errmsg });
                                        }
                                    }
                                }
                            } else {
                                res.json({ success: false, message: 'Couldnt create Listing: ' + err });
                            }              
                        } else {
                            res.json({ success: true, message: 'Listing created successfully!!'})
                        }
                    });
                }
            }
        }
    });

    return router;
};