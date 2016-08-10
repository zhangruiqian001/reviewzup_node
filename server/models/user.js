const mongoose = require('mongoose');
const config = require('../config/database');
const smtpTransport = require('../config/smtpTransport').smtpTransport;
var UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        //status:0 initial, 1 activated
        status: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        verify_code: {
            type: String,
            required: true
        },
        create_time: {
            type: Date,
            required: true
        }
    }
);

UserSchema.methods.comparePassword = function (passw, cb) {
    if (passw == this.password) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
UserSchema.methods.sendVerify = function (req, res) {
    var link = "http://" + req.get('host') + "/api/verify?code=" + this.verify_code;
    var mailOptions = {
        to: this.email,
        from: config.emailSender,
        // from: config.emailSender,
        sender: 'reviewzup',
        subject: "Please confirm your Email account",
        html: "Hello,<br> Please Click on the link to verify your email.<br>" +
        "<a href=" + link + ">Click here to verify</a>"
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Message sent: " + response);
        }
    });
    res.json({
        success: true, msg: 'A verify email has send.' +
        ' Please check and activate account'
    });
}

module.exports = mongoose.model('User', UserSchema);