export default class QueueModel {
  enqueue(person) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/queue',
      data: { name: person },
    };
    return axios(config);
  }

  getFirst() {
    return axios
      .get('http://localhost:8080/queue/first')
      .then((res) => res.data.identifier);
  }

  getNext() {
    return axios
      .get('http://localhost:8080/queue/next')
      .then((res) => res.data.identifier);
  }
}
