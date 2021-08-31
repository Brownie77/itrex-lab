const { Sequelize } = require('sequelize');
const patientModel = require('./models/patient');
const resolutionModel = require('./models/resolution');

module.exports = new (class Database {
  constructor() {
    this.type = 'mysql';
    this.db = new Sequelize(
      process.env.MYSQL_DB,
      process.env.MYSQL_USER,
      process.env.MYSQL_PASSWORD,
      {
        dialect: process.env.dialect,
        host: process.env.MYSQL_HOST || process.env.MYSQL_DEF_HOST,
        port: process.env.MYSQL_PORT,
      },
    );
    this.db
      .authenticate()
      .then(() => {
        console.log('MySQL connection has been established successfully.');
      })
      .catch((err) => {
        console.log('Unable to connect to the MySQL database:', err);
      });

    this.patient = this.db.define('patients', patientModel);
    this.resolution = this.db.define('resolutions', resolutionModel);
    this.patient.hasMany(this.resolution, {
      onDelete: 'CASCADE',
      hooks: true,
    });
    this.resolution.belongsTo(this.patient, {
      foreignKey: {
        name: 'patientId',
        allowNull: false,
      },
    });
    this.patient.sync().catch((err) => console.log(err));
    this.resolution.sync().catch((err) => console.log(err));
  }
})();
