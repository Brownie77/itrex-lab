module.exports = class MemoryStrategy {
  constructor(database, name) {
    this.name = name;
    database.allocateArray(this.name);
    this.db = database[this.name];
  }

  async save(patient) {
    return this.db.push(patient);
  }

  async findOne(query) {
    const props = query.where;
    const keys = Object.keys(props);

    return this.db.find((patient) => {
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
};
