/**
 * Created by richard on 16/6/11.
 */
const User = require('../models/user');
const config = require('../config/database');
const jwt = require('jwt-simple');
module.exports = {
    authenticate: function (req, res) {
        User.findOne(
            {username: req.body.username},
            function (err, user) {
                if (err) throw err;

                if (!user) {
                    res.send({success: false, msg: 'Authentication failed. User not found.'});
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
            {username: req.body.username},
            function (err, user) {
                if (user) {
                    res.json({success: false, msg: 'reduplicate username'});
                } else {
                    if (req.body.username && req.body.password) {
                        user = new User(
                            {
                                username: req.body.username,
                                password: req.body.password
                            }
                        );
                        user.save(function (err) {
                            if (err)
                                res.send(err);
                            var token = jwt.encode(user, config.secret);
                            res.json({success: true, user: user, token: 'JWT '+token});
                        })
                    }
                }
            }
        );
    }
}
