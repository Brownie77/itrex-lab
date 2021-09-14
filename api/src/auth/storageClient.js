const { DataConflictError } = require('../../errors/customDataErrs');

module.exports = class AuthStorageClient {
  constructor(database) {
    this.db = database.db;
    this.model = database.user;
    this.doctor = database.doctor;
  }

  async createUser(data) {
    const exist = await this.getUser(data);
    if (exist) {
      throw new DataConflictError('User with this email already exists');
    }
    return this.model.create({ email: data.email, password: data.password });
  }

  async getUser(data) {
    return this.model.findOne({ where: { email: data.email } });
  }

  async getDoctor(data) {
    return this.doctor.findOne({ where: { userId: data } });
  }
};
