export default class OptionsView {
  constructor() {
    this.patient = $('#placeholder');
  }

  setEmptyValue() {
    this.patient.contents()[0].data = '<empty>';
    return this;
  }

  reload() {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    return this;
  }
}
