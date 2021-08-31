module.exports = class MysqlStrategy {
  constructor(database, name) {
    this.name = name;
    this.db = database.db;
    this.model = database.patient;
  }

  async save({ id, identifier }) {
    return this.model.create({ id, identifier });
  }

  async findOne(query) {
    const data = await this.model.findOne(query);
    return data?.dataValues;
  }
};
