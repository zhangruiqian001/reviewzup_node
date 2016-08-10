/**
 * Created by richard on 16/7/31.
 */
var nodemailer = require("nodemailer");
const config = require('./database');
exports.smtpTransport = nodemailer.createTransport(
    {
        host: 'smtp.163.com',
        port: 25,
        requireTLS:true,
        // secure: true, // use SSL 
        auth: {
            user: config.emailSender,
            pass: config.emailSecret
        }
    }
)
