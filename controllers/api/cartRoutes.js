const router = require("express").Router();
const { User, Product, Cart, CartProduct } = require("../../models");

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

router.post("/", async (req, res) => {
  console.log(req);
  try {
    const cartData = await Cart.create(req.body, {
      include: [{ model: Product }],
    });

    res.status(200).json(cartData);
    console.log(cartData);
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
