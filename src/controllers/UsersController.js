const db = require("../database/db");
const bcrypt = require("bcrypt");
const helper = require("../../helper");
const config = require("../../config");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT * FROM users LIMIT ?,?`, [
    offset,
    config.listPerPage,
  ]);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getOne(username) {
  const rows = await db.query(`SELECT * FROM users WHERE username = ?`, [
    username,
  ]);
  const data = helper.emptyOrRows(rows);

  return {
    data,
  };
}

async function create(user) {
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  const result = await db.query(
    `INSERT INTO users 
    (username, name, email, password)
      VALUES 
      (?, ?, ?, ?)`,
    [user.username, user.name, user.email, user.password]
  );

  let message = "Error in creating user";

  if (result.affectedRows) {
    message = "User created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  getOne,
};
