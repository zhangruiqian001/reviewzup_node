/**
 * Created by richard on 16/7/31.
 */
var nodemailer = require("nodemailer");
const config = require('./database');
exports.smtpTransport = nodemailer.createTransport(
    {
        host: 'smtp-mail.outlook.com',
        port: 587,
        requireTLS:true,
        // secure: true, // use SSL 
        auth: {
            user: config.emailSender,
            pass: config.emailSecret
        }
    }
)
