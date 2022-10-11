const {
  getCategoriesM,
  getReviewsByIdM,
  getUsersM,
  patchReviewVoteM,
} = require("../models/models");

exports.getCategoriesC = (req, res, next) => {
  getCategoriesM()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewsByIdC = (req, res, next) => {
  const review_id = req.params.review_id;
  getReviewsByIdM(review_id)
    .then((review) => {
      res.status(200).send(review);
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUsersC = (req, res, next) => {
  getUsersM()
    .then((users) => {
      res.status(200).send({users});
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVoteC = (req, res, next) => {
  const id = req.params.review_id;
  const inc_votes = req.body.inc_votes 
  patchReviewVoteM(id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};