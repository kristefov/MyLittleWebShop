const { Product } = require("../models");

const productData = [
  {
    image: "https://source.unsplash.com/random/900×700/?Plain,Shirt",
    product_name: "Plain T-Shirt",
    price: 14.99,
    stock: 14,
    category_id: 1,
  },
  {
    image: "https://source.unsplash.com/random/900×700/?Jordans",
    product_name: "Running Sneakers",
    price: 90.0,
    stock: 25,
    category_id: 5,
  },
  {
    image: "https://source.unsplash.com/random/900×700/?Baseball,Hat",
    product_name: "Branded Baseball Hat",
    price: 22.99,
    stock: 12,
    category_id: 4,
  },
  {
    image: "https://source.unsplash.com/random/900×700/?Vinyl,Records",
    product_name: "Top 40 Music Compilation Vinyl Record",
    price: 12.99,
    stock: 50,
    category_id: 3,
  },
  {
    image: "https://source.unsplash.com/random/900×700/?Male,Shorts",
    product_name: "Cargo Shorts",
    price: 29.99,
    stock: 22,
    category_id: 2,
  },
];

const seedProducts = () => Product.bulkCreate(productData);

module.exports = seedProducts;
