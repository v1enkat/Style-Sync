const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://v1enkat:12345678venkat@cluster0.q8vx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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