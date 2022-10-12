const { Pool } = require("pg");
const db = require("../db/connection");

exports.getCategoriesM = (slug) => {
  let mainQuery = `SELECT * FROM categories`;
  if (slug) {
    mainQuery += ` WHERE slug = $1`
    return db.query(mainQuery, [slug]).then(({ rows: categories }) => {
      console.log(categories)
      if (categories.length === 0) {
        return Promise.reject({status : 404})
      }
      return categories;
    });
  }
  return db.query(mainQuery).then(({ rows: categories }) => {
    return categories;
  });
};

exports.getReviewsByIdM = (id) => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id WHERE reviews.review_id = $1 GROUP BY reviews.review_id`,
      [id]
    )
    .then(({ rows: review }) => {
      if (review.length === 0) {
        return Promise.reject({ status: 404 });
      }
      return review[0];
    });
};

exports.getUsersM = () => {
  return db.query(`SELECT * FROM users;`).then(({ rows: users }) => {
    return users;
  });
};

exports.patchReviewVoteM = (id, votes = 0) => {
  return db
    .query(
      `UPDATE reviews
SET votes = votes + $1
WHERE review_id = $2
RETURNING  *;`,
      [votes, id]
    )
    .then(({ rows: review }) => {
      if (review.length === 0) {
        return Promise.reject({ status: 404 });
      }
      return review[0];
    });
};

exports.getReviewsM = (category) => {
  let mainQuery = `SELECT reviews.*, COUNT(comments) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    mainQuery = mainQuery + ` WHERE reviews.category = $1`;
  }

  mainQuery += ` GROUP BY reviews.review_id ORDER BY created_at DESC`;

  if (category) {
    return db.query(mainQuery, [category]).then(({ rows: review }) => {
      return review;
    });
  }

  return db.query(mainQuery).then(({ rows: review }) => {
    return review;
  });
};
