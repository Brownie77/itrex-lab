export default class QueueModel {
  constructor() {
    this.storageName = 'queue';
    this.queue = this.#syncQueueWithLocalStorage() || [];
  }

  enqueue(person) {
    if (!this.queue.includes(person)) {
      this.queue.push(person);

      this.#saveQueue();
    } else {
      throw new Error('Cannot add this person to the queue, theyre already there.');
    }
  }

  deleteByName(person) {
    const idx = this.queue.indexOf(person);
    if (idx > -1) {
      this.queue.splice(idx, 1);
    }
    this.#saveQueue();
  }

  getFirst() {
    return this.queue[0] ? this.queue[0] : null;
  }

  dequeue() {
    if (this.queue.length) {
      this.queue.shift();
      this.#saveQueue();
    } else {
      throw new Error('Cannot delete the first patient from an empty queue.');
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
