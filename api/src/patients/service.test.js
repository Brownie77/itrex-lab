require('dotenv').config();

const { patientsDatabase } = require('../storage/chooseTestDB');

const Service = require('./service');
const StorageClient = require('./storageClient');

describe('test patients service', () => {
  const service = new Service(new StorageClient(patientsDatabase));

  it('should return different uuids for different names', async () => {
    const data1 = { name: 'Dima' };
    const data2 = { name: 'Jack' };

    const { id: id1 } = await service.create(data1);
    const { id: id2 } = await service.create(data2);
    const { id: id3 } = await service.getId(data1);

    expect(id1).toBe(id3);
    expect(id1).not.toBe(id2);
  });

  it('should find patient according to the given query', async () => {
    const Jack = await service.findOne({ where: { name: 'Jack' } });
    const data = { name: 'Sam' }; // new patient

    const { id } = await service.create(data);
    const Sam = await service.findOne({ where: { name: 'Sam' } });
    expect(id).toBe(Sam.id);
    expect(Sam.name).toBeDefined();

    expect(Jack.id).not.toBe(Sam.id);
    expect(Jack.name).toBeDefined();
  });
});
