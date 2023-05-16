const router = require("express").Router();
const { Cart, User, Product } = require("../models");
const withAuth = require("../utils/withAuth");
const sequelize = require("../config/connection");
const sequelizeOP = require("sequelize").Op;

router.get("/", withAuth, async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    const products = productData.map((product) => product.get({ plain: true }));
    const thinkabitmorUSERname = await User.findByPk(req.session.user_id);

    res.render("homepage", {
      le_idiot: req.session.user_id,
      named: thinkabitmorUSERname.first_name,
      lasted: thinkabitmorUSERname.last_name,
      mailed: thinkabitmorUSERname.email,
      products,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});
router.get("/logout", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  } else {
    req.session.destroy(() => {
      res.status(200).redirect("/login");
    });
  }
  //res.render('login');
});
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signUp");
});

router.get("/home", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/debil");
    return;
  }
  res.render("homepage", {
    // products,
    logged_in: req.session.logged_in,
  });
});

router.get("/checkout", withAuth, async (req, res) => {
  const thinkabitmorUSERname = await User.findByPk(req.session.user_id);
  try {
    const cartData = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: [
            "user_id",
            "email",
            "first_name",
            "last_name",
            "cart_id",
            "product_id",
            "quantity",
            "price",
            "stock",
            "product_name",
            "image_url",
          ],
        },
      ],
    });
    const cartItems = cartData.map((product) => product.get({ plain: true }));
    res.render("checkout", {
      cartItems,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/cart", withAuth, async (req, res) => {
  try {
    const cartData = await Cart.findAll({
      include: [
        {
          model: Product,
          attributes: ["id", "product_name", "price", "stock"],
        },
      ],
    });
    const carts = cartData.map((cart) => cart.get({ plain: true }));
    res.render("cart", {
      user_id: req.session.user_id,
      carts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/search/:id", withAuth, async (req, res) => {
  const search = req.params.id;
  const productData = await Product.findAll({
    where: {
      product_name: {
        [sequelizeOP.like]: `%${search}%`,
      },
    },
  });
  console.log(productData);
  const products = productData.map((product) => product.get({ plain: true }));
  console.log(products);

  res.render("search", {
    products,
    search: search,
    user_id: req.session.user_id,
    logged_in: req.session.logged_in,
  });
});
module.exports = router;
