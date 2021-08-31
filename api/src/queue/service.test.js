require('dotenv').config();

let database = null;
const QUEUE_DATABASE_TYPE = process.env.QUEUE_DATABASE_TYPE;

if (QUEUE_DATABASE_TYPE === 'inmemory') {
  database = require('../storage/memoryDatabase');
} else if (QUEUE_DATABASE_TYPE === 'redis') {
  database = require('../storage/mocks/redis');
} else throw new Error('Unknown or unsupported db type chosen');

const Service = require('./service');
const StorageClient = require('./storageClient');

describe('test queue service', () => {
  const service = new Service(new StorageClient(database));

  it('should add patient id to the queue', async () => {
    const data1 = { identifier: 'Dima' };
    const data2 = { identifier: 'Jack' };
    const data3 = { identifier: 'John' };

    await service.enqueue(data1);
    await service.enqueue(data2);
    await service.enqueue(data3);
  });

  it('should return id of the first patient in the queue', async () => {
    const first = await service.get();
    expect(first.id).toBeDefined();

    const patient = await service.patientsService.findOne({
      where: { identifier: 'Dima' },
    });
    expect(first.id).toBe(patient.id);
  });

  it('should delete current and return next patient in the queue', async () => {
    const next = await service.getNext();
    expect(next.id).toBeDefined();

    const patient = await service.patientsService.findOne({
      where: { identifier: 'Jack' },
    });
    expect(next.id).toBe(patient.id);

    const first = await service.get();
    expect(next.id).toBe(first.id); // next is the new first
  });

  it('should add the same person to the queue with no errors', async () => {
    const data1 = { identifier: 'Dima' };

    await service.enqueue(data1);
    await service.enqueue(data1);
    await service.enqueue(data1);
  });
});
