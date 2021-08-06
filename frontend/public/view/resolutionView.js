export default class ResolutionView {
  constructor() {
    this.resolutionSearchInputDoctor = $('#doctor-search');
    this.resolutionSearchInputClient = $('#client-search');
    this.currentPatient = $('#placeholder');
    this.queueInput = $('#name');
    this.addResolutionInput = $('#resolution-text');
    this.resolutionTTL = $('#resolution-ttl');
    this.resolutionOutputDoctor = $('#doctor-resolution-found');
    this.resolutionOutputClient = $('#client-resolution-found');
    this.deleteResolutionBtn = $('#resolution-delete-btn');
  }

  displayResolutionDoctorAndClearSearchInput(resolution) {
    this.resolutionSearchInputDoctor.val('');
    this.resolutionOutputDoctor.val(resolution);
    return this;
  }

  displayResolutionClientAndClearSearchInput(resolution) {
    this.resolutionSearchInputClient.val('');
    this.resolutionOutputClient.val(resolution);
    return this;
  }

  getClientSearchInput() {
    return this.resolutionSearchInputClient.val().toUpperCase();
  }

  getDoctorSearchInput() {
    return this.resolutionSearchInputDoctor.val().toUpperCase();
  }

  getTTLAndClearInput() {
    const ttl = this.resolutionTTL.val();
    this.resolutionTTL.val('');
    return ttl;
  }

  getCurrentAppointmentResolutionAndClearInput() {
    const resolution = this.addResolutionInput.val();
    this.addResolutionInput.val('');
    return resolution;
  }

  getCurrentPatientName() {
    return this.currentPatient.text().toUpperCase();
  }

  getNameFromInput() {
    const name = this.queueInput.val();
    return name.toUpperCase();
  }

  setDeleteButtonState(state) {
    this.deleteResolutionBtn.attr('disabled', state);
    return this;
  }

  clearResolutionOutputs() {
    this.resolutionOutputDoctor.val('');
    this.resolutionOutputClient.val('');
    return this;
  }
}
