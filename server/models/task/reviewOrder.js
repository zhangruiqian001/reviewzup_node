/**
 * Created by richard on 16/7/3.
 */


const mongoose = require('mongoose');
var ReviewOrderSchema = new mongoose.Schema(
    {
        orderNo: {
            type: String,
            unique: true,
            required: true
        },
        url:{
            type: String,
            unique:true,
            required:true
        },
        reviewNumber:{
            type:Number,
            unique:false,
            required:true
        },
        owner:{
            type: String,
            unique:false,
            required:true
        },
        totalPrice:{
            type:Number,
            require:true
        }
    }

);
module.exports = mongoose.model('ReviewOrder', ReviewOrderSchema);
