export default class ResolutionController {
  constructor(resolutionView, resolutionModel) {
    this.view = resolutionView;
    this.model = resolutionModel;
    this.selectedPatient = null;

    this.EmptyResolutionMsg = '<empty>';
    this.EmptyQueueMsg = '<empty>';
    this.NoPatientFoundMsg = '<no such patient>';

    //TODO: fix error messages

    document
      .getElementById('resolution-add-btn')
      ?.addEventListener('click', this.handleAddResolution.bind(this));
    document
      .getElementById('search-resolution-client')
      ?.addEventListener('click', this.handleSearchClient.bind(this));
    document
      .getElementById('search-resolution-doctor')
      ?.addEventListener('click', this.handleSearchDoctor.bind(this));
    document
      .getElementById('resolution-delete-btn')
      ?.addEventListener('click', this.handleDeleteResolution.bind(this));
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
      if (patient !== this.EmptyQueueMsg.toUpperCase()) {
        await this.model.setByName(patient, resolution, ttl);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleSearchClient() {
    try {
      const searchName = this.view.getClientSearchInput();
      if (searchName) {
        const [resolution, status] = await this.model.getByName(searchName);
        let textToDisplay = resolution;
        if (resolution) {
          this.selectedPatient = searchName;
        } else if (status === 200) {
          textToDisplay = this.EmptyResolutionMsg;
        } else {
          textToDisplay = this.NoPatientFoundMsg;
        }
        this.view.displayResolutionClientAndClearSearchInput(textToDisplay);
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleSearchDoctor() {
    try {
      const searchName = this.view.getDoctorSearchInput();
      if (searchName) {
        const [resolution, status] = await this.model.getByName(searchName);
        let textToDisplay = resolution;
        if (resolution) {
          this.selectedPatient = searchName;
          this.view.setDeleteButtonState(true);
        } else if (status === 200) {
          textToDisplay = this.EmptyResolutionMsg;
        } else {
          textToDisplay = this.NoPatientFoundMsg;
        }

        this.view.displayResolutionDoctorAndClearSearchInput(textToDisplay);
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
