export default class ResolutionController {
  constructor(resolutionView, resolutionModel) {
    this.view = resolutionView;
    this.model = resolutionModel;
    this.selectedPatient = null;

    this.EmptyResolutionMsg = '<empty>';
    this.NoPatientFoundMsg = '<no such patient>';

    $('#add-to-queue-btn').click(this.handleNewPatient.bind(this));
    $('#resolution-add-btn').click(this.handleAddResolution.bind(this));
    $('#search-resolution-client').click(this.handleSearchClient.bind(this));
    $('#search-resolution-doctor').click(this.handleSearchDoctor.bind(this));
    $('#resolution-delete-btn').click(this.handleDeleteResolution.bind(this));
  }

  handleNewPatient() {
    const patient = this.view.getNameFromInput();
    this.model.add(patient);
  }

  handleAddResolution() {
    const resolution = this.view.getCurrentAppointmentResolutionAndClearInput();
    const patient = this.view.getCurrentPatientName();
    this.model.setByName(patient, resolution);
  }

  handleSearchClient() {
    const searchName = this.view.getClientSearchInput();
    let textToDisplay = this.NoPatientFoundMsg;
    if (this.model.isIn(searchName)) {
      const resolution = this.model.getByName(searchName);
      textToDisplay = resolution || this.EmptyResolutionMsg;
    }
    this.view.displayResolutionClientAndClearSearchInput(textToDisplay);
  }

  handleSearchDoctor() {
    const searchName = this.view.getDoctorSearchInput();
    let textToDisplay = this.NoPatientFoundMsg;
    const exists = this.model.isIn(searchName);
    if (exists) {
      const resolution = this.model.getByName(searchName);
      textToDisplay = resolution || this.EmptyResolutionMsg;
      this.selectedPatient = searchName;
      if (resolution) {
        this.view.setDeleteButtonState(false);
      }
    }
    this.view.displayResolutionDoctorAndClearSearchInput(textToDisplay);
  }

  handleDeleteResolution() {
    this.model.delete(this.selectedPatient);
    this.view.clearResolutionOutputs().setDeleteButtonState(true);
  }
}
