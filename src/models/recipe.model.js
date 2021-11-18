module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("Recipe", {
    name: {
      type: Sequelize.STRING,
      unique: true
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Recipe;
};
