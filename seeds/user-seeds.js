const { User } = require('../models');
const userData = [
  {
    "email": "kristyan.tefov12234@gmail.com",
    "first_name": "Kristiyan",
    "last_name": "Tefov",
    "password": "123456789Kris"
  },
  {
    "email": "kristyan.tefov@gmail.com",
    "first_name": "Kristiyan1",
    "last_name": "Tefov1",
    "password": "123456789Kris"
  },
  {
    "email": "kristyan.tefov123@gmail.com",
    "first_name": "Kristiyan2",
    "last_name": "Tefov2",
    "password": "123456789Kris"
  },
  {
    "email": "kris@kris.com",
    "first_name": "Kristiyan",
    "last_name": "Tefov",
    "password": "123456789"
  }
]

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers