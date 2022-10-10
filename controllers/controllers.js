const { getCategoriesM } = require("../models/models");

exports.getCategoriesC = (req, res, next) => {
  getCategoriesM()
    .then((categories) => {
      res.status(200).send(categories);
    })
    .catch((err) => {
      next(err);
    });
};
