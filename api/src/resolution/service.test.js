const Serv = require('./service');
const StorageClient = require('../../storage/inmemory/storageClient');
const DB = require('../../storage/inmemory/database');
const types = require('../../storage/storageTypes');
const TimeHelper = require('../../utils/timeHelper');

describe('test Resolution Service', () => {
  let serv = null;
  let db = null;
  let storageClient = null;
  const timeHelper = new TimeHelper();

  const min = timeHelper.minToMs(1);

  beforeEach(() => {
    db = new DB();
    storageClient = new StorageClient(db, 'maptest', types.MAP);
    serv = new Serv(storageClient);
  });

  test('should delete the resolution after 1 minute', (done) => {
    const testPatient = { id: 1 };
    const data = { ttl: 1, resolution: '2', id: 1 };
    serv.set(data).then(() => {
      serv.getByKey(testPatient).then((value) => {
        expect(value.resolution).toBe(data.resolution); // still exists
      });
    });

    setTimeout(() => {
      // after 1 minute
      serv.getByKey(testPatient).then((value) => {
        expect(value.resolution).toBeNull(); // deleted
        done();
      });
    }, min);
  });
});
