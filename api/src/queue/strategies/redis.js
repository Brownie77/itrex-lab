const { promisify } = require('util');

module.exports = class RedisStrategy {
  constructor(database, name) {
    this.name = name;
    this.db = database.db;
    this.db.set = promisify(this.db.set);
    this.db.get = promisify(this.db.get);
  }

  async save(patient) {
    const array = await this.#getArray();
    array.push(patient);
    return this.db.set(this.name, JSON.stringify(array));
  }

  async getAtPosition(at) {
    const array = await this.#getArray();
    return array[at];
  }

  async deleteAtPosition(at) {
    const array = await this.#getArray();
    array.splice(at, 1);
    return this.db.set(this.name, JSON.stringify(array));
  }

  async find(value) {
    const array = await this.#getArray();
    return array.findIndex((el) => value === el);
  }

  async #getArray() {
    console.log('queue is', this.name);
    const array = await this.db.get(this.name);
    return array ? JSON.parse(array) : [];
  }
};
