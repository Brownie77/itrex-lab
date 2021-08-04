export default class QueueModel {
  constructor() {
    this.queue = this.#syncQueueWithLocalStorage() || [];
    this.storageName = 'queue';
  }

  enqueue(person) {
    if (!this.queue.includes(person)) {
      this.queue.push(person);
      this.#saveQueue();
    }
  }

  getFirst() {
    return this.queue[0] ? this.queue[0] : null;
  }

  dequeue() {
    if (this.queue.length) {
      this.queue.shift();
      this.#saveQueue();
    }
  }

  #saveQueue() {
    localStorage.setItem(this.storageName, JSON.stringify(this.queue));
  }

  #syncQueueWithLocalStorage() {
    const arrayStr = localStorage.getItem(this.storageName);
    return arrayStr ? JSON.parse(arrayStr) : null;
  }
}
