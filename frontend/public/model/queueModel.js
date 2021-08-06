export default class QueueModel {
  enqueue(person) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/queue/add',
      data: { name: person },
    };
    return axios(config);
  }

  getFirst() {
    return axios.get('http://localhost:8080/queue/first').then((res) => res.data.name);
  }

  dequeue() {
    return axios.delete('http://localhost:8080/queue/delete');
  }
}
