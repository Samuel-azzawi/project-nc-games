const express = require("express");
const { getCategoriesC, getReviewsByIdC, getUsersC, patchReviewVoteC, getReviewsC, getCommentsC, postCommentsC, deleteCommentsC, getEndPointC } = require("./controllers/controllers");
const {
  handlePathNotFound,
  status_errors,
  code_errors,
  server_errors,
} = require("./controllers/error-handeling");


const app = express();
app.use(express.json());
//TASK 3
app.get("/api/categories", getCategoriesC);
//TASK 8 & 11
app.get("/api/reviews", getReviewsC);
// TASK 5
app.get("/api/users", getUsersC);
//TASK 4 & 7
app.get("/api/reviews/:review_id", getReviewsByIdC);
// TASK 9
app.get("/api/reviews/:review_id/comments", getCommentsC);
// TASK 10
app.post("/api/reviews/:review_id/comments", postCommentsC);
// TASK 6
app.patch("/api/reviews/:review_id", patchReviewVoteC);
// TASK 12
app.delete("/api/comments/:comment_id", deleteCommentsC);
// TASK 13  
app.get("/api", getEndPointC);

//ERROR HANDELING
app.use(status_errors);
app.use(code_errors);
app.use(server_errors);
app.use(handlePathNotFound);

module.exports = app;
