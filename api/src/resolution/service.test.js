require('dotenv').config();

const jwt = require('jsonwebtoken');
const Service = require('./service');
const StorageClient = require('./storageClient');
const PatientsService = require('../patients/service');
const PatientsStorageClient = require('../patients/storageClient');
const Database = require('../storage/testDB');

jest.mock('jsonwebtoken');

describe('test resolution service', () => {
  const service = new Service(
    new StorageClient(Database),
    new PatientsService(new PatientsStorageClient(Database)),
  );

  const spyPatientsServiceGetId = jest.spyOn(
    PatientsService.prototype,
    'getId',
  );
  const spyPatientsServiceFindOne = jest.spyOn(
    PatientsService.prototype,
    'findOne',
  );
  const spyStorageGetOne = jest.spyOn(StorageClient.prototype, 'getOne');

  jest.spyOn(StorageClient.prototype, 'deleteOne').mockReturnValue();
  jest.spyOn(StorageClient.prototype, 'save').mockReturnValue();

  const data1 = { name: 'Seth', ttl: 1830999653380, resolution: 'testing' };
  const data2 = { name: 'Ronald', ttl: 1630999653380, resolution: 'yes' };

  it('should set resolution', async () => {
    spyPatientsServiceGetId.mockReturnValue('1');
    spyStorageGetOne.mockReturnValue({});
    await service.set(data1);

    spyPatientsServiceGetId.mockReturnValue('2');
    spyStorageGetOne.mockReturnValue({
      patientId: '2',
      resolution: 'ad',
      ttl: '11',
    });
    await service.set(data2);
  });

  it('should return resolution by given key only if ttl is valid', async () => {
    spyPatientsServiceGetId.mockReturnValue('1');
    spyStorageGetOne.mockReturnValue(data1);

    const result1 = await service.getByName(data1);

    spyPatientsServiceGetId.mockReturnValue('2');
    spyStorageGetOne.mockReturnValue(data2);
    spyPatientsServiceFindOne.mockReturnValue({ id: '2' });

    const result2 = await service.getByName(data2);

    expect(result1.resolution).toBe(data1.resolution);
    expect(result1.ttl).toBeDefined();

    expect(result2).toStrictEqual({});
  });

  it('should return resolution by userId encoded in jwt', async () => {
    jwt.verify.mockReturnValue({ userId: '1' });
    spyPatientsServiceFindOne.mockReturnValue({
      resolution: { dataValues: data1 },
    });

    const result1 = await service.get(data1);

    expect(result1.resolution).toBe(data1.resolution);
    expect(result1.ttl).toBeDefined();
  });

  it('should delete resolution by given key', async () => {
    await service.delete(data1);

    spyPatientsServiceGetId.mockReturnValue('1');
    spyStorageGetOne.mockReturnValue({});

    const result = await service.getByName(data1);

    expect(result).toStrictEqual({});
  });
});
