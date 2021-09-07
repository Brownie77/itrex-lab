export default class QueueModel {
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
