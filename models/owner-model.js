const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect("mongodb+srv://v1enkat:12345678venkat@cluster0.q8vx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")



const ownerSchema = mongoose.Schema({
    name:String,
    mial:String,
    password:String,
    products: {
        type: Array,
        default:[],
    },
    gstin:String,
    picture:String

})


module.exports = mongoose.model("owner",ownerSchema);