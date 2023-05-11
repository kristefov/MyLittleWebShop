const router = require("express").Router();
const { User, Product } = require("../models");
const withAuth = require("../utils/withAuth");

router.get("/", withAuth, async (req, res) => {
  try {
    const productData = await Product.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
    const products = productData.map(product => product.get({ plain: true }));
    res.render("homepage", {
      products,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }
  res.render("homepage");
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
    res.redirect("/");
    return;
  }
  res.render("homepage", {
    products,
    logged_in: req.session.logged_in,
  });
});

router.get("/checkout", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("checkout", {
    products,
    logged_in: req.session.logged_in,
  });
});
router.get("/cart", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("cart", {
    products,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
