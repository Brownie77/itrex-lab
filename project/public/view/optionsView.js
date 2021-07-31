export default class OptionsView {
  constructor() {
    this.patient = $('#placeholder');
  }

  setEmptyValue() {
    this.patient.contents()[0].data = '<empty>';
  }
}
