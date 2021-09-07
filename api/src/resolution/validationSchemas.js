module.exports.resolutionSchema = {
  type: 'object',
  required: ['resolution', 'ttl'],
  additionalProperties: false,
  properties: {
    resolution: {
      type: 'string',
    },
    ttl: {
      type: 'number',
    },
  },
};

module.exports.IDSchema = {
  type: 'object',
  required: ['patientId'],
  additionalProperties: false,
  properties: {
    patientId: {
      type: 'string',
      minLength: 3,
    },
  },
};
