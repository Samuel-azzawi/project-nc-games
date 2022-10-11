const express = require("express");
const { getCategoriesC, getReviewsByIdC, getUsersC } = require("./controllers/controllers");
const error_404_msg = "Sorry can't find that!";
const error_400_msg = "invalid type please check your input"

const app = express();
app.use(express.json());

app.get("/api/categories", getCategoriesC);
app.get("/api/reviews/:review_id", getReviewsByIdC);
app.get("/api/users",getUsersC);

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send(error_400_msg);
  }
  if (err.status === 404) {
    res.status(404).send(error_404_msg);
  }
  res
    .status(500)
    .send({ message: "trash server, trash code so you get an Error" });
});

app.use((req, res, next) => {
  res.status(404).send( error_404_msg );
});

module.exports = app;
