
const router = require("express").Router();
const { User, Product, Cart } = require("../../models");

router.get("/", async (req, res) => {
  
  try {
    const cartData = await Cart.findAll({
      include: [
        {
          model: { User, Product },
         // attributes: ["id", "product_name", "price", "stock"],
         attributes: ["user_id","email","first_name","last_name","cart_id","product_id","quantity","price","stock","product_name","image_url"],
        },
      ],
    });
    const cartItems = cartData.map((product) => product.get({ plain: true }));
    console.log(cartItems);
    res.status(200).json(cartItems);

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
    
  try {

    const cartData = await Cart.create(req.body, {
      include: [
        {
        model: { User, Product }
      
    }]
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

