const request = require("supertest");
const app = require("../App");
const { MongoClient } = require("mongodb");

var connection;
var db;

var obj = { name: "test", score: 20 };

// beforeAll(async()=>{
//     connection = await MongoClient.connect('mongodb://localhost:27017',{
//         useNewUrlParser: true,
//     });
//     db = connection.db('Test')
// })

// afterAll(async()=>{
//     await db.collection('Users').deleteMany({
  //         name: 'test'
  //     })
  //     await connection.close();
  //     await db.close();
  // })
  describe("get data from user leaderboard", function () {
    it("should return status 200", function (done) {
      request(app)
        .get("/user")
        .then((response) => {
          let { body, status } = response;
          expect(status).toBe(200);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
  
describe("add data to user leaderboard", function () {
  it("should return status 201", function (done) {
    request(app)
      .post("/user")
      .send(obj)
      .then((response) => {
        let { body, status } = response;
        expect(status).toBe(201);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("add data to user leaderboard", function () {
  it("should return name with value test", function (done) {
    request(app)
      .post("/user")
      .send(obj)
      .then((response) => {
        let { body, status } = response;
        expect(body[0].name).toBe("test");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("add data to user leaderboard", function () {
  it("should return score with value 20", function (done) {
    request(app)
      .post("/user")
      .send(obj)
      .then((response) => {
        let { body, status } = response;
        expect(body[0].score).toBe(20);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});


describe("get data from user leaderboard", function () {
  it("should get value of name test", function (done) {
    request(app)
      .get("/user")
      .then((response) => {
        let { body, status } = response;
        expect(body[0].name).toBe("test");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("get data from user leaderboard", function () {
  it("should get value of score 20", function (done) {
    request(app)
      .get("/user")
      .then((response) => {
        let { body, status } = response;
        expect(body[0].score).toBe(20);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("get data from user leaderboard", function () {
  it("should score has number type", function (done) {
    request(app)
      .get("/user")
      .then((response) => {
        let { body, status } = response;
        expect(typeof body[0].score).toBe("number");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("get data from user leaderboard", function () {
  it("should name has string type", function (done) {
    request(app)
      .get("/user")
      .then((response) => {
        let { body, status } = response;
        expect(typeof body[0].name).toBe("string");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("get data from user leaderboard", function () {
  it("should be score have length of 2", function (done) {
    request(app)
      .get("/user")
      .then((response) => {
        let { body, status } = response;
        expect(body[0].score.toString().length).toBe(2);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("get data from user leaderboard", function () {
  it("should be name have length of 4", function (done) {
    request(app)
      .get("/user")
      .then((response) => {
        let { body, status } = response;
        expect(body[0].name.length).toBe(4);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
