const express = require("express");
const { getCategoriesC } = require("./controllers/controllers");

const app = express();
app.use(express.json());

app.get("/api/categories", getCategoriesC);

app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ message: "trash server, trash code so you get an Error :)" });
});

module.exports = app;
