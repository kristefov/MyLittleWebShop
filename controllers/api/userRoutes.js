const router = require("express").Router();
const { User, Cart } = require("../../models");
const { createToken } = require("../../utils/jwt");

// POST create a new user
router.post("/register", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    const cartData = await Cart.create({
      user_id: userData.id,
      session_id: req.session.id,
      
    });
    const token = createToken(userData);
    res.cookie("access_token", token); 
    req.session.save(() => {
      req.session.cart_id = cartData.id;
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.token = token;

      res.status(200).json({
        logged_in: true,
        user: userData,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST user login
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const userData = await User.findOne({
      where: { email: req.body.email },
      include: { model: Cart },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    const token = createToken(userData);
    res.cookie("access_token", token);
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.token = token;
      req.session.searched = false;
      req.session.cart_id = userData.cart.id;
      res.status(200).json({
        logged_in: true,
        user: userData,
        message: "You are now logged in!",
      });
    });
    // res.json({ user: userData, message: "You are now logged in!" });
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a user
router.put("/", async (req, res) => {
  console.log(req.session);
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.session.user_id,
      },
    });
    if (!userData[0]) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    console.log(userData);
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET all user
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: Cart,
    });
    if (!userData) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});
// GET one user
router.get("/:id", async (req, res) => {
  console.log(req);
  try {
    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      res.status(404).json({ message: "No user with this id!" });
      return;
    }
    res.status(200).json(userData);
    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
