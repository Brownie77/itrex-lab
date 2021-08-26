const Serv = require('./service');
const StorageClient = require('../../storage/storageClient');
const DB = require('../../storage/inmemory/database');
const types = require('../../storage/storageTypes');
const Patient = require('../../models/patient');

const MapStrategy = require('../../storage/inmemory/strategies/map');
const ArrayStrategy = require('../../storage/inmemory/strategies/array');

const uuid = 'testid';

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => uuid),
}));

describe('test Queue Service', () => {
  let serv = null;
  const db = DB;
  let storageClient = null;
  let patients = null;

  beforeEach(() => {
    storageClient = new StorageClient(
      db,
      'arraytest',
      types.ARRAY,
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

  test('should add to queue, return the first, and return next', async () => {
    const testPatient = { name: 1 };
    const testPatientEntity = new Patient(testPatient.name);
    Patient.publicTag = 0;
    await serv.enqueue(testPatient);
    expect(await serv.getFirst()).toStrictEqual(testPatientEntity);
    expect(await serv.getNext()).toBeUndefined(); // empty
  });
});
