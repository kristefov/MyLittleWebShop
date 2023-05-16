<<<<<<< HEAD
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
=======
const router = require("express").Router();
const { User, Product, Cart } = require("../../models");

router.get("/", async (req, res) => {
  
  try {
    const cartData = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    console.log(cartData);
    res.status(200).json(cartData);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
    
  try {

    const cartData = await Cart.create(req.body, {
      
      include:[{ model:Product}]
      
    });
   
    res.status(200).json(cartData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const cartData = await Cart.update(
      {
        id: req.body.product.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!cartData) {
      res.status(400).send("No product with that ID");
    }
    res.status(200).json(cartData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const cartData = await Cart.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!cartData) {
      res.status(400).send("Cart Empty");
    }
    res.status(200).json(cartData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
>>>>>>> 30dc35061c3d702a6ccf4200e7b161809aabb423
