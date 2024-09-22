const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/F1lash")

const productSchema = mongoose.Schema({
    image:Buffer,
    name:String,
    textcolour:String,  
    categorie:String,
    price:Number, 
    
    bgcolour:String,
    panelcolour:String

})

module.exports = mongoose.model("products",productSchema);