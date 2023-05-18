const router = require("express").Router();
const { User, Product, Cart } = require("../models");
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
    const userData = await User.findByPk(req.session.user_id);

    res.render("homepage", {
      user_id: req.session.user_id,
      named: userData.first_name,
      lasted: userData.last_name,
      mailed: userData.email,
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
});
router.get("/signup", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("signUp");
});

router.get("/update-e", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    const userData = await User.findByPk(req.session.user_id);
    res.render("update-email", {
      named: userData.first_name,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      lasted: userData.last_name,
      mailed: userData.email,
    });
  }
});

router.get("/update-p", withAuth, async (req, res) => {
  if (req.session.logged_in) {
    const userData = await User.findByPk(req.session.user_id);
    res.render("update-password", {
      named: userData.first_name,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      lasted: userData.last_name,
      mailed: userData.email,
    });
  }
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
  } else{
  try {
    const userData = await User.findByPk(req.session.user_id);
    res.render("checkout", {
      
      named: userData.first_name,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      lasted: userData.last_name
    });
  } catch (err) {
    res.status(500).json(err);
  }

}});

router.get("/cart", async (req, res) => {
  if (!req.session.logged_in) {

    res.redirect("/");
    return;
  } else {
    try {
      const cartData = await Cart.findByPk(req.session.cart_id, {
        include: [
          {
            model: Product,
          },
        ],
      });
      const cart = cartData.get({ plain: true });
      res.render("cart", {
        user_id: req.session.user_id,
        cart,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
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

router.get("/about-us", async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
  if(req.session.logged_in) {
    
  res.render("about-us" , {
    named: userData.first_name,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    lasted: userData.last_name,
    
  });
}else{
  res.render("about-us", {
    named: 'Guest',
   
  });
}
});
router.get("/contact-us", async (req, res) => {
  const userData = await User.findByPk(req.session.user_id);
  if(req.session.logged_in) {
    
  
  res.render("contact-us", {
    named: userData.first_name,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
    lasted: userData.last_name,
   
  });
}else{
  res.render("contact-us", {
    named: 'Guest',
   
  });
}
});
module.exports = router;
