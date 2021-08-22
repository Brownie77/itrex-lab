const Serv = require('./service');
const StorageClient = require('../../storage/inmemory/storageClient');
const DB = require('../../storage/inmemory/database');
const types = require('../../storage/storageTypes');
const errorMessages = require('../errorMsgs');

describe('test Queue Service', () => {
  let serv = null;
  let db = null;
  let storageClient = null;

  beforeEach(() => {
    db = new DB();
    storageClient = new StorageClient(db, 'arraytest', types.ARRAY);
    serv = new Serv(storageClient);
  });

  test('should add to queue, return the first, and return next', async () => {
    const testPatient = { name: 1 };
    const testPatient2 = { name: 2 };
    await serv.enqueue(testPatient);
    await serv.enqueue(testPatient2);
    expect(await serv.getFirst()).toStrictEqual(testPatient);
    expect(await serv.getNext()).toStrictEqual(testPatient2);
    expect(await serv.getNext()).toBeUndefined();
    try {
      await serv.enqueue(testPatient);
      await serv.enqueue(testPatient);
    } catch (e) {
      expect(e.message).toBe(errorMessages.conflict);
    }
  });
});
