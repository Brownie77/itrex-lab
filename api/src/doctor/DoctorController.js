const jwt = require('jsonwebtoken');
const { DataConflictError } = require('../../errors/customDataErrs');
const adapt = require('../../utils/adapt');

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

  allSpecialites = async (req, res, next) => {
    try {
      const allSpecialites = await this.specialty.findAll();
      return res.status(200).send(allSpecialites);
    } catch (error) {
      return next(error);
    }
  }

  current = async (req, res, next) => {
    const { access_token: accessToken } = adapt(
      {
        props: [{ where: 'cookies', what: 'access_token', onError: 401 }],
      },
      req,
    );

    try {
      const decoded = jwt.verify(accessToken, process.env.SECRET);
      return res.status(200).send(decoded.userId);
    } catch (error) {
      return next(error);
    }
  }
};
