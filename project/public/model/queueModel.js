export default class QueueModel {
  constructor() {
    this.queue = this.#getQueue() || [];
  }

  addToQueue(person) {
    if (!this.queue.includes(person)) {
      this.queue.push(person);
      this.#saveQueue();
    }
  }

  getFirstFromQueue() {
    return this.queue[0] ? this.queue[0] : null;
  }

  deleteFirstFromQueue(name) {
    if (name === this.queue[0]) {
      this.queue.shift();
      this.#saveQueue();
    }
  }

  #saveQueue() {
    localStorage.setItem('queue', JSON.stringify(this.queue));
  }

  #getQueue() {
    const arrayStr = localStorage.getItem('queue');
    return arrayStr ? JSON.parse(arrayStr) : null;
  }
}
