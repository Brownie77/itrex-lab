const StorageClientInterface = require('../storageClientInterface');
const errs = require('../../src/errorMsgs');
const {
  DatabaseWrongTypeError,
  DatabaseUnknownTypeError,
} = require('../../errors/customDatabaseErrs');
const typesEnum = require('../storageTypes');

module.exports = class StorageClient extends StorageClientInterface {
  constructor(Database, DBname, type) {
    super();
    this.storage = Database;
    this.name = DBname;
    this.type = type;
    this.#create(this.type, this.name);
  }

  async insert(valOrKey, value) {
    switch (this.type) {
      case typesEnum.MAP:
        return this.storage[this.name].set(valOrKey, value);
      case typesEnum.ARRAY:
        return this.storage[this.name].push(valOrKey);
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async exist(value) {
    switch (this.type) {
      case typesEnum.MAP:
        return this.storage[this.name].has(value);
      case typesEnum.ARRAY:
        if (typeof value !== 'object' || value.name === undefined) {
          throw new DatabaseWrongTypeError(
            "Object with property 'name' expected.",
          );
        }
        return this.storage[this.name].some((e) => e.name === value.name);
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async delete(key) {
    switch (this.type) {
      case typesEnum.MAP:
        return this.storage[this.name].set(key, null);
      case typesEnum.ARRAY:
        return this.storage[this.name].shift();
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  async get(key) {
    switch (this.type) {
      case typesEnum.MAP:
        return { ...this.storage[this.name].get(key) };
      case typesEnum.ARRAY:
        return this.storage[this.name][0];
      default:
        throw new DatabaseUnknownTypeError(errs.unknownDBType);
    }
  }

  #create(type, db) {
    switch (type) {
      case typesEnum.ARRAY:
        this.storage.allocateArray(db);
        break;
      case typesEnum.MAP:
        this.storage.allocateMap(db);
        break;
      default:
        throw new DatabaseUnknownTypeError(errs.wrongDBType);
    }
  }
};
