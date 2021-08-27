// testing mysql
const MySQLMock = require('../../mocks/mysql');
const MapStrategyMysql = require('../../storage/mysql/strategies/map');
const ArrayStrategyMysql = require('../../storage/mysql/strategies/array');

// testing inmemory
const DB = require('../../storage/inmemory/database');
const MapStrategy = require('../../storage/inmemory/strategies/map');
const ArrayStrategy = require('../../storage/inmemory/strategies/array');

// testing redis
const RedisMock = require('../../mocks/redis');
const MapStrategyRedis = require('../../storage/redis/strategies/map');
const ArrayStrategyRedis = require('../../storage/redis/strategies/array');

const Serv = require('./service');
const StorageClient = require('../../storage/storageClient');
const types = require('../../storage/storageTypes');
const TimeHelper = require('../../utils/timeHelper');
const Patient = require('../../models/patient');
const errorText = require('../errorMsgs');

const timeHelper = new TimeHelper();

const min = timeHelper.minToMs(1);

describe('test Resolution Service with inmemory storing', () => {
  const db = DB;

  let serv = null;
  let storageClient = null;
  let patients = null;

  let counter = 0;

  beforeEach(() => {
    counter += 1;
    storageClient = new StorageClient(
      db,
      `${counter}-testresolutions`,
      types.MAP,
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

  it('should set the resolution by key and return resolution by key', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    const val = await serv.getByKey(data);
    expect(val.resolution).toEqual('text');
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number)); // unix timestamp
  });

  it('should rewrite the resolution if the same key was given', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    let val = await serv.getByKey(data);
    expect(val.resolution).toEqual('text');
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number));
    const newData = { ttl: 10, id: 'Dima-1', resolution: 'texttext' };
    await serv.set(newData);
    val = await serv.getByKey(newData);
    expect(val.resolution).toEqual(newData.resolution);
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number));
  });

  it('should delete the resolution manualy', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    let val = await serv.getByKey(data);
    expect(val.resolution).toEqual('text');
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number));
    await serv.delete(data);
    try {
      val = await serv.getByKey(data);
    } catch (err) {
      expect(err.message).toEqual(errorText.notfound);
    }
  });

  it('should delete the resolution after 1 minute', (done) => {
    const testPatient = new Patient('Dima');
    jest
      .spyOn(patients, 'findByIdentifier')
      .mockImplementation(() => testPatient);
    const data = { ttl: 1, id: 'Dima-1', resolution: 'text' };
    serv.set(data).then(() => {
      serv.getByKey(data).then((value) => {
        expect(value.resolution).toEqual('text'); // still exists
      });
    });

    setTimeout(() => {
      // after 1 minute
      serv.getByKey(data).then((value) => {
        expect(value).toStrictEqual({}); // deleted
        done();
      });
    }, min);
  });
});

// same tests for redis storage type
describe('test Resolution Service with redis storing', () => {
  const db = RedisMock;

  let serv = null;
  let storageClient = null;
  let patients = null;

  let counter = 0;

  beforeEach(() => {
    // because database classes are singletons,
    // we init StorageClient with unique database names
    // for each test case to have them empty to avoid UB
    counter += 1;
    storageClient = new StorageClient(
      db,
      `${counter}-testresolutions`,
      types.MAP,
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

  it('should set the resolution by key and return resolution by key', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    const val = await serv.getByKey(data);
    expect(val.resolution).toEqual('text');
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number)); // unix timestamp
  });

  it('should rewrite the resolution if the same key was given', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    let val = await serv.getByKey(data);
    expect(val.resolution).toEqual('text');
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number));
    const newData = { ttl: 10, id: 'Dima-1', resolution: 'texttext' };
    await serv.set(newData);
    val = await serv.getByKey(newData);
    expect(val.resolution).toEqual(newData.resolution);
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number));
  });

  it('should delete the resolution manualy', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    let val = await serv.getByKey(data);
    expect(val.resolution).toEqual('text');
    expect(val.patient).not.toBeUndefined();
    expect(val.ttl).toEqual(expect.any(Number));
    await serv.delete(data);
    try {
      val = await serv.getByKey(data);
    } catch (err) {
      expect(err.message).toEqual(errorText.notfound);
    }
  });

  it('should delete the resolution after 1 minute', (done) => {
    const testPatient = new Patient('Dima');
    jest
      .spyOn(patients, 'findByIdentifier')
      .mockImplementation(() => testPatient);
    const data = { ttl: 1, id: 'Dima-1', resolution: 'text' };
    serv.set(data).then(() => {
      serv.getByKey(data).then((value) => {
        expect(value.resolution).toEqual('text'); // still exists
      });
    });

    setTimeout(() => {
      // after 1 minute
      serv.getByKey(data).then((value) => {
        expect(value).toStrictEqual({}); // deleted
        done();
      });
    }, min);
  });
});

describe('test Resolution Service with mysql storing', () => {
  const db = MySQLMock;

  let serv = null;
  let storageClient = null;
  let patients = null;

  let counter = 0;

  beforeEach(() => {
    counter += 1;
    storageClient = new StorageClient(
      db,
      `${counter}-testresolutions`,
      types.MAP,
      MapStrategyMysql,
      ArrayStrategyMysql,
    );
    patients = new StorageClient(
      db,
      `${counter}-testpatients`,
      types.ARRAY,
      MapStrategyMysql,
      ArrayStrategyMysql,
    );
    serv = new Serv(storageClient, patients);
  });

  it('should set the resolution by key and return resolution by key', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    const val = await serv.getByKey(data);
    expect(val.resolution).toBeDefined();
    expect(val.PatientId).toEqual(expect.any(String));
    expect(val.ttl).toBeDefined();
  });

  it('should delete the resolution', async () => {
    const patient = new Patient('Dima');
    jest.spyOn(patients, 'findByIdentifier').mockImplementation(() => patient);
    const data = { ttl: 10, id: 'Dima-1', resolution: 'text' };
    await serv.set(data);
    let val = await serv.getByKey(data);
    expect(val.resolution).toBeDefined();
    expect(val.PatientId).toEqual(expect.any(String));
    expect(val.ttl).toBeDefined();
    await serv.delete(data);
    try {
      val = await serv.getByKey(data);
    } catch (err) {
      expect(err.message).toEqual(errorText.notfound);
    }
  });
});
