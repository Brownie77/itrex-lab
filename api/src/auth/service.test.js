require('dotenv').config();

const jwt = require('jsonwebtoken');
const {
  DataForbiddenError,
  DataNotFoundError,
} = require('../../errors/customDataErrs');
const Service = require('./service');
const UserStorageClient = require('./storageClient');
const PatientsService = require('../patients/service');
const Database = require('../storage/testDB');

jest.mock('jsonwebtoken');

describe('test auth service', () => {
  const storage = new UserStorageClient(Database);
  const patientsService = new PatientsService(Database);
  const service = new Service(storage, patientsService);

  const spyHash = jest.spyOn(Service, 'hash');
  const spyCompare = jest.spyOn(Service, 'compare');

  const spyStorageCreatePatient = jest
    .spyOn(PatientsService.prototype, 'createPatient')
    .mockReturnValue();

  const spyStorageCreateUser = jest.spyOn(
    UserStorageClient.prototype,
    'createUser',
  );
  const spyStorageGetUser = jest.spyOn(UserStorageClient.prototype, 'getUser');

  jwt.sign.mockReturnValue('randomtoken');

  const payload = {
    email: 'dima@example.com',
    password: 'password',
  };

  it('should confirm password', async () => {
    const payloadOK = {
      name: 'Dima',
      gender: 'male',
      birthdate: '2007-3-12',
      email: 'dima@example.com',
      password: 'password',
      confirmPassword: 'password',
    };

    const payloadForbidden = {
      name: 'Dima',
      gender: 'male',
      birthdate: '2007-3-12',
      email: 'dima@example.com',
      password: 'password',
      confirmPassword: 'password1234',
    };

    try {
      await service.registration(payloadForbidden);
    } catch (err) {
      expect(err.constructor).toBe(DataForbiddenError);
    }

    spyHash.mockReturnValue('encodedPassword');
    spyStorageCreateUser.mockReturnValueOnce({ dataValues: { id: '1' } });
    await service.registration(payloadOK);

    expect(spyStorageCreatePatient).toBeCalledWith(
      expect.objectContaining({
        name: 'Dima',
        gender: 'male',
        birthdate: '2007-3-12',
        email: 'dima@example.com',
        password: 'encodedPassword', // without passwordConfirm prop
      }),
    );
  });

  it('should authorize if the data is correct', async () => {
    const user = {
      dataValues: { email: 'dima@example.com', password: 'encodedpassword' },
    };

    spyStorageGetUser.mockReturnValueOnce(user);
    spyCompare.mockReturnValue(true);

    const token = await service.login(payload);
    expect(token).toEqual('randomtoken');
  });

  it('should throw an error if the passwords do not match', async () => {
    const user = {
      dataValues: { email: 'dima@example.com', password: 'encodedpassword' },
    };

    spyStorageGetUser.mockReturnValueOnce(user);
    spyCompare.mockReturnValue(false);

    try {
      await service.login(payload);
    } catch (err) {
      expect(err.constructor).toBe(DataForbiddenError);
    }
  });

  it('should throw an error if the user does not exist', async () => {
    spyStorageGetUser.mockReturnValueOnce(undefined);

    try {
      await service.login(payload);
    } catch (err) {
      expect(err.constructor).toBe(DataNotFoundError);
    }
  });
});
