const sequelize = require("../config/connection");
const { User, Product } = require("../models");

module.exports = {
  assssss: (user_id) => {
    const user = User.findByPk(user_id);
    return user.first_name;
    //return date.toLocaleDateString();
  },
  find_name: (search) => {
    const producta = Product.findAll({
      where: {
        product_name: {
          [sequelize.Op.like]: `%${search}%`,
        },
      },
    });
    return producta;
  },
  get_len: (obj) => {
    return Object.keys(obj).length;
  },
};
