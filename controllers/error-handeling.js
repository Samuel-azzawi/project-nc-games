const error_404_msg = "Sorry can't find that!";
const error_400_msg = "invalid type please check your input"

exports.status_code_errors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send(error_400_msg);
  }
  if (err.status === 404) {
    res.status(404).send(error_404_msg);
  }
  res
    .status(500)
    .send({ message: "trash server, trash code so you get an Error" });
};

exports.not_found = (req, res, next) => {
  res.status(404).send(error_404_msg);
};