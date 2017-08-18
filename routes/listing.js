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

    router.get('/allListings', (req, res) =>{
        Listing.find({}, (err, listings) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!listings) {
                    res.json({ success: false, message: 'No Listings found.' });
                } else {
                    res.json({ success: true, listings: listings });
                }
            }
        }).sort({ '_id': -1 });
    });


    router.get('/singleListing/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No listing ID was provided' });
        } else {
            Listing.findOne({ _id: req.params.id }, (err, listing) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid listing ID' });
                } else {
                    if (!listing) {
                        res.json({ success: false, message: 'Listing not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) =>{
                            //console.log(req);
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate User' });
                                } else {
                                    if (user.username !== listing.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to Edit this listing!' });
                                    } else {
                                        res.json({ success: true, listing: listing });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        } 
    });

    router.get('/viewListing/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No Listing ID provided!' });
        } else {
            Listing.findOne({ _id: req.params.id }, (err, listing) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid listing ID!' });
                } else {
                    if (!listing) {
                        res.json({ success: false, message: 'Listing was not found' });
                    } else {
                        res.json({ success: true, listing: listing });
                    }
                }
            });
        }
    });

    router.put('/updateListing', (req, res) => {
        if (!req.body._id) {
            res.json({ success: false, message: 'No Listing ID provided!' });
        } else {
            Listing.findOne({ _id: req.body._id }, (err, listing) => {
                console.log(req.body);
                if (err) {
                    res.json({ success: false, message: 'Not a valid Listing ID' });
                } else {
                    if (!listing) {
                        res.json({ success: false, message: 'Listing was not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user' });
                                } else {
                                    if (user.username !== listing.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this listing' });
                                    } else {
                                        listing.title = req.body.title;
                                        listing.body = req.body.body;
                                        listing.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Listing updated successfully!' });
                                            }
                                        });
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
    });

    router.delete('/deleteListing/:id', (req, res) => {
        if (!req.params.id) {
            res.json({ success: false, message: 'No ID supplied' });
        } else {
            Listing.findOne({ _id: req.params.id }, (err, listing) => {
                if (err) {
                    res.json({ success: false, message: 'Invalid ID' });
                } else {
                    if (!listing) {
                        res.json({ success: false, message: 'Listing not found' });
                    } else {
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                if (!user) {
                                    res.json({ sucess: false, message: 'Unable to authenticate user.' });
                                } else {
                                    if (user.username !== listing.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to delete this listing post' });
                                    } else {
                                        listing.remove((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Listing removed' });
                                            }
                                        });
                                    }
                                }
                            }
                        })
                    }
                }
            })
        }
    });

    router.post('/review', (req, res) => {
        if (!req.body.review) {
            res.json({ success: false, message: 'No review provided' });
        } else {
            if (!req.body.id) {
                res.json({ success: false, message: 'No id was provided' });
            } else {
                Listing.findOne({ _id: req.body.id }, (err, listing) => {
                    if (err) {
                        res.json({ success: false, message: 'Invalid listing id' });
                    } else {
                        if (!listing) {
                            res.json({ success: false, message: 'No listing was found!' });
                        } else {
                            User.findOne({ _id: req.decoded.userId }, (err, user) => {
                                if (err) {
                                    res.json({ success: false, message: 'Something went wrong' });
                                } else {
                                    if (!user) {
                                        res.json({ success: false, message: 'User not found' });
                                    } else {
                                        listing.reviews.push({
                                            comment: req.body.review,
                                            rating: req.body.rating,
                                            commentator: user.username,
                                        });
                                        listing.save((err) => {
                                            if (err) {
                                                res.json({ success: false, message: 'Something went wrong' })
                                            } else {
                                                res.json({ success: true, message: 'Review saved successfully'});
                                            }
                                        });
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
    });

    return router;
};