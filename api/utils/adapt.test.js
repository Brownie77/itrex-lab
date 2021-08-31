const adapt = require('./adapt');

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
});
