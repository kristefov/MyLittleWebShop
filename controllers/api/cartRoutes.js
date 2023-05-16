const router = require('express').Router();
const sequelizeOP = require("sequelize").Op; 
const { Cart, Product, User, Category, Tag, ProductTag } = require('../../models');

router.post("/", async (req, res) => {
    try {
        const cartData = await Cart.create(req.body);
       
    
          res.status(200).json({ logged_in: true, user: req.session.user_id, cart: cartData, message: 'Added to cart !' });
        
      } catch (err) {
        res.status(400).json(err);
      }
});

module.exports = router;