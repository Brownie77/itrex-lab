const util = require('util');
const StorageClientInterface = require('../storageClientInterface');
const errs = require('../../src/errorMsgs');
const { DatabaseUnknownTypeError } = require('../../errors/customDatabaseErrs');
const typesEnum = require('../storageTypes');

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

  async insert(valOrKey, value) {
    switch (this.type) {
      case typesEnum.MAP:
        return this.storage.set(valOrKey, JSON.stringify(value));
      case typesEnum.ARRAY: {
        const array = await this.#getArray();
        array.push(valOrKey);
        return this.storage.set(this.name, JSON.stringify(array));
      }
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async exist(value) {
    switch (this.type) {
      case typesEnum.MAP:
        return this.storage.exists(value);
      case typesEnum.ARRAY: {
        const array = await this.#getArray();
        return array.some((e) => e.name === value.name);
      }
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async delete(key) {
    switch (this.type) {
      case typesEnum.MAP:
        return this.client.del(key);
      case typesEnum.ARRAY: {
        const array = await this.#getArray();
        array.shift();
        return this.storage.set(this.name, JSON.stringify(array));
      }
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async get(key) {
    switch (this.type) {
      case typesEnum.MAP: {
        const data = await this.storage.get(key);
        return JSON.parse(data);
      }
      case typesEnum.ARRAY: {
        const array = await this.#getArray();
        return array[0];
      }
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
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
