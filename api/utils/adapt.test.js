const adapt = require('./adapt');
const FlexError = require('../errors/flexError');

describe('test adapt', () => {
  it('should return object with correct data', () => {
    const config = {
      props: [
        {
          where: 'params',
          what: 'name',
          do: ['capitalize', 'trim'],
        },
        {
          where: 'params',
          what: 'id',
        },
        {
          where: 'body',
          what: 'id',
          as: 'uuid', // save as
        },
      ],
    };

    const req = {
      params: { name: '  Dima         ', id: '1' },
      body: { id: '12345' },
    };

    const expectedDTO = { name: 'DIMA', uuid: '12345', id: '1' };

    expect(adapt(config, req)).toStrictEqual(expectedDTO);
  });

  it('should throw error if invalid params', () => {
    const config = {
      props: [
        {
          where: 'params',
          do: ['capitalize', 'trim'],
        },
        {
          where: 'params',
          what: 'id',
        },
        {
          where: 'body',
          what: 'id',
          as: 'uuid',
        },
      ],
    };

    const req = {
      params: { name: '  Dima         ', id: '1' },
      body: { id: '12345' },
    };

    try {
      adapt(config, req);
    } catch (error) {
      expect(error.constructor).toBe(Error);
    }
  });

  it('should throw error if invalid position given', () => {
    const config = {
      props: [
        {
          where: 'paramsdsjdakljsflknas',
          what: 'id',
        },
        {
          where: 'body',
          what: 'id',
          as: 'uuid',
        },
      ],
    };

    const req = {
      params: { name: '  Dima         ', id: '1' },
      body: { id: '12345' },
    };

    try {
      adapt(config, req);
    } catch (error) {
      expect(error.constructor).toBe(Error);
    }
  });
  it('should throw FlexError if there is no such property', () => {
    const config = {
      props: [
        {
          where: 'body',
          what: 'idsssssssssssssssssssss',
          as: 'uuid',
        },
      ],
    };

    const req = {
      params: { name: '  Dima         ', id: '1' },
      body: { id: '12345' },
    };

    try {
      adapt(config, req);
    } catch (error) {
      expect(error.constructor).toBe(FlexError);
    }
  });
});
