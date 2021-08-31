const decorate = require('./decorate');

describe('test decorate', () => {
  it('should decorate object according to the given schema', () => {
    const payload = {
      resolution: 123,
      name: 'qqqq',
      aaaa: 'uuuuu',
      ttl: '13247402174836471670271',
      id: true,
      randomProp: 1111,
    };

    const schema = {
      type: 'object',
      props: {
        resolution: { type: 'string' },
        id: { type: 'number' },
        ttl: { type: 'bool', as: 'valid' },
        randomProp: {},
      },
    };

    const expectedObject = {
      resolution: '123',
      id: 1,
      valid: true,
      randomProp: 1111,
    };

    let result = decorate(schema, payload);
    expect(result).toStrictEqual(expectedObject);

    schema.props.randomProp = { type: 'number' };
    result = decorate(schema, payload);
    expect(result).toStrictEqual(expectedObject);
  });
});
