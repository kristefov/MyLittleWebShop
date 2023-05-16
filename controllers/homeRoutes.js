const router = require("express").Router();
const { User, Product } = require("../models");
const withAuth = require("../utils/withAuth");

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
      res.redirect("/login");
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

router.get("/checkout", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("checkout", {
    // products,
    logged_in: req.session.logged_in,
  });
});
router.get("/cart", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect("/");
    return;
  } else {
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
  }
});

module.exports = router;
