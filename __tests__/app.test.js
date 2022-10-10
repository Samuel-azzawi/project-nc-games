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
