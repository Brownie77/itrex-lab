const StorageClient = require('../../storage/storageClient');
const errorMsgs = require('../errorMsgs');
const TimeHelper = require('../../utils/timeHelper');
const config = require('../../config');
const { DataNotFoundError } = require('../../errors/customDataErrs');

module.exports = class Service {
  constructor() {
    this.storage = new StorageClient();
    this.dbName = 'Resolutions';
    this.timeHelper = new TimeHelper(config.ttl_default);
    this.type = 'map';
    this.nullified = { resolution: null, ttl: null };
    this.storage.create(this.type, this.dbName);
  }

  set({ id: key, ...value }) {
    const updatedValue = Object.assign(value);
    updatedValue.ttl = this.timeHelper.setTTL(value.ttl);
    this.storage.insert(this.dbName, key, updatedValue);
  }

  getByKey({ id: key }) {
    if (!this.storage.exist(this.type, this.dbName, key)) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    const result = this.storage.get(this.dbName, key);
    if (this.#isOutdated(result.ttl)) {
      this.#reset(key);
      return this.nullified;
    }
    return result;
  }

  #isOutdated(ttl) {
    return this.timeHelper.isOutdated(ttl);
  }

  #reset(key) {
    if (!this.storage.exist(this.type, this.dbName, key)) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    this.storage.insert(this.dbName, key, this.nullified);
  }

  delete({ id }) {
    this.#reset(id);
  }
};
