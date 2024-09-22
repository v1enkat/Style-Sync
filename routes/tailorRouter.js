const express = require('express');
const router = express.Router();
const {registeruser,login,logout, registertailor} = require("../controllers/registerTailor");
const isloggedin = require('../middleware/isloggedin');
const ProductModel = require("../models/product-model");


router.get('/',isloggedin , async (req, res) => {
  try { 
      const products = await ProductModel.find({}); 
      let success = req.flash("success");
   const specificCategory = 'tailor';
      res.render('tailor', { products,success ,specificCategory}); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');  
  }
});
router.get('/tailorview/:productid', isloggedin, async (req, res) => {
  try { 
       
      const product = await ProductModel.findById(req.params.productid); 
      
      const specificCategory = 'tailor';
      res.render('tailorview', { product, specificCategory }); 
  } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');  
  }
});
  

 
router.post('/register', registertailor);
router.post('/login', login);
router.get('/logout', logout);
 

module.exports = router;
