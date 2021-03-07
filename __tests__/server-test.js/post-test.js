const request = require('supertest');

describe('Testing of addUser function and route', () => {
  it('should test if the output of the post adduser route is correct', () => {
    request("localhost:3000")
    .post("/api/users/addUser")
    .set('Acept','application/json')
    .send({"username": "somewhat", "firstName": "somewhat", "lastName": "somewhat", "email": "somewhat", "password": "somewhat"})
    .expect(200);
  });
});