const TimeHelper = require('../../utils/timeHelper');
const { DataNotFoundError } = require('../../errors/customDataErrs');
const errMsg = require('../errorMessages');

module.exports = class ResolutionsService {
  constructor(Storage, PatientsService) {
    this.storage = Storage;
    this.patientsService = PatientsService;
    this.time = new TimeHelper();
  }

  async set(data) {
    const payload = { ...data };
    delete payload.name;

    const { id } = await this.patientsService.getId({
      name: data.name,
    });

    const validThru = payload.ttl || process.env.TTL_DEF;

    payload.ttl = this.time.now() + this.time.minToMs(validThru);

    return this.storage.save({ id }, payload);
  }

  async get(data) {
    const patient = await this.patientsService.getId({
      name: data.name,
    });

    if (!patient) {
      throw new DataNotFoundError(errMsg.notfound);
    }

    const { id } = patient;
    const found = await this.storage.getOne({ where: { id } });

    if (found.ttl && found.ttl > this.time.now()) {
      return found;
    } else if (found.ttl && found.ttl <= this.time.now()) {
      await this.delete(data);
    }

    return {};
  }

  async delete(data) {
    const { id } = await this.patientsService.getId({
      name: data.name,
    });

    return this.storage.deleteOne({ where: { id } });
  }
};
