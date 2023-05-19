const router = require("express").Router();
const { Op } = require("sequelize");
const { Product, Cart, CartProduct } = require("../../models");
// find all products and present them in the homepage
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
    const cartItems = cartData.map((product) => product.get({ plain: true }));

    res.status(200).json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//create a new cart
router.post("/", async (req, res) => {
  console.log(req);
  try {
    const cartData = await Cart.create(req.body);

    res.status(200).json(cartData);
    console.log(cartData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//add a product to a cart
router.post("/products", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      res.status(400).send("No product ID provided");
      return;
    }
    const cartData = await Cart.findByPk(req.session.cart_id);
    if (!cartData) {
      res.status(404).send("No product with that ID");
      return;
    }
    const cartProducts = await CartProduct.bulkCreate(
      req.body.map((product_id) => ({
        product_id,
        cart_id: cartData.id,
      }))
    );
    res.status(200).json(cartProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//deletes a product from a cart
router.delete("/products", async (req, res) => {
  try {
    if (!Array.isArray(req.body)) {
      res.status(400).send("No product ID provided");
      return;
    }
    const cartData = await Cart.findByPk(req.session.cart_id);
    if (!cartData) {
      res.status(404).send("No product with that ID");
      return;
    }
    const cartProducts = await CartProduct.destroy({
      where: {
        product_id: {
          [Op.in]: req.body,
        },
        cart_id: cartData.id,
      },
    });
    res.status(200).json(cartProducts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});
//deletes a cart
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
