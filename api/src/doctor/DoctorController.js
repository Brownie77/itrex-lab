const { DataConflictError } = require('../../errors/customDataErrs');

module.exports = class DoctorController {
  constructor(database) {
    this.db = database.db;
    this.doctor = database.doctor;
    this.specialty = database.specialty;
  }

  add = async (req, res, next) => {
    try {
      const doctor = await this.doctor.create({ name: req.body.name });
      return res.status(200).send(doctor);
    } catch (error) {
      return next(error);
    }
  }

  all = async (req, res, next) => {
    try {
      const allDoctors = await this.doctor.findAll();
      return res.status(200).send(allDoctors);
    } catch (error) {
      return next(error);
    }
  }

  addSpeciality = async (req, res, next) => {
    try {
      const speciality = await this.specialty.create({ name: req.body.name });
      return res.status(200).send(speciality);
    } catch (error) {
      return next(error);
    }
  }
};
