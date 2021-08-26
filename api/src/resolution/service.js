const errorMsgs = require('../errorMsgs');
const TimeHelper = require('../../utils/timeHelper');
const { DataNotFoundError } = require('../../errors/customDataErrs');

module.exports = class ResolutionService {
  constructor(StorageClient) {
    this.storage = StorageClient;
    this.timeHelper = new TimeHelper();
    this.ttl_default = process.env.TTL_DEF;
    this.nullified = { resolution: null, ttl: null };
  }

  async set({ id: key, ...value }) {
    const updatedValue = Object.assign(value);
    updatedValue.ttl = this.#setTTL(value.ttl);
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
