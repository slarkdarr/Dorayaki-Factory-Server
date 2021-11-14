module.exports = (sequelize, Sequelize) => {
    const Ingredient = sequelize.define("Ingredient", {
      name: {
        type: Sequelize.STRING,
      },
      stock: {
        type: Sequelize.INTEGER,
      },
    });
    return Ingredient;
  };
  