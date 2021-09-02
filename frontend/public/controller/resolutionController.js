export default class ResolutionController {
  constructor(resolutionView, resolutionModel) {
    this.view = resolutionView;
    this.model = resolutionModel;
    this.selectedPatient = null;

    this.EmptyResolutionMsg = '<empty>';
    this.EmptyQueueMsg = '<empty>';
    this.NoPatientFoundMsg = '<no such patient>';

    document.addEventListener('DOMContentLoaded', this.handleLoad.bind(this));

    document
      .getElementById('resolution-add-btn')
      ?.addEventListener('click', this.handleAddResolution.bind(this));
    document
      .getElementById('search-resolution-doctor')
      ?.addEventListener('click', this.handleSearchDoctor.bind(this));
    document
      .getElementById('resolution-delete-btn')
      ?.addEventListener('click', this.handleDeleteResolution.bind(this));
  }

  async handleLoad() {
    try {
      if (window.location.pathname === '/cabinet') {
        const { data } = await this.model.fetchResolution();
        if (data.resolution) {
          this.view.setResolution(data.resolution);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleAddResolution() {
    try {
      const resolution =
        this.view.getCurrentAppointmentResolutionAndClearInput();
      let ttl = this.view.getTTLAndClearInput() || 0;
      if (typeof ttl === 'string') {
        ttl = parseInt(ttl);
      } else if (typeof ttl !== 'number') {
        throw new Error('TTL has to be a number');
      }
      const patient = this.view.getCurrentPatientName();
      if (patient !== this.EmptyQueueMsg) {
        await this.model.setByName(patient, resolution, ttl);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleSearchDoctor() {
    try {
      const searchName = this.view.getDoctorSearchInput();
      if (searchName.length) {
        this.view.hideOutput();
        const data = await this.model.getByName(searchName);
        data.map((patient) => {
          this.view.renderPatientCard(patient);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleDeleteResolution() {
    try {
      await this.model.delete(this.selectedPatient);
      this.view.clearResolutionOutput().setDeleteButtonState(false);
    } catch (e) {
      console.log(e);
    }
  }
}
