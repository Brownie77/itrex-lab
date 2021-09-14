export default class DoctorModel {
    async currentDoctor() {
        const config = {
          method: 'POST',
          url: 'http://localhost:8080/api/v1/doctor/current',
          withCredentials: true,
        };
        return axios(config).then((res) => res);

    }
      async getAllDoctors() {
        const config = {
          method: 'GET',
          url: 'http://localhost:8080/api/v1/doctor/all',
          withCredentials: true,
        };
        return axios(config).then((res) => res);
      }
  }
  