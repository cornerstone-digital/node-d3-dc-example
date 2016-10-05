'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;

var _project = require('./project.model');

var _project2 = _interopRequireDefault(_project);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Things
function index(req, res) {
  return _project2.default.find().exec().then(respondWithResult(res)).catch(handleError(res));
}
//# sourceMappingURL=project.controller.js.map
