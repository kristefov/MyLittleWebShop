const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const User = require('./User');
const Cart = require('./Cart');
const CartProduct = require('./CartProduct')


// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
})
// Products belongsTo User
Product.belongsTo(User, {
  foreignKey: "user_id",
})
// Categories have many Products
Category.hasMany(Product)
// User have many Products
User.hasMany(Product)
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, 
  foreignKey: "tag_id",
})
/* These lines of code are defining associations between the `Cart`, `User`, and `Product` models. */
Cart.belongsTo(User, {
  foreignKey: "user_id",
})  

User.hasOne(Cart, {
  foreignKey: "user_id",
})

Product.belongsToMany(Cart, {
  through: Cart,
  foreignKey: "product_id",
  })

Cart.hasMany(Product, {
  foreignKey: "product_id",
})

Cart.belongsToMany(Product, {
  through: CartProduct,
  foreignKey: 'cart_id',
});

Product.belongsToMany(Cart, {
  through: CartProduct,
  foreignKey: 'product_id',
});
Cart.hasMany(Product, {
  foreignKey: "cart_id",
  onDelete: "CASCADE", // optional, specify the delete behavior
});
Product.belongsTo(Cart, {
  foreignKey: "cart_id",
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  Cart
};
