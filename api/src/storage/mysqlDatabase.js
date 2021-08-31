const { Sequelize } = require('sequelize');

const userModel = require('./models/user');
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

    this.user = this.db.define('users', userModel);
    this.patient = this.db.define('patients', patientModel);
    this.resolution = this.db.define('resolutions', resolutionModel);

    this.user.hasOne(this.patient, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    this.patient.belongsTo(this.user);

    this.patient.hasOne(this.resolution, {
      onDelete: 'CASCADE',
    });
    this.resolution.belongsTo(this.patient, {
      foreignKey: {
        name: 'patientId',
        allowNull: false,
      },
    });

    this.user.sync().catch((err) => console.log(err));
    this.patient.sync().catch((err) => console.log(err));
    this.resolution.sync().catch((err) => console.log(err));
  }
})();
