const Serv = require('./service');
const errorMessages = require('../errorMsgs');

describe('test Queue Service', () => {
  let serv = null;

  beforeEach(() => {
    serv = new Serv();
  });

  test('should add to queue, return the first, and return next', () => {
    const testPatient = { name: 1 };
    const testPatient2 = { name: 2 };
    serv.enqueue(testPatient);
    serv.enqueue(testPatient2);
    expect(serv.getFirst()).toStrictEqual(testPatient);
    expect(serv.getNext()).toStrictEqual(testPatient2);
    expect(serv.getNext()).toBeUndefined();
    try {
      serv.enqueue(testPatient);
      serv.enqueue(testPatient);
    } catch (e) {
      expect(e.message).toBe(errorMessages.conflict);
    }
  });
});
