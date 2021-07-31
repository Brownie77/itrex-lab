export default class ResolutionController {
  constructor(resolutionView, resolutionModel) {
    this.view = resolutionView;
    this.model = resolutionModel;
    this.patientsNameWhoseResolutionWasFound = null;

    $('#add-to-queue-btn').click(this.handleNewPatient.bind(this));
    $('#resolution-add-btn').click(this.handleAddResolution.bind(this));
    $('#search-resolution-client').click(this.handleSearchClient.bind(this));
    $('#search-resolution-doctor').click(this.handleSearchDoctor.bind(this));
    $('#resolution-delete-btn').click(this.handleDeleteResolution.bind(this));
  }

  handleNewPatient() {
    const patient = this.view.getNameFromInput();
    this.model.addToResolutionMap(patient);
  }

  handleAddResolution() {
    const resolution = this.view.getCurrentAppointmentResolution();
    const patient = this.view.getCurrentPatientName();
    this.model.setResolution(patient, resolution);
  }

  handleSearchClient() {
    const searchText = this.view.getClientSearchInput();
    let textToDisplay = 'No such user';
    if (this.model.isIn(searchText)) {
      const resolution = this.model.getResolutionByName(searchText);
      textToDisplay = resolution ? resolution : 'Empty';
    }
    this.view.displayResolutionClient(textToDisplay);
  }

  handleSearchDoctor() {
    const searchText = this.view.getDoctorSearchInput();
    let textToDisplay = 'No such user';
    if (this.model.isIn(searchText)) {
      const resolution = this.model.getResolutionByName(searchText);
      textToDisplay = resolution ? resolution : 'Empty';
      this.patientsNameWhoseResolutionWasFound = searchText;
    }
    this.view.displayResolutionDoctor(textToDisplay);
    this.view.setDeleteButtonState(false);
  }

  handleDeleteResolution() {
    this.model.deleteResolution(this.patientsNameWhoseResolutionWasFound);
    this.view.clearResolutionOutputs();
    this.view.setDeleteButtonState(true);
  }
}
