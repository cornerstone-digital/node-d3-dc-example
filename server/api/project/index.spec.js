'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var projectCtrlStub = {
  index: 'projectCtrl.index',
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var projectIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './project.controller': projectCtrlStub
});

describe('Thing API Router:', function() {
  it('should return an express router instance', function() {
    expect(projectIndex).to.equal(routerStub);
  });

  describe('GET /api/projects', function() {
    it('should route to project.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'projectCtrl.index')
        ).to.have.been.calledOnce;
    });
  });
});
