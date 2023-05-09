const router = require("express").Router();
const { Product }  = require("../../models");

router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;