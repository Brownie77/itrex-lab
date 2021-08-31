require('dotenv').config();

const { patientsDatabase } = require('../storage/chooseTestDB');

const Service = require('./service');
const StorageClient = require('./storageClient');

describe('test patients service', () => {
  const service = new Service(new StorageClient(patientsDatabase));

  it('should return different uuids for different names', async () => {
    const data1 = { identifier: 'Dima' };
    const data2 = { identifier: 'Jack' };

    const { id: id1 } = await service.create(data1);
    const { id: id2 } = await service.create(data2);
    const { id: id3 } = await service.getId(data1);

    expect(id1).toBe(id3);
    expect(id1).not.toBe(id2);
  });

  it('should find patient according to the given query', async () => {
    const Jack = await service.findOne({ where: { identifier: 'Jack' } });
    const data = { identifier: 'Sam' }; // new patient

    const { id } = await service.create(data);
    const Sam = await service.findOne({ where: { identifier: 'Sam' } });
    expect(id).toBe(Sam.id);
    expect(Sam.identifier).toBeDefined();

    expect(Jack.id).not.toBe(Sam.id);
    expect(Jack.identifier).toBeDefined();
  });
});
