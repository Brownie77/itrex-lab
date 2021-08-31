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

  async findOne(query) {
    const array = await this.#getArray();
    const props = query.where;
    const keys = Object.keys(props);

    return array.find((patient) => {
      let match = true;

      keys.map((key) => {
        if (patient[key] !== props[key]) {
          match = false;
        }
      });

      if (match) {
        return { ...patient };
      }
    });
  }

  async #getArray() {
    const array = await this.db.get(this.name);
    return array ? JSON.parse(array) : [];
  }
};
