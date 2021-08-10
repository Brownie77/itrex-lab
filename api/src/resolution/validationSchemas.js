const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });
require('ajv-keywords')(ajv);

module.exports.setResolutionSchema = {
  type: 'object',
  properties: {
    resolution: {
      type: 'string',
    },
    ttl: {
      type: 'number',
    },
    id: {
      type: 'string',
      allOf: [
        {
          minLength: 3,
        },
      ],
    },
  },
  required: ['resolution', 'ttl', 'id'],
  additionalProperties: false,
};

module.exports.getResolutionSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      allOf: [
        {
          minLength: 3,
        },
      ],
    },
  },
  required: ['id'],
  additionalProperties: false,
};
