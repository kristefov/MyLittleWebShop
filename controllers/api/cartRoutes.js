const router = require("express").Router();
const { User, Product, Cart } = require("../../models");


router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    try {
      const cartData = await Cart.findAll({
        include: [
          {
            model: User,
            attributes: ["id"],
          },
          {
            model: Product,
            attributes: ["id", "product_name", "price", "stock", "category_id"],
          },
        ],
      });
      res.status(200).json(cartData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

router.post("/", async (req, res) => {
  
  if (req.session.logged_in) {
    try {
      const cartData = await Cart.create({
        ...req.body,
        user_id: req.session.user_id,
        product_id: req.body.product.id,
      });
      if (!cartData) {
        res.status(404).send("No Product with that ID");
      } else {
        res.status(200).json(cartData);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
});

router.put("/:id", async (req, res) => {
    if (req.session.logged_in) {
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
}});

router.delete("/:id", async (req, res) => {
    if (req.session.logged_in) {
  try {
    const cartData = await cart.destroy({
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
}});

module.exports = router;
