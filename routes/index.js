const express = require("express");
const isloggedin = require("../middleware/isloggedin");
const router = express.Router();
const userModel = require("../models/user-model");

router.get("/",(req,res)=>{
    let error = req.flash('error');
    res.render("index",{error});
});
 

router.get("/categories",(req,res)=>{
  
    res.render("categories");
});
 
router.get("/contact",(req,res)=>{
  
    res.render("contact");
});
 

router.get("/addtocart/:productid",isloggedin, async (req,res)=>{
   let user = await userModel.findOne({email: req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
   
    res.redirect("/products/shop");
});

router.get("/cart", isloggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");

    let error = req.flash('error');
    
    // Check if user is found
    if (!user) {
        return res.status(404).render("error", { message: "User not found" });
    }

    // Pass user and error to the render function
    res.render("cart", { user, error });
});

router.get("/index",isloggedin,(req,res)=>{
    res.render("index1");
})
router.get("/merlin",isloggedin,(req,res)=>{
    res.render("merlin");
})

module.exports = router;  