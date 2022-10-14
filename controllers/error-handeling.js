const error_404_msg = "Sorry can't find that!";
const error_400_msg = "invalid type please check your input";
const server_error_msg = "trash server, trash code so you get an Error :)";

exports.status_errors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(error_404_msg);
  } else {
    next(err);
  }
}
exports.code_errors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send(error_400_msg);
  }
  else if (err.code === "23503") {
    res.status(404).send(error_404_msg);
  }
  else {
    next(err)
  }
};
exports.server_errors = (err, req, res, next) => {
  res
    .status(500)
    .send({ message: "trash server, trash code so you get an Error :)" });
}
exports.handlePathNotFound = (req, res, next) => {
  res.status(404).send(error_404_msg);
};
