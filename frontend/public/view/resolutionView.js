export default class ResolutionView {
  constructor() {
    this.resolutionSearchInputDoctor = document.getElementById('doctor-search');
    this.currentPatient = document.getElementById('placeholder');
    this.queueInput = document.getElementById('name');
    this.addResolutionInput = document.getElementById('resolution-text');
    this.resolutionTTL = document.getElementById('resolution-ttl');
    this.resolutionOutputDoctor = document.getElementById(
      'doctor-resolution-found',
    );
    this.resolutionOutputClient = document.getElementById(
      'client-resolution-found',
    );
    this.deleteResolutionBtn = document.getElementById('resolution-delete-btn');
    this.resolutionDisplay =
      document.getElementById('client-resolution-found') || null;
  }

  displayResolutionDoctorAndClearSearchInput(resolution) {
    this.resolutionSearchInputDoctor.value = '';
    this.resolutionOutputDoctor.value = resolution;
    return this;
  }

  displayResolutionClientAndClearSearchInput(resolution) {
    this.resolutionSearchInputClient.value = '';
    this.resolutionOutputClient.value = resolution;
    return this;
  }

  getClientSearchInput() {
    return this.resolutionSearchInputClient.value;
  }

  getDoctorSearchInput() {
    return this.resolutionSearchInputDoctor.value;
  }

  getTTLAndClearInput() {
    const ttl = this.resolutionTTL.value;
    this.resolutionTTL.value = '';
    return ttl;
  }

  setResolution(text) {
    this.resolutionDisplay.value = text;
    return this;
  }

  getCurrentAppointmentResolutionAndClearInput() {
    const resolution = this.addResolutionInput.value;
    this.addResolutionInput.value = '';
    return resolution;
  }

  getCurrentPatientName() {
    return this.currentPatient.textContent;
  }

  setDeleteButtonState(enabled) {
    if (enabled) {
      this.deleteResolutionBtn.disabled = false;
    } else {
      this.deleteResolutionBtn.disabled = true;
    }
    return this;
  }

  clearResolutionOutput() {
    if (this.resolutionOutputDoctor) {
      this.resolutionOutputDoctor.value = '';
    } else {
      this.resolutionOutputClient.value = '';
    }
    return this;
  }
}
