const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
require('ajv-keywords')(ajv);
const errorMessages = require('../src/errorMsgs');

module.exports = (schema, data) => {
  const valid = ajv.validate(schema, data);
  if (!valid) {
    console.log(ajv.errors);
    throw new Error(errorMessages.badreq);
  } else return true;
};
