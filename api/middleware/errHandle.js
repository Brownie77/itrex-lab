const { ValidationError } = require('express-json-validator-middleware');
const {
  DataConflictError,
  DataNotFoundError,
  DataForbiddenError,
} = require('../errors/customDataErrs');
const FlexError = require('../errors/flexError');
const status = require('../src/statuses');

module.exports = (err, req, res, next) => {
  console.log(err);
  switch (err.constructor) {
    case ValidationError:
      console.log(err.validationErrors);
      res.status(status.BAD_REQUEST).send(err.validationErrors);
      break;
    case DataConflictError:
      res.status(status.CONFLICT).send(`${err.type}: ${err.message}`);
      break;
    case DataNotFoundError:
      res.status(status.NOT_FOUND).send(`${err.type}: ${err.message}`);
      break;
    case DataForbiddenError:
      res.status(status.FORBIDDEN).send(`${err.type}: ${err.message}`);
      break;
    case FlexError:
      res.status(err.status).send(err.message);
      break;
    default:
      res.status(status.SERVER_ERROR).send(`${err.type}: Server error`);
      break;
  }
  return next();
};
