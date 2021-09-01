module.exports = class MemoryStrategy {
  constructor(database, name) {
    this.name = name;
    database.allocateArray(this.name);
    this.db = database[this.name];
  }

  async save(patient) {
    return this.db.push(patient);
  }

  async getAtPosition(at) {
    return this.db[at];
  }

  async deleteAtPosition(at) {
    return this.db.splice(at, 1);
  }

  async find(value) {
    return this.db.findIndex((el) => value === el);
  }
};
