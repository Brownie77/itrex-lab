export default class QueueController {
  constructor(queueView, queueModel) {
    this.view = queueView;
    this.model = queueModel;

    this.EmptyQueueMsg = '<empty>';

    document.addEventListener('DOMContentLoaded', this.handleLoad.bind(this));
    document
      .getElementById('add-to-queue-btn')
      ?.addEventListener('click', this.handleChooseQueue.bind(this));
    document
      .getElementById('add-to-queue-btn')
      ?.addEventListener('click', this.handleAddToQueue.bind(this));
    document
      .getElementById('next-patient')
      ?.addEventListener('click', this.handleProcessCurrentPatient.bind(this));
  
  }
  async handleChooseQueue() {
    try {
        const {data: allDoctors} = await this.model.getAllDoctors();
        const selectedDoctor = this.view.getSelectedDoctor();
        const doctorInfo = allDoctors.filter(doc => doc.name === selectedDoctor);
        await this.model.selectQueue(doctorInfo[0].id)
    } catch (error) {
        console.log(error);
      }
}
  async handleLoad() {
    try {
      if (window.location.pathname === '/cabinet') {
        const { data } = await this.model.getPosition();
        if (data.position) {
          this.view.setPosition(data.position);
        }
      } else {
        await this.model.selectQueue(sessionStorage.getItem("doctorId"));
        const name = await this.model.getFirst();
        if (name) {
          this.view.setCurrentlyDisplayedPatient(name);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async handleProcessCurrentPatient() {
    try {
      if (this.view.getCurrentlyDisplayedPatient() !== this.EmptyQueueMsg) {
        const newPatient = (await this.model.getNext()) || this.EmptyQueueMsg;
        this.view.setCurrentlyDisplayedPatient(newPatient);
      }
    } catch (e) {
      this.view.setCurrentlyDisplayedPatient(this.EmptyQueueMsg);
      console.log(e);
    }
  }

  async handleAddToQueue() {
    try {
      await this.model.enqueue();
      const { data } = await this.model.getPosition();
      if (data.position) {
        this.view.setPosition(data.position);
      }
    } catch (e) {
      console.log(e);
    }
  }
}
