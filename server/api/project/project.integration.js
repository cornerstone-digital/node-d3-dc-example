'use strict';

var app = require('../..');
import request from 'supertest';

describe('Project API:', function() {
  describe('GET /api/projects', function() {
    var projects;

    beforeEach(function(done) {
      request(app)
        .get('/api/projects')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          projects = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(projects).to.be.instanceOf(Array);
    });
  });
});
