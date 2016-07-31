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
        create_time:{
            type:Date,
            required:true
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


module.exports = mongoose.model('User', UserSchema);