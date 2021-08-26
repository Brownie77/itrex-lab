module.exports = class Resolution {
  constructor(patient, resolution, ttl) {
    this.patient = patient.id;
    this.resolution = resolution;
    this.ttl = ttl;
  }
};
