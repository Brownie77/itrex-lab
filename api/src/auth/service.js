const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {
  DataForbiddenError,
  DataNotFoundError,
} = require('../../errors/customDataErrs');

const saltRounds = 10;

module.exports = class AuthService {
  constructor(Storage, PatientsService) {
    this.storage = Storage;
    this.patientsService = PatientsService;
    this.hash = promisify(bcrypt.hash);
    this.compare = promisify(bcrypt.compare);
  }

  async register(data) {
    if (data.password !== data.confirmPassword) {
      throw new DataForbiddenError('Given passwords do not match');
    }

    const payload = { ...data };
    delete payload.confirmPassword;
    payload.password = await this.hash(payload.password, saltRounds);
    const user = await this.storage.createUser(payload);
    payload.userId = user.dataValues.id;
    return this.patientsService.createPatient(payload);
  }

  async login(data) {
    const user = await this.storage.getUser(data);

    if (!user) {
      throw new DataNotFoundError('User not found');
    }

    const match = await this.compare(data.password, user.dataValues.password);
    if (match) {
      return jwt.sign({ userId: user.id }, process.env.SECRET);
    }
    throw new DataForbiddenError('Wrong password');
  }

  async authenticate(data) {}
};
