module.exports = class MysqlStrategy {
  constructor(database, name) {
    this.name = name;
    this.db = database.db;
    this.model = database.resolution;
  }

  async save({ id: patientId }, { resolution, ttl }) {
    const exist = await this.getOne({ where: { id: patientId } });
    if (Object.keys(exist).length === 0) {
      return this.model.create({ resolution, ttl, patientId });
    } else {
      return this.model.update({ resolution, ttl }, { where: { patientId } });
    }
  }

  async getOne(query) {
    const data = await this.model.findAll({
      where: { patientId: query.where.id },
    });

    if (!data[0]) {
      return {};
    }
    return data[0].dataValues;
  }

  async deleteOne(query) {
    this.model.destroy({ where: { patientId: query.where.id } });
  }
};
