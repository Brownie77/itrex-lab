const Serv = require('./service');
const errorMessages = require('../errorMsgs');

describe('test Queue Service', () => {
  let serv = null;

  const min = 1 * 60 * 1000;

  beforeEach(() => {
    serv = new Serv();
  });

  test('should delete the resolution after 1 minute', (done) => {
    const testPatient = { id: 1 };
    const data = { ttl: 1, resolution: '2', id: 1 };
    serv.set(data);
    let val = serv.getByKey(testPatient);
    expect(val.resolution).toBe(data.resolution); // still exists

    setTimeout(() => {
      val = serv.getByKey(testPatient);
      expect(val.resolution).toBeNull(); // deleted
      done();
    }, min);
  });
});
