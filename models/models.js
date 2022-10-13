const { Pool } = require("pg");
const db = require("../db/connection");

exports.getCategoriesM = (slug) => {
  let mainQuery = `SELECT * FROM categories`;
  if (slug) {
    mainQuery += ` WHERE slug = $1`;
    return db.query(mainQuery, [slug]).then(({ rows: categories }) => {
      console.log(categories);
      if (categories.length === 0) {
        return Promise.reject({ status: 404 });
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

exports.getReviewsM = (category, sort_by = `created_at`, order = `desc`) => {
  const validOrders = ["asc", "desc"];
  const validSort_by = [
    "created_at",
    "votes",
    "category",
    "review_body",
    "review_img_url",
    "owner",
    "designer",
    "title",
    "review_id",
  ];

  let mainQuery = `SELECT reviews.*, COUNT(comments) AS comment_count FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id`;

  if (category) {
    mainQuery = mainQuery + ` WHERE reviews.category = $1`;
  }
  if (!validOrders.includes(order) || !validSort_by.includes(sort_by)) {
    return Promise.reject({ status: 400});
  } else {
    mainQuery += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ${order}`;
  }
  if (category) {
    return db.query(mainQuery, [category,sort_by,order]).then(({ rows: review }) => {
      return review;
    });
  }
  return db.query(mainQuery, [sort_by]).then(({ rows: review }) => {
    console.log(mainQuery);
    return review;
  });
};

exports.getCommentsM = (id) => {
  return db
    .query(
      `SELECT *  FROM comments  WHERE comments.review_id = $1 ORDER BY created_at DESC`,
      [id]
    )
    .then(({ rows: comment }) => {
      return comment;
    });
};
