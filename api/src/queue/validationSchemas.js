module.exports.patientSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      allOf: [
        {
          transform: ['trim'],
        },
        {
          minLength: 3,
        },
      ],
    },
  },
  required: ['name'],
  additionalProperties: false,
};
