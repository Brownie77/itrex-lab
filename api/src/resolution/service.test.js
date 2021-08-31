require('dotenv').config();

let database = null;
const RESOLUTIONS_DATABASE_TYPE = process.env.RESOLUTIONS_DATABASE_TYPE;

if (RESOLUTIONS_DATABASE_TYPE === 'inmemory') {
  database = require('../storage/memoryDatabase');
} else if (RESOLUTIONS_DATABASE_TYPE === 'redis') {
  database = require('../storage/mocks/redis');
} else throw new Error('Unknown or unsupported db type chosen');

const Service = require('./service');
const StorageClient = require('./storageClient');

describe('test resolution service', () => {
  const service = new Service(new StorageClient(database));

  const data1 = { identifier: 'Seth', ttl: 1, resolution: 'testing' };
  const data2 = { identifier: 'Ronald', ttl: 100, resolution: 'yes' };

  it('should set resolution', async () => {
    const spy = jest.spyOn(service, 'set');

    //creating two patients
    await service.patientsService.create(data1);
    await service.patientsService.create(data2);

    await service.set(data1);
    expect(spy).toBeCalledWith(data1);

    await service.set(data2);
    expect(spy).toBeCalledWith(data2);

    expect(spy).toBeCalledTimes(2);
  });

  it('should return resolution by given key', async () => {
    const result1 = await service.get(data1);
    const result2 = await service.get(data2);

    expect(result1.resolution).toBe(data1.resolution);
    expect(result1.ttl).toBeDefined();

    expect(result2.resolution).toBe(data2.resolution);
    expect(result2.ttl).toBeDefined();
  });

  it('should override resolution if it already exists', async () => {
    const data = { identifier: 'Seth', ttl: 1, resolution: 'testing override' };
    let result = await service.get(data);

    expect(result.resolution).toBe(data1.resolution);
    expect(result.ttl).toBeDefined();

    await service.set(data);

    result = await service.get(data);
    expect(result.resolution).toBe(data.resolution);
    expect(result.ttl).toBeDefined();
  });

  it('should delete resolution by given key', async () => {
    await service.delete(data1);

    const result1 = await service.get(data1);
    const result2 = await service.get(data2);

    expect(result1).toStrictEqual({});

    expect(result2.resolution).toBe(data2.resolution);
    expect(result2.ttl).toBeDefined();
  });
});
