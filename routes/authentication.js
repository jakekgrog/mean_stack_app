const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {

    //Back-end registration authentication
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an email'});
        } else {
            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide a username' });
            } else {
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' });
                } else {
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password,
                        phone: req.body.phone,

                    });
                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.json({ success: false, message: 'Username or email already exist'});
                            } else {
                                if (err.errors) {
                                    if(err.errors.email) {
                                        res.json({ success: false, message: err.errors.email });
                                    } else {
                                        if (err.errors.username) {
                                            res.json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if (err.errors.password) {
                                                res.json( { success: false, message: err.errors.password.message });
                                            } else {
                                                res.json({ success: false, message: err });
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success: false, message: 'Could not save user. Error: ', err});
                                }
                            }
                        } else {
                            res.json({ success: true, message: 'User saved!' });
                        }
                    });

                }
            }
        }

    });

    //Get user email
    router.get('/checkEmail/:email', (req, res) => {
        if (!req.params.email) {
            res.json({ success: false, message: 'Email was not provided' })
        } else {
            User.findOne({ email: req.params.email.toLowerCase()}, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Email already taken' });
                    } else {
                        res.json({ success: true, message: 'Email is available' });
                    }
                }
            });
        }
    });

    //check user username
    router.get('/checkUsername/:username', (req, res) => {
        if (!req.params.username) {
            res.json({ success: false, message: 'Username was not provided' })
        } else {
            User.findOne({ username: req.params.username.toLowerCase()}, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err });
                } else {
                    if (user) {
                        res.json({ success: false, message: 'Username already taken' });
                    } else {
                        res.json({ success: true, message: 'Username is available' });
                    }
                }
            });
        }
    });

    //Login Authentication
    router.post('/login', (req, res) => {
        if (!req.body.username) {
            res.json({ success: false, message: 'Username was not provided' });
        } else {
            if (!req.body.password) {
                res.json({ success: false, message: 'Password was not provided' });
            } else {
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        if (!user) {
                            res.json({ success: false, message: 'Username not found' });
                        } else {
                            const validPassword = user.comparePassword(req.body.password);
                            if (!validPassword) {
                                res.json({ success: false, message: 'Password doesnt match' });
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h'});

                                res.json({ success: true, message: 'Successfully logged in', token: token, user: { username: user.username } });
                            }
                        }
                    }
                })
            }
        }
    });

    router.use((req, res, next) => {
        const token = req.headers['authorization'];
        if (!token) {
            res.json({ success: false, message: 'No token provided' });
        } else {
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        }
    });

    router.get('/profile/edit', (req, res) => {
        res.json({ success: true, message: req.decoded.userId });
    });




    //Profile route Authentication
    router.get('/profile', (req, res) => {
        User.findOne({ _id: req.decoded.userId }).select('username email phone').exec((err, user) => {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!user) {
                    res.json({ success: false, message: 'Could not find user' })
                } else {
                    res.json({ success: true, user: user});
                }
            }
        })
    });


    return router;
}
