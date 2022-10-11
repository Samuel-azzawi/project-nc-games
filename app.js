const express = require("express");
const { getCategoriesC, getReviewsByIdC, getUsersC, patchReviewVoteC } = require("./controllers/controllers");
const { status_code_errors, not_found } = require("./controllers/error-handeling");


const app = express();
app.use(express.json());

app.get("/api/categories", getCategoriesC);
app.get("/api/reviews/:review_id", getReviewsByIdC);
app.get("/api/users", getUsersC);
app.patch("/api/reviews/:review_id", patchReviewVoteC);

app.use(status_code_errors);
app.use(not_found);

module.exports = app;
