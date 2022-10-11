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
            created_at: expect.any(String)
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
        const { body: categories } = res;
        console.log(categories)
        expect(Array.isArray(categories)).toBeTruthy();
        categories.forEach((index) => {
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