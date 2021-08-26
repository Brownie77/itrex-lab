const { Sequelize } = require('sequelize');
const patientModel = require('../../models/mysql/patient');
const resolutionModel = require('../../models/mysql/resolution');

module.exports = new (class Database {
  constructor() {
    this.DBtype = 'mysql';
    this.client = new Sequelize(
      process.env.MYSQL_DB,
      process.env.MYSQL_USER,
      process.env.MYSQL_PASSWORD,
      {
        dialect: 'mysql',
        host: process.env.MYSQL_HOST || process.env.MYSQL_DEF_HOST,
        port: process.env.MYSQL_PORT,
      },
    );
    this.client
      .authenticate()
      .then(() => {
        console.log('MySQL connection has been established successfully.');
      })
      .catch((err) => {
        console.log('Unable to connect to the MySQL database:', err);
      });

    this.patient = this.client.define('Patients', patientModel);
    this.resolution = this.client.define('Resolutions', resolutionModel);
    this.patient.hasMany(this.resolution, {
      onDelete: 'CASCADE',
    });
    this.resolution.belongsTo(this.patient);
    this.patient.sync().catch((err) => console.log(err));
    this.resolution.sync().catch((err) => console.log(err));
  }
})();
