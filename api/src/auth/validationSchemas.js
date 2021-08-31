module.exports.userSchema = {
  type: 'object',
  required: [
    'name',
    'password',
    'confirmPassword',
    'birthdate',
    'email',
    'gender',
  ],
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
      maxLength: 30,
      minLength: 3,
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    confirmPassword: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    name: {
      type: 'string',
      minLength: 3,
    },
    birthdate: {
      type: 'string',
    },
    gender: {
      type: 'string',
      minLength: 4,
    },
  },
};

module.exports.loginSchema = {
  type: 'object',
  required: ['email', 'password'],
  additionalProperties: false,
  properties: {
    email: {
      type: 'string',
      maxLength: 30,
      minLength: 3,
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
  },
};
