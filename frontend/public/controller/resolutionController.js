export default class ResolutionController {
  constructor(resolutionView, resolutionModel) {
    this.view = resolutionView;
    this.model = resolutionModel;
    this.selectedPatient = null;

    this.EmptyResolutionMsg = '<empty>';
    this.NoPatientFoundMsg = '<no such patient>';

    //TODO: fix error messages

    $('#add-to-queue-btn').click(this.handleNewPatient.bind(this));
    $('#resolution-add-btn').click(this.handleAddResolution.bind(this));
    $('#search-resolution-client').click(this.handleSearchClient.bind(this));
    $('#search-resolution-doctor').click(this.handleSearchDoctor.bind(this));
    $('#resolution-delete-btn').click(this.handleDeleteResolution.bind(this));
  }

  async handleNewPatient() {
    const patient = this.view.getNameFromInput();
    await this.model.add(patient);
  }

  async handleAddResolution() {
    const resolution = this.view.getCurrentAppointmentResolutionAndClearInput();
    const ttl = this.view.getTTLAndClearInput() || null;
    const patient = this.view.getCurrentPatientName();
    await this.model.setByName(patient, resolution, ttl);
  }

  async handleSearchClient() {
    const searchName = this.view.getClientSearchInput();
    const resolution = await this.model.getByName(searchName);
    const textToDisplay = resolution || this.EmptyResolutionMsg;
    this.view.displayResolutionClientAndClearSearchInput(textToDisplay);
  }

  async handleSearchDoctor() {
    const searchName = this.view.getDoctorSearchInput();
    const resolution = await this.model.getByName(searchName);
    const textToDisplay = resolution || this.EmptyResolutionMsg;
    this.selectedPatient = searchName;
    if (resolution) {
      this.view.setDeleteButtonState(false);
    }
    this.view.displayResolutionDoctorAndClearSearchInput(textToDisplay);
  }

  async handleDeleteResolution() {
    await this.model.delete(this.selectedPatient);
    this.view.clearResolutionOutputs().setDeleteButtonState(true);
  }
}
