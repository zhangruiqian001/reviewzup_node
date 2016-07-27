const User = require('../models/user');

exports = module.exports = {
    getUsers: function (req, res) {
        console.log("loginUser:"+req.user);
        User.find(function (err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    },
    postUsers: function (req, res) {
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'New user has been added to reviewzup', data: user});
        })
    }
}
