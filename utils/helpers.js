module.exports = {
   assssss: (user_id) => {
      const user = User.findByPk(user_id);
      return user.first_name;
      //return date.toLocaleDateString();
    },
  };
  