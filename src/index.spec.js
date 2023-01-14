const request = require("supertest");
const app = require("./index");

describe("GET /", () => {
  it("should return a 200 status code", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  it("should return a JSON with the product data", async () => {
    const response = await request(app).get("/");

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(String),
          description: expect.any(String),
          reviews: expect.any(String),
          rating: expect.any(String),
        }),
      ])
    );
  });
});
