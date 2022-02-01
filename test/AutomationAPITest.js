const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

//!!! The mock service has been terminated due to my free subscription ending !!!
//So the tests are expected to fail

describe("Test for an endpoint that returns all the groceries", () => {
  it("should successfully return all the grocery", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .get("/allGrocery")
      .end((err, response) => {
        response.body.should.have.property("id").which.is.a("number");
        response.body.should.have.property("name").which.is.an("array");
        response.body.should.have.property("price").which.is.a("float");
        response.body.should.have.property("stock").which.is.a("number");
        response.status.should.equal(200);
        done();
      });
  });
  it("should return Method not allowed", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .post("/allGrocery") //wrong http protocol
      .end((err, response) => {
        response.status.should.equal(405);
        done();
      });
  });
});

describe("Test for an endpoint that returns a grocery item", () => {
  it("should successfully return the requested grocery based on its name", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .get("/allGrocery")
      .query({ name: "apple" })
      .end((err, response) => {
        response.body.should.have.property("id").which.is.a("number");
        response.body.should.have.property("name").which.is.an("array");
        response.body.should.have.property("price").which.is.a("float");
        response.body.should.have.property("stock").which.is.a("number");
        response.status.should.equal(200);
        done();
      });
  });
  it("It should NOT get members of the group due to name invalid", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .get("/allGrocery")
      .query({ name: 123 })
      .end((err, response) => {
        response.status.should.equal(400);
        done();
      });
  });
  it("should return NOT FOUND", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .get("/allGrocery")
      .query({ name: "panda" })
      .end((err, response) => {
        response.status.should.equal(404);
        done();
      });
  });
});

describe("Test for an endpoint that adds a new grocery item", () => {
  it("It should NOT add the grocery item due to lack of needed fields", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .post("/add")
      .send({
        name: "Banana",
      })
      .end((err, response) => {
        response.status.should.equal(400);
        done();
      });
  });
  it("It should NOT add the grocery item wrong method usage", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .get("/add")
      .send({
        name: "Banana",
      })
      .end((err, response) => {
        response.status.should.equal(400);
        done();
      });
  });
  it("It SHOULD successfully create a new grocery item", (done) => {
    chai
      .request("https://app.swaggerhub.com/apis/Grocery4/GroceryStore/1.0.0")
      .post("/add")
      .send({
        id: "4",
        name: "Test Tournament 1",
        price: "12.3",
        stock: "3",
      })
      .end((err, response) => {
        response.status.should.equal(201);
        response.body.should.have.property("id").which.is.a("number");
        response.body.should.have.property("name").which.is.an("array");
        response.body.should.have.property("price").which.is.a("float");
        response.body.should.have.property("stock").which.is.a("number");
        done();
      });
  });
});
