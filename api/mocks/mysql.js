const SequelizeMock = require('sequelize-mock');
const patientModel = require('../models/mysql/patient');
const resolutionModel = require('../models/mysql/resolution');

module.exports = new (class Database {
  constructor() {
    this.DBtype = 'mysql';
    this.client = new SequelizeMock();
    this.patient = this.client.define('Patients', patientModel);
    this.resolution = this.client.define('Resolutions', resolutionModel);
    this.patient.hasMany(this.resolution);
    this.resolution.belongsTo(this.patient);
  }
})();
