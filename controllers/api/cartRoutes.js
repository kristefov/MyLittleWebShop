const router = require("express").Router();
const { User, Product, Cart } = require("../../models");

router.get("/", async (req, res) => {
  console.log(req.session.logged_in);
  try {
    const cartData = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    res.status(200).json(cartData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
    
  try {

    const cartData = await Cart.create({
      ...req.body,
      include:[{ model:Product}],
      
    });
    console.log(cartData);
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
