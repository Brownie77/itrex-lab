const errorMsgs = require('../errorMsgs');
const TimeHelper = require('../../utils/timeHelper');
const { DataNotFoundError } = require('../../errors/customDataErrs');
const Resolution = require('../../models/resolution');

module.exports = class ResolutionService {
  constructor(ResolutionStorageClient, PatientStorageClient) {
    this.resolutionStorage = ResolutionStorageClient;
    this.patients = PatientStorageClient;
    this.timeHelper = new TimeHelper();
    this.ttl_default = process.env.TTL_DEF;
  }

  async set(data) {
    const { id: identifier } = data;
    const ttl = this.#setTTL(data.ttl);
    const patient = await this.patients.findByIdentifier(identifier);
    const resolution = new Resolution(patient, data.resolution, ttl);
    return this.resolutionStorage.insert(patient.id, resolution);
  }

  async getByKey({ id: identifier }) {
    const { id } = await this.patients.findByIdentifier(identifier);
    const exist = await this.resolutionStorage.exist(id);
    if (!exist) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    const result = await this.resolutionStorage.get(id);
    if (this.#isOutdated(result.ttl)) {
      await this.#reset(identifier);
      return null;
    }
    return result;
  }

  #setTTL(ttl) {
    if (ttl === 0) {
      return Date.now() + this.timeHelper.minToMs(this.ttl_default);
    }
    return Date.now() + this.timeHelper.minToMs(ttl);
  }

  // eslint-disable-next-line class-methods-use-this
  #isOutdated(ttl) {
    return ttl ? ttl < Date.now() : false;
  }

  async #reset(key) {
    const { id } = await this.patients.findByIdentifier(key);
    const exist = await this.resolutionStorage.exist(id);
    if (!exist) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    return this.resolutionStorage.delete(id);
  }

  async delete({ id }) {
    return this.#reset(id);
  }
};
