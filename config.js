const env = process.env;

const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    database: process.env.DB_NAME || "dorayaki",
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};

module.exports = config;
