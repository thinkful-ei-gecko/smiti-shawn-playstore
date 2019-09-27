const app = require("../app");
const { expect } = require("chai");
const supertest = require("supertest");

describe("GET /apps", () => {
  it("only accepts the 'sort' parameter as 'rating' or 'app', sends 400 if false", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "x" })
      .expect(400, "Sort must be either rating or app");
  });
  it("accepts both upper and lowercase parameters, sends 200 if true", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "App" })
      .expect(function(res) {
        supertest(app)
          .get("/apps")
          .query({ sort: "app" })
          .expect(200, res.body);
      })
  });
});
