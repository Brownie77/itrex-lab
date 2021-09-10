const { Sequelize } = require('sequelize');

const {
  DatabaseFailedToConnectError,
} = require('../../errors/customDatabaseErrs');

const userModel = require('./models/user');
const patientModel = require('./models/patient');
const resolutionModel = require('./models/resolution');
const specialityModel = require('./models/specialty');
const doctorModel = require('./models/doctor');

module.exports = new (class Database {
  constructor() {
    this.type = 'mysql';
    this.db = new Sequelize(
      process.env.MYSQL_DB,
      process.env.MYSQL_USER,
      process.env.MYSQL_PASSWORD,
      {
        dialect: process.env.dialect,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
      },
    );
    this.db
      .authenticate()
      .then(() => {
        console.log('MySQL connection has been established successfully.');
      })
      .catch((err) => {
        throw new DatabaseFailedToConnectError(
          'Unable to connect to the MySQL database:',
          err,
        );
      });

    this.user = this.db.define('users', userModel);
    this.patient = this.db.define('patients', patientModel);
    this.resolution = this.db.define('resolutions', resolutionModel);
    this.specialty = this.db.define('specialty', specialityModel);
    this.doctor = this.db.define('doctor', doctorModel);

    this.doctor.belongsToMany(this.specialty, { through: 'doctor-specialty' });
    this.specialty.belongsToMany(this.doctor, { through: 'doctor-specialty' });
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
    // this.user.sync().catch((err) => console.log(err));
    // this.patient.sync().catch((err) => console.log(err));
    // this.resolution.sync().catch((err) => console.log(err));
    // this.specialty.sync().catch((err) => console.log(err));
    // this.doctor.sync().catch((err) => console.log(err));
    (async () => {
      await this.db.sync({ force: true });
      console.log('All models were synchronized successfully.');
      const totalSpecialities = await this.specialty.count();
      if (totalSpecialities === 0) {
        await this.specialty.bulkCreate([{ name: 'Surgeon' }, { name: 'Therapist' }, { name: 'Otorhinolaryngologist' }, { name: 'Pediatrician' }, { name: 'Proctologist' }, { name: 'Gynecologist' }]);
      }
    })();
  }
})();
