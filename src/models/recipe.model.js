module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Recipe;
};
