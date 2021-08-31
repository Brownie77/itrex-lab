module.exports = class MemoryStrategy {
  constructor(database, name) {
    this.name = name;
    database.allocateMap(this.name);
    this.db = database[this.name];
  }

  async save(key, value) {
    const id = await this.#findOne({ where: key });

    if (!id) {
      return this.db.set(key, value);
    }
    return this.db.set(id, value);
  }

  async getOne(query) {
    const id = await this.#findOne(query);

    if (!id) {
      return {};
    }

    return this.db.get(id);
  }

  async deleteOne(query) {
    const id = await this.#findOne(query);
    return this.db.delete(id);
  }

  async #findOne(query) {
    const keys = Object.keys(query.where);

    const entries = [...this.db.keys()];

    const id = entries.find((patient) => {
      let match = true;

      keys.map((key) => {
        if (patient[key] !== query.where[key]) {
          match = false;
        }
      });

      if (match) {
        return { ...patient };
      }
    });

    return id;
  }
};
