const express = require("express");
const { getCategoriesC, getReviewsByIdC, getUsersC, patchReviewVoteC, getReviewsC, getCommentsC, postCommentsC, deleteCommentsC, getEndPointC } = require("./controllers/controllers");
const { status_code_errors, not_found } = require("./controllers/error-handeling");


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

// ERROR CODE OR STATUS HANDELING
app.use(status_code_errors);

// NO ERROR BUT NO RESULTS
app.use(not_found);

module.exports = app;
