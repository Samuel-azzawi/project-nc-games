const {
  getCategoriesM,
  getReviewsByIdM,
  getUsersM,
  patchReviewVoteM,
  getReviewsM,
  getCommentsM,
  postCommentsM,
  deleteCommentsM,
  getEndPointM,
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
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchReviewVoteC = (req, res, next) => {
  const id = req.params.review_id;
  const inc_votes = req.body.inc_votes;
  patchReviewVoteM(id, inc_votes)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getReviewsC = (req, res, next) => {
  const category = req.query.category;
  const sort_by = req.query.sort_by
  const order = req.query.order
  getCategoriesM(category).then(() => {
    getReviewsM(category,sort_by,order)
      .then((review) => {
        res.status(200).send({ review });
      })
      .catch((err) => {
        next(err);
      });
  }).catch((err) => {
    next(err)
  })
  
};

exports.getCommentsC = (req, res, next) => {
  const id = req.params.review_id;
  getReviewsByIdM(id)
    .then(() => {
      getCommentsM(id)
        .then((comment) => {
          res.status(200).send({ comment });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentsC = (req, res, next) => {
  const id = req.params.review_id;
  const { username, body } = req.body;

  postCommentsM(id, username, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
exports.deleteCommentsC = (req, res, next) => {
  const id = req.params.comment_id;
  deleteCommentsM(id).then(() => {
    res.status(204).send();
  }).catch((err) => {
    next(err);
  });
};

exports.getEndPointC = (req,res,next) => {
  getEndPointM().then((endPoints) => {
    res.status(200).send({endPoints});
  })

}

exports.mainPageC = (req, res, next) => {
  const mainPageMsg = "weclome to my page :)"
  res.status(200).send(mainPageMsg);
}