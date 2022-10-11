const { Pool } = require("pg");
const db = require("../db/connection");

exports.getCategoriesM = () => {
  return db.query(`SELECT * FROM categories;`).then(({ rows: categories }) => {
    return categories;
  });
};

exports.getReviewsByIdM = (id) => {
  return db
    .query(
      `SELECT * FROM reviews WHERE review_id = $1;`, [id]
    )
    .then(({ rows: review }) => {
      if (review.length === 0) {
        return Promise.reject({ status: 404});
      }
      return review[0];
    });
};