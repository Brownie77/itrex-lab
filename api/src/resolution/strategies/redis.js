const { promisify } = require('util');

module.exports = class RedisStrategy {
  constructor(database, name) {
    this.name = name;
    this.db = database.db;
    this.dbInstance = database;
    this.db.set = promisify(this.db.set);
    this.db.get = promisify(this.db.get);
    this.db.del = promisify(this.db.del);
  }

  async save(key, value) {
    return this.db.set(JSON.stringify(key), JSON.stringify(value));
  }

  async getOne(query) {
    const id = await this.#findOne(query);

    if (!id) {
      return {};
    }

    const payload = await this.db.get(id);

    return JSON.parse(payload);
  }

  async deleteOne(query) {
    const id = await this.#findOne(query);

    if (!id) {
      return;
    }

    return this.db.del(id);
  }

  async #findOne(query) {
    let pattern = '*';
    for (const [key, value] of Object.entries(query.where)) {
      pattern += `"${key}":"${value}"*`;
    }

    const found = await this.dbInstance.scanAll(pattern);

    const response = found[0];

    return response;
  }
};
