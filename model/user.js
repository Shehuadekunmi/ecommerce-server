const mongoose = require("mongoose")


const userSchema = new mongoose.Schema ({
    firstName:{
        type: String,
        required: true,
        unique: true
    },
    lastName:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required: true
    }

}, {timestamps: true} );


module.exports = mongoose.model('User', userSchema)