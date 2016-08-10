/**
 * Created by richard on 16/6/11.
 */
const User = require('../models/user');
const config = require('../config/database');
const jwt = require('jwt-simple');
const smtpTransport = require('../config/smtpTransport').smtpTransport;
const randomCode = require('../util/util').randomCode;
module.exports = {
    authenticate: function (req, res) {
        User.findOne(
            {username: req.body.username, status: 1},
            function (err, user) {
                if (err) throw err;
                if (!user) {
                    res.send({
                        success: false, msg: 'Loging failed. ' +
                        'User is not found or user is not activated.'
                    });
                } else {
                    user.comparePassword(req.body.password, function (err, isMatch) {
                        if (isMatch && !err) {
                            var token = jwt.encode(user, config.secret);
                            res.json({success: true, token: 'JWT ' + token});
                        } else {
                            res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                        }
                    })
                }
            }
        )
    },

    register: function (req, res) {
        User.findOne(
            {
                $or: [
                    {username: req.body.username},
                    {email: req.body.email}
                ]
            },
            function (err, user) {
                if (user) {
                    res.json({
                        success: false,
                        msg: 'reduplicate username or email'
                    });
                } else {
                    if (req.body.username && req.body.password && req.body.email) {
                        user = new User(
                            {
                                username: req.body.username,
                                password: req.body.password,
                                email: req.body.email,
                                status: 0,
                                verify_code: randomCode(),
                                create_time: new Date()
                            }
                        );
                        user.save(function (err) {
                            if (err)
                                res.send(err);
                            else {
                                user.sendVerify(req, res);
                            }
                        })
                    }
                }
            }
        );
    },
    sendVerify: function (req, res) {
        User.findOne(
            {
                username: req.body.username,
                status: 0
            },
            function (err, user) {
                if (user) {
                    user.sendVerify(req, res);
                } else {
                    res.json({
                        success: false,
                        msg: 'user can not find'
                    });
                }
            }
        )
    },

    emailVerify: function (req, res) {
        User.findOne(
            {verify_code: req.query.code, status: 0},
            function (err, user) {
                if (user) {
                    user.status = 1;
                    User.update({_id: user._id}, {status: 1},
                        function (err, raw) {
                            if (err) {
                                res.json({success: false, msg: 'error during verify'})
                            }
                            console.log(raw);
                            var token = jwt.encode(user, config.secret);
                            res.json({success: true, user: user, token: 'JWT ' + token});
                        }
                    );

                } else {
                    res.json({success: false, msg: 'Invalid verify link!'})
                }
            }
        )
    }
}
