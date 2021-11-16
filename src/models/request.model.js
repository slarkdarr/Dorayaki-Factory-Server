module.exports = (sequelize, Sequelize) => {
  const Request = sequelize.define("Request", {
    email: {
      type: Sequelize.STRING,
    },
    recipe_name: {
      type: Sequelize.STRING,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM('pending', 'rejected', 'accepted'),
    },
  });

  return Request;
};
