module.exports = (sequelize, Sequelize) => {
    const RecipeIngredients = sequelize.define('RecipeIngredients', {
      quantity: {
        type: Sequelize.INTEGER,
      }
    });
    return RecipeIngredients;
  };
  