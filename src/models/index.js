const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.requests = require("./request.model.js")(sequelize, Sequelize);
db.ingredients = require("./ingredient.model.js")(sequelize, Sequelize);
db.recipes = require("./recipe.model.js")(sequelize, Sequelize);
db.recipeIngredient = require("./recipeIngredient.model.js")(sequelize, Sequelize);
db.logRequests = require("./logrequest.model.js")(sequelize, Sequelize);
db.ingredients.belongsToMany(db.recipes, {through: db.recipeIngredient});
db.recipes.belongsToMany(db.ingredients, {through: db.recipeIngredient});

module.exports = db;