const { promisify } = require('util');
const StrategyInterface = require('../../strategyInterface');

module.exports = class MapStrategy extends StrategyInterface {
  constructor(storage, name) {
    super();
    this.storage = storage.client;
    this.name = name;
    this.storage.get = promisify(this.storage.get);
  }

  async insert(key, value) {
    return this.storage.set(key, JSON.stringify(value));
  }

  async exist(value) {
    return this.storage.exists(value);
  }

  async delete(key) {
    return this.storage.del(key);
  }

  async get(key) {
    const data = await this.storage.get(key);
    return JSON.parse(data);
  }
};
