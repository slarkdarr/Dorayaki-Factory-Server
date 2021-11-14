module.exports = {
    HOST:  process.env.DB_HOST || "127.0.0.1",
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASS || "",
    DB: process.env.DB_NAME || "dorayaki",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    listPerPage: process.env.LIST_PER_PAGE || 10,
  };