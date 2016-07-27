const mongoose = require('mongoose');

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
        }
    }
);

UserSchema.methods.comparePassword = function (passw, cb) {
    if (passw == this.password) {
        cb(null, true);
    }else{
        cb(null, false);
    }
}

module.exports = mongoose.model('User', UserSchema);