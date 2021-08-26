const Serv = require('./service');
const StorageClient = require('../../storage/storageClient');
const types = require('../../storage/storageTypes');
const Patient = require('../../models/patient');

// testing inmemory
const DB = require('../../storage/inmemory/database');
const MapStrategy = require('../../storage/inmemory/strategies/map');
const ArrayStrategy = require('../../storage/inmemory/strategies/array');

// testing redis
const RedisMock = require('../../mocks/redis');
const MapStrategyRedis = require('../../storage/redis/strategies/map');
const ArrayStrategyRedis = require('../../storage/redis/strategies/array');

describe('test Queue Service with inmemory storing', () => {
  const db = DB;

  let serv = null;
  let storageClient = null;
  let patients = null;

  let counter = 0;

  beforeEach(() => {
    // because database classes are singletons,
    // we init StorageClient with unique database names
    // for each test case to have them empty and avoid UB
    Patient.publicTag = 0;
    counter += 1;
    storageClient = new StorageClient(
      db,
      `${counter}-testqueue`, // db name
      types.ARRAY,
      MapStrategy,
      ArrayStrategy,
    );
    patients = new StorageClient(
      db,
      `${counter}-testpatients`,
      types.ARRAY,
      MapStrategy,
      ArrayStrategy,
    );
    serv = new Serv(storageClient, patients);
  });

  it('should enqueue', async () => {
    const testPatient = { name: 'Dima' };
    const testPatientEntity = {
      name: 'Dima',
      identifier: 'Dima-1',
      publicTag: 1,
    };

    await serv.enqueue(testPatient);
    const result = await serv.getFirst();
    expect(result.identifier).toEqual(testPatientEntity.identifier); // first in the queue
    expect(result.id).not.toBeUndefined(); // first in the queue
  });

  it('should get the next patient from the queue (delete first, then get first)', async () => {
    const testPatient = { name: 'Dima' };
    const testPatient2 = { name: 'Fred' };

    const testPatientEntity2 = {
      name: 'Fred',
      identifier: 'Fred-2',
      publicTag: 2,
    };

    await serv.enqueue(testPatient);
    await serv.enqueue(testPatient2);
    const result = await serv.getNext();
    expect(result.identifier).toEqual(testPatientEntity2.identifier); // new first in the queue
    expect(result.id).not.toBeUndefined();
  });

  it('should enqueue people with the same name', async () => {
    const testPatient = { name: 'Dima' };
    const testPatient2 = { name: 'Dima' };
    const testPatientEntity = {
      name: 'Dima',
      identifier: 'Dima-1',
      publicTag: 1,
    };
    const testPatientEntity2 = {
      name: 'Dima',
      identifier: 'Dima-2',
      publicTag: 2,
    };

    // here they have the same uuid and tag, but in fact they will be different
    expect(testPatientEntity).not.toStrictEqual(testPatientEntity2);
    await serv.enqueue(testPatient);
    await serv.enqueue(testPatient2);

    const first = await serv.getFirst();
    const next = await serv.getNext();

    expect(first.identifier).toEqual(testPatientEntity.identifier); // first
    expect(first.id).not.toBeUndefined();
    expect(next.identifier).toEqual(testPatientEntity2.identifier); // new first
    expect(next.id).not.toBeUndefined();
  });
});

describe('test Queue Service with redis storing', () => {
  const db = RedisMock;

  let serv = null;
  let storageClient = null;
  let patients = null;

  let counter = 0;

  beforeEach(() => {
    // because database classes are singletons,
    // we init StorageClient with unique database names
    // for each test case to have them empty to avoid UB
    Patient.publicTag = 0;
    counter += 1;
    storageClient = new StorageClient(
      db,
      `${counter}-testqueue`, // db name
      types.ARRAY,
      MapStrategyRedis,
      ArrayStrategyRedis,
    );
    patients = new StorageClient(
      db,
      `${counter}-testpatients`,
      types.ARRAY,
      MapStrategyRedis,
      ArrayStrategyRedis,
    );
    serv = new Serv(storageClient, patients);
  });

  it('should enqueue', async () => {
    const testPatient = { name: 'Dima' };
    const testPatientEntity = {
      name: 'Dima',
      identifier: 'Dima-1',
      publicTag: 1,
    };

    await serv.enqueue(testPatient);
    const result = await serv.getFirst();
    expect(result.identifier).toEqual(testPatientEntity.identifier); // first in the queue
    expect(result.id).not.toBeUndefined(); // first in the queue
  });

  it('should get the next patient from the queue (delete first, then get first)', async () => {
    const testPatient = { name: 'Dima' };
    const testPatient2 = { name: 'Fred' };

    const testPatientEntity2 = {
      name: 'Fred',
      identifier: 'Fred-2',
      publicTag: 2,
    };

    await serv.enqueue(testPatient);
    await serv.enqueue(testPatient2);
    const result = await serv.getNext();
    expect(result.identifier).toEqual(testPatientEntity2.identifier); // new first in the queue
    expect(result.id).not.toBeUndefined();
  });

  it('should enqueue people with the same name', async () => {
    const testPatient = { name: 'Dima' };
    const testPatient2 = { name: 'Dima' };
    const testPatientEntity = {
      name: 'Dima',
      identifier: 'Dima-1',
      publicTag: 1,
    };
    const testPatientEntity2 = {
      name: 'Dima',
      identifier: 'Dima-2',
      publicTag: 2,
    };

    // here they have the same uuid and tag, but in fact they will be different
    expect(testPatientEntity).not.toStrictEqual(testPatientEntity2);
    await serv.enqueue(testPatient);
    await serv.enqueue(testPatient2);

    const first = await serv.getFirst();
    const next = await serv.getNext();

    expect(first.identifier).toEqual(testPatientEntity.identifier); // first
    expect(first.id).not.toBeUndefined();
    expect(next.identifier).toEqual(testPatientEntity2.identifier); // new first
    expect(next.id).not.toBeUndefined();
  });
});
