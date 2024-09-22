const express= require("express");
const router = express.Router();

const uploat = require("../configs/multer-config");
const upload = require("../configs/multer-config");
const productModel = require("../models/product-model");
const isloggedin = require("../middleware/isloggedin");



router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let { name,categorie, textcolour, price, bgcolour, panelcolour } = req.body;
        let product = await productModel.create({
            name,
            textcolour,
            price,
            categorie, 
            bgcolour, 
            panelcolour, 
            image: req.file.buffer
        });
        req.flash("success", "Product Created Successfully");
        res.redirect("/owner/admin");
    } catch (error) {
        res.send(error.message);
    }
});
 
  
  router.get('/',isloggedin , async (req, res) => {
    try {
        const products = await productModel.find({}); 
        const specificCategory = 'women';
        let success = req.flash("success");
        res.render('products', { products,success ,specificCategory}); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');  
    }
});
 
   
router.get('/shop',isloggedin , async (req, res) => {
    try {
        const products = await productModel.find({}); 
        let success = req.flash("success");
     const specificCategory = 'bags';
        res.render('shop', { products,success ,specificCategory}); 
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');  
    }
});




module.exports = router; 