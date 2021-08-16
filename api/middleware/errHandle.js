const { ValidationError } = require('express-json-validator-middleware');
const {
  DataConflictError,
  DataNotFoundError,
} = require('../errors/customDataErrs');
const {
  conflict,
  badrequest,
  servererr,
  notfound,
} = require('../src/statuses');

module.exports = (err, req, res, next) => {
  console.log(err);
  switch (err.constructor) {
    case ValidationError:
      res.status(badrequest).send(err.ValidationErrors);
      break;
    case DataConflictError:
      res.status(conflict).send(`${err.type}: ${err.message}`);
      break;
    case DataNotFoundError:
      res.status(notfound).send(`${err.type}: ${err.message}`);
      break;
    default:
      res.status(servererr).send(`${err.type}: Server error`);
      break;
  }
  return next();
};
