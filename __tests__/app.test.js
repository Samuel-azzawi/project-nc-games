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

describe("GET /api/categories", () => {
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

describe("GET /api/reviews/:review_id", () => {
  test("should return status 200 and an array of all categories", () => {
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
        const msg = res.text
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

describe("GET /api/users", () => {
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

describe("PATCH /api/reviews/:review_id", () => {
  test('should return status 200 and the review with votes updated', () => { 
    return request(app)
      .patch("/api/reviews/4")
      .send({ inc_votes: 1 })
      .expect(200)
      .then((res) => {
        const review = res.body.review
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
  })
  test("should return status 200 and the review with vote incremented by 1 (default) if no key was sent", () => {
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
          votes: 8,
        });
      });
  });
  test('should return status 404 with a msg if id not found', () => { 
    return request(app)
      .patch("/api/reviews/9999999")
      .send({ inc_votes: 1 })
      .expect(404)
      .then((res) => {
        const msg = res.text;
        expect(msg).toBe("Sorry can't find that!");
      });
  })
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