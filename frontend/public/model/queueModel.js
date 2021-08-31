export default class QueueModel {
  enqueue(person) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/queue',
      data: { name: person },
    };
    return axios(config).then((res) => res.data);
  }

  getFirst() {
    return axios
      .get('http://localhost:8080/api/v1/queue')
      .then((res) => res.data.identifier);
  }

  getNext() {
    return axios
      .get('http://localhost:8080/api/v1/queue/next')
      .then((res) => res.data.identifier);
  }
}
