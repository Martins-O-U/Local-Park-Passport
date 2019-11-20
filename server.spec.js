const request = require('supertest')
const server = require('./server')
const db = require('./database/db-config')

describe('[GET] / endpoint testing', () => {

    test('should return 200 OK', async () => {
        const response = await request(server).get('/')
        expect(response.status).toBe(200)
    })

    test('with supertest syntax', () => {
        return request(server).get('/')
        .expect(200)
        .expect({ message: 'Welcome to the default zone, please specify a path' })
        .expect('Content-Length', "64")
        .expect('Content-Type', /json/)
    })

})


describe("Park request", () => {
  it ("you get a 200, success since it has no restrictions", async () => {
      return await request(server).get("/api/parks").expect(200);
  })

  it(" returns a json object", () => {
      const response = request(server).get("/api/parks");
      expect(response.type);
  })
})

describe('POST /login', function() {
  it('responds with json server Error', function(done) {
    request(server)
      .post('/api/login')
      .send({
        // "username": "Jessi",
        "password":"unknown"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(500)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
}); 

describe('POST /parks', function() {
  it('responds with an Error of Unathorization, poster must be signed in', function(done) {
    request(server)
      .post('/api/parks')
      .send({
        "park_name": "Shansu Park",
        "city":"tribella",
        "country":"indonasia",
        "park_description":"A place to be"
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', "application/json; charset=utf-8")
      .expect(401)
      .end(function(err) {
        if (err) return done(err);
        done();
      });
  });
});

describe("Clearing Test", () => {
  beforeEach(async () => {
      await db("usersList").truncate();
  })
  describe('POST /register', function() {
    it('responds with json and 201 status', function(done) {
      request(server)
        .post('/api/register')
        .send({
          "fullname": "Jessi Doe",
          "password":"Anytime",
          "email":"jessi@email.com",
          "username":"Jessi"
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', "application/json; charset=utf-8")
        .expect(201)
        .end(function(err) {
          if (err) return done(err);
          done();
        });
    });
  });
})

