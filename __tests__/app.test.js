const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const request = require("supertest");
const app = require("../app");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(testData);
});

describe("invalid url", () => {
  test("should return status 404 and a message saying Sorry can't find that!", () => {
    return request(app)
      .get("/api/lala")
      .expect(404)
      .then((msg) => {
        expect(msg.text).toBe("Sorry can't find that!");
      });
  });
});

describe("3-GET /api/categories", () => {
  test("should return status 200 and an array of all categories", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((res) => {
        const { body: categories } = res;
        expect(Array.isArray(categories)).toBeTruthy();
        categories.forEach((index) => {
          expect(index).toEqual(
            expect.objectContaining({
              slug: expect.any(String),
              description: expect.any(String),
            })
          );
        });
      });
  });
});

describe("4&7-GET /api/reviews/:review_id", () => {
  test("should return status 200 and an array of all reviews", () => {
    return request(app)
      .get("/api/reviews/3")
      .expect(200)
      .then((res) => {
        const { body: review } = res;
        expect(review).toEqual(
          expect.objectContaining({
            review_id: expect.any(Number),
            title: expect.any(String),
            category: expect.any(String),
            designer: expect.any(String),
            owner: expect.any(String),
            review_body: expect.any(String),
            review_img_url: expect.any(String),
            votes: expect.any(Number),
            created_at: expect.any(String),
            comment_count: expect.any(String),
          })
        );
      });
  });
  test("should return status 404 and error msg if id not found", () => {
    return request(app)
      .get("/api/reviews/999999")
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });
  test("should return status 400 and error msg if id of wrong type", () => {
    return request(app)
      .get("/api/reviews/lala")
      .expect(400)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("invalid type please check your input");
      });
  });
});

describe("5-GET /api/users", () => {
  test("should return status 200 and an array of all users", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((res) => {
        const { body: userObj } = res;
        userObj.users.forEach((index) => {
          expect(index).toEqual(
            expect.objectContaining({
              username: expect.any(String),
              name: expect.any(String),
              avatar_url: expect.any(String),
            })
          );
        });
      });
  });
});

describe("6-PATCH /api/reviews/:review_id", () => {
  test("should return status 200 and the review with votes updated", () => {
    return request(app)
      .patch("/api/reviews/4")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(review).toEqual({
          review_id: 4,
          title: "Dolor reprehenderit",
          category: "social deduction",
          designer: "Gamey McGameface",
          owner: "mallionaire",
          review_body:
            "Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod",
          review_img_url:
            "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          created_at: "2021-01-22T11:35:50.936Z",
          votes: 8,
        });
      });
  });
  test("should return status 200 and the review with vote incremented by 0 (default) if no key was sent", () => {
    return request(app)
      .patch("/api/reviews/4")
      .send()
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(review).toEqual({
          review_id: 4,
          title: "Dolor reprehenderit",
          category: "social deduction",
          designer: "Gamey McGameface",
          owner: "mallionaire",
          review_body:
            "Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod",
          review_img_url:
            "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
          created_at: "2021-01-22T11:35:50.936Z",
          votes: 7,
        });
      });
  });
  test("should return status 404 with a msg if id not found", () => {
    return request(app)
      .patch("/api/reviews/9999999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });
  test("should return status 400 with a msg if id of wrong type", () => {
    return request(app)
      .patch("/api/reviews/lala")
      .send({ inc_votes: 1 })
      .expect(400)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("invalid type please check your input");
      });
  });
  test("should return status 400 with a msg if body of wrong type", () => {
    return request(app)
      .patch("/api/reviews/2")
      .send({ inc_votes: "dskmkmdskds" })
      .expect(400)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("invalid type please check your input");
      });
  });
});

describe("8&11-GET /api/reviews", () => {
  test("should return status 200 and an array of all reviews sorted by creat date desc", () => {
    return request(app)
      .get("/api/reviews")
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(review.length).toBeGreaterThan(0);
        expect(Array.isArray(review)).toBeTruthy();
        expect(review).toBeSortedBy("created_at", {
          descending: true,
        });
        review.forEach((index) => {
          expect(index).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_body: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  test("should return status 200 and an array of all reviews in a specific category", () => {
    return request(app)
      .get("/api/reviews?category=social deduction")
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(Array.isArray(review)).toBeTruthy();
        review.forEach((index) => {
          expect(index).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: "social deduction",
              designer: expect.any(String),
              owner: expect.any(String),
              review_body: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
  test("should return status 200 and an empty array if no reviews in a specific category", () => {
    return request(app)
      .get("/api/reviews?category=children's games")
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(Array.isArray(review)).toBeTruthy();
        expect(review.length).toBe(0);
      });
  });
  test("should return status 404 if category dosnt exist", () => {
    return request(app)
      .get("/api/reviews?category=lala")
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });

  test("should return status 200 and an array of all reviews sorted by votes asc", () => {
    return request(app)
      .get("/api/reviews?sort_by=votes&&order=asc")
      .expect(200)
      .then((res) => {
        const review = res.body.review;
        expect(review.length).toBeGreaterThan(0);
        expect(Array.isArray(review)).toBeTruthy();
        expect(review).toBeSortedBy("votes", {
          ascending: true,
        });
        review.forEach((index) => {
          expect(index).toEqual(
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              category: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_body: expect.any(String),
              review_img_url: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
              comment_count: expect.any(String),
            })
          );
        });
      });
  });
});
describe("9-GET /api/reviews/:review_id/comments", () => {
  test("should return status 200 and an array of relevant comments", () => {
    return request(app)
      .get("/api/reviews/2/comments")
      .expect(200)
      .then((res) => {
        const comment = res.body.comment;
        expect(Array.isArray(comment)).toBeTruthy();
        expect(comment.length).toBeGreaterThan(0);
        comment.forEach((index) => {
          expect(index).toEqual(
            expect.objectContaining({
              review_id: 2,
              comment_id: expect.any(Number),
              body: expect.any(String),
              author: expect.any(String),
              votes: expect.any(Number),
              created_at: expect.any(String),
            })
          );
        });
      });
  });
  test("should return 404 with msg if id not found", () => {
    return request(app)
      .get("/api/reviews/9999/comments")
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });
  test("should return 400 with msg if id of wrong type", () => {
    return request(app)
      .get("/api/reviews/lala/comments")
      .expect(400)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("invalid type please check your input");
      });
  });
  test("should return an empty array if no relevant comments", () => {
    return request(app)
      .get("/api/reviews/1/comments")
      .expect(200)
      .then((res) => {
        const comment = res.body.comment;
        expect(Array.isArray(comment)).toBeTruthy();
        expect(comment.length).toBe(0);
      });
  });
});
describe("10-POST /api/reviews/:review_id/comments", () => {
  test("should post the comment with the relevent review id", () => {
    return request(app)
      .post("/api/reviews/4/comments")
      .send({
        username: "mallionaire",
        body: "oooooooooh",
      })
      .expect(201)
      .then((res) => {
        const comment = res.body.comment;
        expect(comment).toEqual(
          expect.objectContaining({
            review_id: 4,
            comment_id: expect.any(Number),
            body: "oooooooooh",
            author: "mallionaire",
            votes: expect.any(Number),
            created_at: expect.any(String),
          })
        );
      });
  });
  test("should return 404 and a msg if review_id not found", () => {
    return request(app)
      .post("/api/reviews/9999/comments")
      .send({
        username: "mallionaire",
        body: "oooooooooh",
      })
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });
  test("should return 400 and a msg if review_id of wrong type", () => {
    return request(app)
      .post("/api/reviews/haha/comments")
      .send({
        username: "mallionaire",
        body: "oooooooooh",
      })
      .expect(400)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("invalid type please check your input");
      });
  });
  test("should return 404 and a msg if username not found", () => {
    return request(app)
      .post("/api/reviews/4/comments")
      .send({
        username: "lala",
        body: "oooooooooh",
      })
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });
});
describe("12-DELETE /api/comments/:comment_id", () => {
  test("should delete the comment with the relevent id", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });
  test("should return 404  if the comment wasnt found", () => {
    return request(app)
      .delete("/api/comments/99999")
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  });
  test("should return 400  if the comment of wrong type", () => {
    return request(app)
      .delete("/api/comments/lala")
      .expect(400)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("invalid type please check your input");
      });
  });
});
describe("13. GET /api", () => {
  test("should return 200 and JSON describing all the available endpoints on the API,", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        const endPoints = res.body.endPoints;
        expect(endPoints).toEqual({
          "GET /api": {
            description:
              "serves up a json representation of all the available endpoints of the api",
          },
          "GET /api/categories": {
            description: "serves an array of all categories",
            queries: [],
            exampleResponse: {
              categories: [
                {
                  description:
                    "Players attempt to uncover each other's hidden role",
                  slug: "Social deduction",
                },
              ],
            },
          },
          "GET /api/reviews": {
            description: "serves an array of all reviews",
            queries: ["category", "sort_by", "order"],
            exampleResponse: {
              reviews: [
                {
                  title: "One Night Ultimate Werewolf",
                  designer: "Akihisa Okui",
                  owner: "happyamy2016",
                  review_img_url:
                    "https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                  category: "hidden-roles",
                  created_at: 1610964101251,
                  votes: 5,
                },
              ],
            },
          },
          "GET /api/users": {
            description: "serves an array of all users",
            queries: [],
            exampleResponse: {
              userObj: [
                {
                  username: "dav3rid",
                  name: "dave",
                  avatar_url:
                    "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                },
              ],
            },
          },
          "GET /api/reviews/:review_id": {
            description: "serves an object of the specified review_id",
            params: ["review_id"],
            exampleResponse: {
              review: {
                review_id: 3,
                title: "Ultimate Werewolf",
                category: "social deduction",
                designer: "Akihisa Okui",
                owner: "bainesface",
                review_body: "We couldn't find the werewolf!",
                review_img_url:
                  "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
                created_at: "2021-01-18T10:01:41.251Z",
                votes: 5,
                comment_count: "3",
              },
            },
          },
          "GET /api/reviews/:review_id/comments": {
            description:
              "serves an array of comments for the specified review_id",
            params: ["review_id"],
            exampleResponse: {
              review: {
                comment_id: 4,
                body: "EPIC board game!",
                review_id: 2,
                author: "bainesface",
                votes: 16,
                created_at: "2017-11-22T12:36:03.389Z",
              },
            },
          },
          "POST /api/reviews/:review_id/comments": {
            description:
              "serves an object of the comment posted for a specified review_id",
            params: ["review_id"],
            body: [
              {
                username: "username",
                body: "comment to post",
              },
            ],
            exampleResponse: {
              comment: {
                comment_id: 7,
                body: "oooooooooh",
                review_id: 4,
                author: "mallionaire",
                votes: 0,
                created_at: "2022-10-14T09:39:06.768Z",
              },
            },
          },
          "PATCH /api/reviews/:review_id": {
            description:
              "serves an object of the review that was patched in a specified review_id",
            params: ["review_id"],
            body: { inc_votes: "number of votes to add or deduct" },
            exampleResponse: {
              review: {
                review_id: 4,
                title: "Dolor reprehenderit",
                category: "social deduction",
                designer: "Gamey McGameface",
                owner: "mallionaire",
                review_body:
                  "Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod",
                review_img_url:
                  "https://images.pexels.com/photos/278918/pexels-photo-278918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                created_at: "2021-01-22T11:35:50.936Z",
                votes: 8,
              },
            },
          },
          "DELETE /api/comments/:comment_id": {
            description: "deletes a comment from database",
            params: ["comment_id"],
            exampleResponse: {},
          },
        });
      })
  });
});