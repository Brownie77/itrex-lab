const StorageClient = require('../../storage/storageClient');
const errorMsgs = require('../errorMsgs');

module.exports = new (class {
  constructor() {
    this.sc = StorageClient;
    this.dbName = 'Resolutions';
    this.type = 'map';
    this.sc.create(this.type, this.dbName);
  }

  set({ id: key, ...value }) {
    if (value.ttl !== 0) {
      const msToMin = 60 * 1000;
      const updatedValue = Object.assign(value);
      updatedValue.ttl = Date.now() + value.ttl * msToMin;
      this.sc.insert(this.dbName, key, updatedValue);
    } else {
      this.sc.insert(this.dbName, key, value);
    }
  }

  getByKey({ id: key }) {
    if (!this.sc.exist(this.type, this.dbName, key)) {
      throw new Error(errorMsgs.notfound);
    }
    if (this.#isOutdated(key)) {
      this.reset(key);
    }
    return this.sc.get(this.dbName, key);
  }

  #isOutdated(key) {
    const { ttl } = this.sc.get(this.dbName, key);
    return ttl !== 0 && ttl < Date.now();
  }

  reset(key) {
    if (!this.sc.exist(this.type, this.dbName, key)) {
      throw new Error(errorMsgs.notfound);
    }
    this.sc.insert(this.dbName, key, { resolution: null, ttl: 0 });
  }

  delete({ id }) {
    this.reset(id);
  }
})();
