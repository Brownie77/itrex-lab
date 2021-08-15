const errs = require('../../src/errorMsgs');
const {
  DatabaseWrongTypeError,
  DatabaseUnknownTypeError,
} = require('../../errors/customDatabaseErrs');

module.exports = class StorageClient {
  constructor(Database, DBname, type = null) {
    this.storage = Database;
    this.name = DBname;
    this.type = type;
    this.#create(this.type, this.name);
  }

  async insert(valOrKey, value = undefined) {
    if (value !== undefined) {
      this.storage[this.name].set(valOrKey, value);
    } else {
      this.storage[this.name].push(valOrKey);
    }
  }

  async exist(value) {
    switch (this.type) {
      case 'map':
        return this.storage[this.name].has(value);
      case 'array':
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

  async delete(key = undefined) {
    if (key !== undefined) {
      this.storage[this.name].set(key, null);
    } else {
      this.storage[this.name].shift();
    }
  }

  async get(key = undefined) {
    if (key !== undefined) {
      return { ...this.storage[this.name].get(key) };
    }
    return this.storage[this.name][0];
  }

  #create(type, db) {
    switch (type) {
      case 'array':
        this.storage.allocateArray(db);
        break;
      case 'map':
        this.storage.allocateMap(db);
        break;
      default:
        throw new DatabaseUnknownTypeError(errs.wrongDBType);
    }
  }
};
