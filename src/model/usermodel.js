import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isverified : {
        type: Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default: false
    },
    forgotpasswordtoken : {
        type : String,
    },
    forgotpasswordtokenexpiry : {type : Date},
    verifytoken : {type : String},
    verifytokenexpiry : {type : Date}
}, {timestamps: true});
const User = mongoose.models.User || mongoose.model('User', userschema);

export default User;