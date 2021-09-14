export default class QueueModel {
  async selectQueue (doctor_id) {
    console.log(`NEW QUEUE IS`,doctor_id )
      try {
          const config = {
              method: 'POST',
              url: 'http://localhost:8080/api/v1/queue/select',
              data: {doctor_id},
              withCredentials: true,
            };
            return axios(config).then((res) => res);
      } catch (error) {
          console.log(error);
        }
    }
  async getAllDoctors() {
      const config = {
        method: 'GET',
        url: 'http://localhost:8080/api/v1/doctor/all',
        withCredentials: true,
      };
      return axios(config).then((res) => res);
    }
  enqueue() {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/queue',
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }

  getPosition() {
    const config = {
      method: 'GET',
      url: 'http://localhost:8080/api/v1/queue/position',
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }

  getFirst() {
    return axios
      .get('http://localhost:8080/api/v1/queue')
      .then((res) => res.data.name);
  }

  getNext() {
    return axios
      .get('http://localhost:8080/api/v1/queue/next')
      .then((res) => res.data.name);
  }
}
