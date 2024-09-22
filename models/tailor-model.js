const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/F1lash")

const tailorSchema = mongoose.Schema({
    picture: String,
    fullname: String,
    email: String,
    password: String,

    cart: [
        {
       type: mongoose.Schema.Types.ObjectId,
       ref:"product"
    }
],

    isadmin: Boolean,
    orders: {
        type: Array,
        default: [],
    }
});


module.exports = mongoose.model("tailor",tailorSchema);