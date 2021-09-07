require('dotenv').config();
const { DataNotFoundError } = require('../../errors/customDataErrs');

const PatientsService = require('./service');
const StorageClient = require('./storageClient');
const Database = require('../storage/testDB');

describe('test patients service', () => {
  const storageClient = new StorageClient(Database);
  const service = new PatientsService(storageClient);

  const Dima = {
    name: 'Dima',
    gender: 'male',
    birthdate: '2007-3-12',
    id: '1',
  };

  const Jack = {
    name: 'Jack',
    gender: 'male',
    birthdate: '2007-3-12',
    id: '2',
  };

  const Sam = {
    name: 'Sam',
    gender: 'male',
    birthdate: '2007-3-8',
    id: '3',
  };

  const spyStorageFindOne = jest.spyOn(StorageClient.prototype, 'findOne');
  const spyStorageSave = jest
    .spyOn(StorageClient.prototype, 'save')
    .mockReturnValue();

  it('should return different uuids for different names', async () => {
    const data1 = {
      name: 'Dima',
      email: 'test@mail',
      password: 'test',
      gender: 'male',
      birthdate: '2007-3-12',
    };
    const data2 = {
      name: 'Jack',
      email: 'test2@mail',
      password: 'testtest',
      gender: 'male',
      birthdate: '2007-3-12',
    };

    await service.createPatient(data1);
    await service.createPatient(data2);

    spyStorageFindOne.mockReturnValue(Dima);
    const { id: id1 } = await service.getId(data1);

    spyStorageFindOne.mockReturnValue(Jack);
    const { id: id2 } = await service.getId(data2);

    spyStorageFindOne.mockReturnValue(Dima);
    const { id: id3 } = await service.getId(data1);

    expect(id1).toBe(id3);
    expect(id1).not.toBe(id2);
  });

  it('should find patient according to the given query', async () => {
    spyStorageFindOne.mockReturnValueOnce(Jack);
    const jack = await service.findOne({ where: { name: 'Jack' } });
    const data = {
      name: 'Sam',
      email: 'test3@mail',
      password: 'testhsajdtest',
      gender: 'male',
      birthdate: '2007-3-8',
    }; // new patient

    await service.createPatient(data);

    spyStorageFindOne.mockReturnValueOnce(Sam);
    const sam = await service.findOne({ where: { name: 'Sam' } });
    expect(sam.name).toEqual('Sam');

    expect(jack.id).not.toBe(sam.id);
    expect(jack.name).toBeDefined();
  });

  it('should delete email and password on saving', async () => {
    const data = {
      name: 'Sam',
      email: 'test3@mail',
      password: 'testhsajdtest',
      gender: 'male',
      birthdate: '2007-3-8',
    };
    await service.createPatient(data);

    expect(spyStorageSave).toBeCalledWith(
      expect.objectContaining({
        name: 'Sam',
        gender: 'male',
        birthdate: '2007-3-8',
      }),
    );
  });

  it('should throw error if no id found', async () => {
    const data = {
      name: 'Jack',
      email: 'test2@mail',
      password: 'testtest',
      gender: 'male',
      birthdate: '2007-3-12',
    };

    spyStorageFindOne.mockReturnValueOnce(undefined);
    try {
      await service.getId(data);
    } catch (e) {
      expect(e.constructor).toBe(DataNotFoundError);
    }
  });
});
