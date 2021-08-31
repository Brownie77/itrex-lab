require('dotenv').config();

const Service = require('./service');
const StorageClient = require('./storageClient');
const { queueDatabase, patientsDatabase } = require('../storage/chooseTestDB');
const PatientsService = require('../patients/service');
const PatientsStorageClient = require('../patients/storageClient');

describe('test queue service', () => {
  const service = new Service(
    new StorageClient(queueDatabase),
    new PatientsService(new PatientsStorageClient(patientsDatabase)),
  );

  it('should add patient id to the queue', async () => {
    const data1 = { name: 'Dima' };
    const data2 = { name: 'Jack' };
    const data3 = { name: 'John' };

    await service.enqueue(data1);
    await service.enqueue(data2);
    await service.enqueue(data3);
  });

  it('should return id of the first patient in the queue', async () => {
    const first = await service.get();
    expect(first.id).toBeDefined();

    const patient = await service.patientsService.findOne({
      where: { name: 'Dima' },
    });
    expect(first.id).toBe(patient.id);
  });

  it('should delete current and return next patient in the queue', async () => {
    const next = await service.getNext();
    expect(next.id).toBeDefined();

    const patient = await service.patientsService.findOne({
      where: { name: 'Jack' },
    });
    expect(next.id).toBe(patient.id);

    const first = await service.get();
    expect(next.id).toBe(first.id); // next is the new first
  });

  it('should add the same person to the queue with no errors', async () => {
    const data1 = { name: 'Dima' };

    await service.enqueue(data1);
    await service.enqueue(data1);
    await service.enqueue(data1);
  });
});
