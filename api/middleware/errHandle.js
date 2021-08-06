const { ValidationError } = require('express-json-validator-middleware');
const {
  DataConfilctError,
  DataNotFoundError,
} = require('../errors/customDataErrs');

module.exports = (err, req, res, next) => {
  console.log(err);
  switch (err.constructor) {
    case ValidationError:
      res.status(400).send(err.ValidationErrors);
      break;
    case DataConfilctError:
      res.status(409).send(`${err.type}: ${err.message}`);
      break;
    case DataNotFoundError:
      res.status(404).send(`${err.type}: ${err.message}`);
      break;
    default:
      res.status(500).send(`${err.type}: Server error`);
      break;
  }
  return next();
};
