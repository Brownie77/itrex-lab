const { Sequelize } = require('sequelize');
const { promisify } = require('util');
const bcrypt = require('bcrypt');

const hash = promisify(bcrypt.hash);
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

    this.specialty.hasMany(this.doctor, {
      foreignKey: {
        name: 'specialtyId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    this.doctor.belongsTo(this.specialty);

    this.user.hasOne(this.patient, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    this.user.hasOne(this.doctor, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
    this.doctor.belongsTo(this.user);
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
      const totalDoctors = await this.doctor.count();
      const totalUsers = await this.user.count();
      // if (totalUsers === 0) {
      const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
      const firstMD = await this.user.create({
        email: process.env.FIRSTMD_EMAIL,
        password: await hash(process.env.FIRSTMD_PASSWORD, saltRounds),
      });
      const secondMD = await this.user.create({
        email: process.env.SECONDMD_EMAIL,
        password: await hash(process.env.SECONDMD_PASSWORD, saltRounds),
      });
      const thirdMD = await this.user.create({
        email: process.env.THIRDMD_EMAIL,
        password: await hash(process.env.THIRDMD_PASSWORD, saltRounds),
      });
      const fourthMD = await this.user.create({
        email: process.env.FOURTHMD_EMAIL,
        password: await hash(process.env.FOURTHMD_PASSWORD, saltRounds),
      });
      // }
      // if (totalSpecialities === 0) {
      const specialities = await this.specialty.bulkCreate([{ name: 'Surgeon' }, { name: 'Therapist' }, { name: 'Otorhinolaryngologist' }, { name: 'Pediatrician' }, { name: 'Proctologist' }, { name: 'Gynecologist' }]);
      await this.doctor.bulkCreate([{ name: 'Nikolai Amosov', specialtyId: specialities[0].id, userId: firstMD.id },
        { name: 'Nikolai Pirogov', specialtyId: specialities[1].id, userId: secondMD.id },
        { name: 'Sergei Botkin', specialtyId: specialities[2].id, userId: thirdMD.id },
        { name: 'Ivan Pavlov', specialtyId: specialities[3].id, userId: fourthMD.id }]);
      // }
    })();
  }
})();
