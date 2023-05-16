const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const User = require('./User');
const Cart = require('./Cart');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
  onDelete: "SET NULL"
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
Cart.belongsTo(User, {
  foreignKey: "user_id",
})  
User.hasOne(Cart, {
  foreignKey: "user_id",
})
Product.belongsTo(Cart, {
  foreignKey: "id",
})
Cart.hasMany(Product, {
  foreignKey: "cart_id",
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
  User,
  Cart
};
