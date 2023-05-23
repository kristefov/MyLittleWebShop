
const router = require("express").Router();
const sequelizeOP = require("sequelize").Op;
const { User, Cart, Product, CartProduct } = require("../../models");
const stripe = require('stripe')('sk_test_51MtBULDRshRxSyZ6HHmEBs00ellZB7Vd7Bj4e1sl9MQGlvjb4HBwzwwHis55ZqJ1iFgYDns0TUYyhMadBmzcP7Zs00a1tcM42w');
/*
Fill out the payment details with the test card information:
Enter 4242 4242 4242 4242 as the card number.
Enter any future date for card expiry.
Enter any 3-digit number for CVC.
Enter any billing postal code.
*/
router.post('/create-checkout-session', async (req, res) => {
    try {
        const cartData = await Cart.findAll({
          include: [
            {
              model: Product,
              attributes: ["id", "product_name", "price", "stock"],
            },
            {
              model: User,
              attributes: ["id", "first_name", "last_name", "email"],
            },

          ],
          where: {
            user_id: req.session.user_id,
          }
        });
        const cartItems = cartData.map((product) => product.get({ plain: true }));
    
//console.log(cartItems);
//console.log(cartData);

// loop over the cartItems, and add them to a new object that is line_Items with quantity and price and name.
const theDataset = function(data){
  const line_items = [];
  for(let i = 0; i < data.length; i++){
    console.log(data[i].products); 
    let zaza = data[i].products;
   
    for(let j = 0; j < zaza.length; j++){
    line_items.push({
      price_data: {
        currency: "gbp",
        product_data: {
          name: zaza[j]['product_name'],
        },
        unit_amount: (zaza[j].price * 100).toFixed(0),
      },
      quantity: '1',
    });
  }
};
console.log(line_items);
//console.log(line_items);
return line_items;
};

const userData = await User.findByPk(req.session.user_id);
    const stripeSession = await stripe.checkout.sessions.create({
     customer_email: userData.email,
      line_items: theDataset(cartItems),
      mode: 'payment',
      success_url: 'https://mylittlewebshop.herokuapp.com/checkout/success',
      cancel_url: 'https://mylittlewebshop.herokuapp.com/checkout/cancel',
    });
  //res.json();
    res.redirect(303, stripeSession.url);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
  });

  module.exports = router;
