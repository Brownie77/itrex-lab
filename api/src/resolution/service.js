const errorMsgs = require('../errorMsgs');
const TimeHelper = require('../../utils/timeHelper');
const { DataNotFoundError } = require('../../errors/customDataErrs');

module.exports = class Service {
  constructor(StorageClient) {
    this.storage = StorageClient;
    this.timeHelper = new TimeHelper(process.env.TTL_DEF);
    this.nullified = { resolution: null, ttl: null };
  }

  async set({ id: key, ...value }) {
    const updatedValue = Object.assign(value);
    updatedValue.ttl = this.timeHelper.setTTL(value.ttl);
    await this.storage.insert(key, updatedValue);
  }

  async getByKey({ id: key }) {
    const exist = await this.storage.exist(key);
    if (!exist) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    const result = await this.storage.get(key);
    if (this.#isOutdated(result.ttl)) {
      this.#reset(key);
      return this.nullified;
    }
    return result;
  }

  #isOutdated(ttl) {
    return this.timeHelper.isOutdated(ttl);
  }

  async #reset(key) {
    const exist = await this.storage.exist(key);
    if (!exist) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    await this.storage.insert(key, this.nullified);
  }

  delete({ id }) {
    this.#reset(id);
  }
};
