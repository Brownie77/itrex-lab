const util = require('util');
const StorageClientInterface = require('../storageClientInterface');

module.exports = class StorageClient extends StorageClientInterface {
  constructor(Database, DBname, type) {
    super();
    this.name = DBname;
    this.type = type;
    this.storage = Database.client;
    this.storage.get = util.promisify(this.storage.get);
    this.storage.exists = util.promisify(this.storage.exists);
    this.#init();
  }

  async insert(valOrKey, value = undefined) {
    if (value !== undefined) {
      this.storage.set(valOrKey, JSON.stringify(value));
    } else {
      const array = await this.#getArray();
      array.push(valOrKey);
      this.storage.set(this.name, JSON.stringify(array));
    }
  }

  async exist(value) {
    if (this.type === 'map') {
      return this.storage.exists(value);
    }
    if (this.type === 'array') {
      const array = await this.#getArray();
      return array.some((e) => e.name === value.name);
    }
    throw new Error('Unexpected type');
  }

  async delete(key = undefined) {
    if (key !== undefined) {
      this.client.del(key);
    } else {
      const array = await this.#getArray();
      array.shift();
      this.storage.set(this.name, JSON.stringify(array));
    }
  }

  async get(key = undefined) {
    if (key !== undefined) {
      const data = await this.storage.get(key);
      return JSON.parse(data);
    }
    const array = await this.#getArray();
    return array[0];
  }

  async #getArray() {
    const array = await this.storage.get(this.name);
    return JSON.parse(array);
  }

  async #init() {
    if (this.type === 'array') {
      const inited = await this.storage.exists(this.name);
      if (!inited) {
        this.storage.set(this.name, JSON.stringify([]));
      }
    }
  }
};
