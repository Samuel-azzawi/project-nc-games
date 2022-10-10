const express = require("express");
const { getCategoriesC } = require("./controllers/controllers");
const error_404_msg = "Sorry can't find that!";
const app = express();
app.use(express.json());

app.get("/api/categories", getCategoriesC);

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ message: "trash server, trash code so you get an Erorr" });
});

app.use((req, res, next) => {
  res.status(404).send( error_404_msg );
});

module.exports = app;
