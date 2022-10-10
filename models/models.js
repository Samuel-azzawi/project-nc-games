const { Pool } = require("pg");
const db = require("../db/connection");

exports.getCategoriesM = () => {
  return db
    .query(`SELECT * FROM categories;`)
    .then(({ rows: categories }) => {
      return categories;
    })
};
