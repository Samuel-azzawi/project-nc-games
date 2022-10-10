const { Pool } = require("pg");
const db = require("../db/connection");

exports.getCategoriesM = (req, res, next) => {
  return db
    .query(`SELECT * FROM categories;`)
    .then(({ rows: categories }) => {
      return categories;
    })
    .catch((err) => {
      next(err);
    });
};
