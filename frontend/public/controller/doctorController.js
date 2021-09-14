export default class DoctorController {
    constructor(doctorView, doctorModel) {
      this.view = doctorView;
      this.model = doctorModel;
    
      document.addEventListener('DOMContentLoaded', this.handleLoadDoctors.bind(this));
    }
    async handleLoadDoctors() {
        try {
          const {data: allDoctors} = await this.model.getAllDoctors();
          if(allDoctors) {
              this.view.setDoctors(allDoctors);
          }
        } catch (e) {
          console.log(e);
        }
      }
  }
  