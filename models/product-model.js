const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://v1enkat:12345678venkat@cluster0.q8vx9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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