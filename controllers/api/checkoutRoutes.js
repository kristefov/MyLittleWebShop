
const router = require("express").Router();
const sequelizeOP = require("sequelize").Op;
const { User, Cart, Product } = require("../../models");
const stripe = require('stripe')('sk_test_26PHem9AhJZvU623DfE1x4sd');

router.post('/create-checkout-session', async (req, res) => {
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
    
console.log(cartItems);
console.log(cartData);
const userData = await User.findByPk(req.session.user_id);
    const stripeSession = await stripe.checkout.sessions.create({
        customer_email: userData.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3001/checkout/success',
      cancel_url: 'http://localhost:3001/checkout/cancel',
    });
  
    res.redirect(303, stripeSession.url);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  });

  module.exports = router;