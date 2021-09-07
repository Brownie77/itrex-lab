require('dotenv').config();

const jwt = require('jsonwebtoken');
const Service = require('./service');
const QueueStorageClient = require('./storageClient');
const PatientsService = require('../patients/service');
const Database = require('../storage/testDB');
const { DataNotFoundError } = require('../../errors/customDataErrs');

jest.mock('jsonwebtoken');

describe('test queue service', () => {
  const queueStorageClient = new QueueStorageClient(Database);
  const patientsService = new PatientsService(Database);
  const service = new Service(queueStorageClient, patientsService);

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

  const spyPatientsServiceFindOne = jest.spyOn(
    PatientsService.prototype,
    'findOne',
  );

  const spyStorageGetAtPosition = jest.spyOn(
    QueueStorageClient.prototype,
    'getAtPosition',
  );
  const spyStorageFind = jest.spyOn(QueueStorageClient.prototype, 'find');

  jest
    .spyOn(QueueStorageClient.prototype, 'deleteAtPosition')
    .mockReturnValue();

  it('should add patient id to the queue', async () => {
    jwt.verify.mockReturnValueOnce({ userId: '1' });
    spyPatientsServiceFindOne.mockReturnValueOnce(Dima);
    await service.enqueue(Dima);

    jwt.verify.mockReturnValueOnce({ userId: '2' });
    spyPatientsServiceFindOne.mockReturnValueOnce(Jack);
    await service.enqueue(Jack);

    jwt.verify.mockReturnValueOnce({ userId: '3' });
    spyPatientsServiceFindOne.mockReturnValueOnce(Sam);
    await service.enqueue(Sam);
  });

  it('should return id of the first patient in the queue', async () => {
    spyStorageGetAtPosition.mockReturnValueOnce('1');
    spyPatientsServiceFindOne.mockReturnValueOnce(Dima);
    const first = await service.get();
    expect(first.id).toBeDefined();

    expect(first.id).toBe('1');
  });

  it('should delete current and return next patient in the queue', async () => {
    spyStorageGetAtPosition.mockReturnValueOnce('2');
    spyPatientsServiceFindOne.mockReturnValueOnce(Jack);

    const next = await service.getNext();
    expect(next).toBeDefined();
    expect(next.id).toBe('2');
  });

  it('should add the same person to the queue with no errors', async () => {
    jwt.verify.mockReturnValue({ userId: '1' });
    spyPatientsServiceFindOne.mockReturnValue(Dima);

    await service.enqueue(Dima);
    await service.enqueue(Dima);
    await service.enqueue(Dima);
  });

  it('should throw an error if the queue is empty', async () => {
    spyStorageGetAtPosition.mockReturnValueOnce(undefined);

    try {
      await service.get();
    } catch (err) {
      expect(err.constructor).toBe(DataNotFoundError);
    }
  });

  it('should return patients position in the queue', async () => {
    jwt.verify.mockReturnValue({ userId: '1' });
    spyPatientsServiceFindOne.mockReturnValueOnce(Dima);
    spyStorageFind.mockReturnValueOnce(0);

    const pos = await service.getPosition('token');
    expect(pos).toBe(1);
  });

  it('should return null if the patient is not in the queue', async () => {
    jwt.verify.mockReturnValue({ userId: '1' });
    spyPatientsServiceFindOne.mockReturnValueOnce(Dima);
    spyStorageFind.mockReturnValueOnce(-1);

    const pos = await service.getPosition('token');
    expect(pos).toBeNull();
  });
});
