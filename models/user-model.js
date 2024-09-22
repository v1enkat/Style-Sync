const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/F1lash")

const userSchema = mongoose.Schema({
    picture: String,
    fullname: String,
    email: String, // Corrected typo here
    password: String,

    cart: [
        {
       type: mongoose.Schema.Types.ObjectId,
       ref:"products"
    }
],

    isadmin: Boolean,
    orders: {
        type: Array,
        default: [],
    }
});


module.exports = mongoose.model("users",userSchema);