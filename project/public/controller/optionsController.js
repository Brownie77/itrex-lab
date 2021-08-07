export default class OptionsController {
  constructor(optionsView, optionsModel) {
    this.view = optionsView;
    this.model = optionsModel;

    $('#drop').click(this.handleDrop.bind(this));
  }

  handleDrop() {
    this.model.deleteAll();
    this.view.setEmptyValue().reload();
  }
}
