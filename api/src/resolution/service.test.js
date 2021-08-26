const Serv = require('./service');
const StorageClient = require('../../storage/storageClient');
const DB = require('../../storage/inmemory/database');
const types = require('../../storage/storageTypes');
const TimeHelper = require('../../utils/timeHelper');
const Patient = require('../../models/patient');

const MapStrategy = require('../../storage/inmemory/strategies/map');
const ArrayStrategy = require('../../storage/inmemory/strategies/array');

const uuid = 'testid';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => uuid),
}));

describe('test Resolution Service', () => {
  let serv = null;
  const db = DB;
  let storageClient = null;
  let patients = null;
  const timeHelper = new TimeHelper();

  const min = timeHelper.minToMs(1);

  beforeEach(() => {
    storageClient = new StorageClient(
      db,
      'maptest',
      types.MAP,
      MapStrategy,
      ArrayStrategy,
    );
    patients = new StorageClient(
      db,
      'Patients',
      types.ARRAY,
      MapStrategy,
      ArrayStrategy,
    );
    serv = new Serv(storageClient, patients);
  });

  test('should delete the resolution after 1 minute', (done) => {
    const testPatient = new Patient('1');
    jest
      .spyOn(patients, 'findByIdentifier')
      .mockImplementation(() => testPatient);
    const data = { ttl: 1, id: '1-1', resolution: 'text' };
    serv.set(data).then(() => {
      serv.getByKey(data).then((value) => {
        expect(value.resolution).toEqual('text'); // still exists
        expect(value.patient).toEqual(uuid);
        expect(value.ttl).toEqual(expect.any(Number));
      });
    });

    setTimeout(() => {
      // after 1 minute
      serv.getByKey(data).then((value) => {
        expect(value).toBeNull(); // deleted
        done();
      });
    }, min);
  });
});
