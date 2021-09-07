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

  it('should throw an error if unknown type was declared', () => {
    expect.assertions(1);

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
        id: { type: 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq' },
        ttl: { type: 'bool', as: 'valid' },
        randomProp: {},
      },
    };

    try {
      decorate(schema, payload);
    } catch (err) {
      expect(err.constructor).toBe(Error);
    }
  });

  it('should throw an error if output defined not as object', () => {
    expect.assertions(1);

    const payload = {
      resolution: 123,
      name: 'qqqq',
      aaaa: 'uuuuu',
      ttl: '13247402174836471670271',
      id: true,
      randomProp: 1111,
    };

    const schema = {
      type: 'bool',
      props: {
        resolution: { type: 'string' },
        id: { type: 'number' },
        ttl: { type: 'bool', as: 'valid' },
        randomProp: {},
      },
    };

    try {
      decorate(schema, payload);
    } catch (err) {
      expect(err.constructor).toBe(Error);
    }
  });

  it('should throw an error if its impossible to convert string into number', () => {
    expect.assertions(1);

    const payload = {
      resolution: 123,
      name: 'qqqq',
      aaaa: 'uuuuu',
      ttl: '13247402174836471670271',
      id: 'a1',
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

    try {
      decorate(schema, payload);
    } catch (err) {
      expect(err.constructor).toBe(Error);
    }
  });
});
