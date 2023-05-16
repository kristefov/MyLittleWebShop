const router = require('express').Router();
const sequelizeOP = require("sequelize").Op; 
const { Product, User, Category, Tag, ProductTag } = require('../../models');

router.post("/:keyword", async (req, res) => {
  
    const search = req.params.keyword; 
    const productData = await Product.findAll({
        where: {
            product_name: {
              [sequelizeOP.like]: `%${search}%`,
            },
          },
    });
    console.log(productData);
    const products = productData.map(product => product.get({ plain: true }));
    console.log(products);
    res.status(200).json({
     products,
     search: search,
     user_id: req.session.user_id,
      logged_in: req.session.logged_in,
  
    });
  });
  module.exports = router;