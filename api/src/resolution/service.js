const StorageClient = require('../../storage/storageClient');
const errorMsgs = require('../errorMsgs');
const TimeHelper = require('../../utils/timeHelper');
const config = require('../../config');
const { DataNotFoundError } = require('../../errors/customDataErrs');
const TypesEnum = require('../../storage/storageTypes');

module.exports = class ResolutionService {
  constructor() {
    this.ttl_default = config.ttl_default;
    this.storage = new StorageClient();
    this.timeHelper = new TimeHelper();
    this.dbName = 'Resolutions';
    this.type = TypesEnum.MAP;
    this.nullified = { resolution: null, ttl: null };
    this.storage.create(this.type, this.dbName);
  }

  set({ id: key, ...value }) {
    const updatedValue = Object.assign(value);
    updatedValue.ttl = this.#setTTL(value.ttl);
    this.storage.insertToMap(this.dbName, key, updatedValue);
  }

  getByKey({ id: key }) {
    if (!this.storage.existInMap(this.dbName, key)) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    const result = this.storage.getFromMap(this.dbName, key);
    if (this.#isOutdated(result.ttl)) {
      this.#reset(key);
      return this.nullified;
    }
    return result;
  }

  delete({ id }) {
    this.#reset(id);
  }

  #isOutdated(ttl) {
    return ttl ? ttl < Date.now() : false;
  }

  #reset(key) {
    if (!this.storage.existInMap(this.dbName, key)) {
      throw new DataNotFoundError(errorMsgs.notfound);
    }
    this.storage.insertToMap(this.dbName, key, this.nullified);
  }

  #setTTL(ttl) {
    if (ttl === 0) {
      return Date.now() + this.timeHelper.minToMs(this.ttl_default);
    }
    return Date.now() + this.timeHelper.minToMs(ttl);
  }
};
