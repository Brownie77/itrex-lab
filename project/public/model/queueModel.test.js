import QueueModel from './queueModel.js';

describe('test QueueModel', () => {
  let model = null;
  const person = 'Dima';

  beforeEach(() => {
    model = new QueueModel();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should enqueue person', () => {
    const spyEnqueue = jest.spyOn(model, 'enqueue');
    model.enqueue(person);
    expect(spyEnqueue).toHaveBeenLastCalledWith(person);
    expect(localStorage.__STORE__[model.storageName]).toBeDefined();
    expect(localStorage.__STORE__[model.storageName]).not.toBeNull();
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    try {
      model.enqueue(person);
    } catch (e) {
      expect(e.message).toBe('Cannot add this person to the queue, theyre already there.');
    }
  });

  test('should return first person', () => {
    const spyGetFirst = jest.spyOn(model, 'getFirst');
    const person2 = 'Someone Else';

    model.enqueue(person);
    model.enqueue(person2);

    expect(model.getFirst()).toBe(person);
    expect(model.getFirst()).not.toBe(person2);
    expect(model.getFirst()).toBeTruthy();
    expect(spyGetFirst).toHaveBeenCalledTimes(3);
  });

  test('should delete first person', () => {
    const spyDequeue = jest.spyOn(model, 'dequeue');
    const person2 = 'Someone Else';

    model.enqueue(person);
    model.enqueue(person2);
    model.dequeue();

    expect(spyDequeue).toHaveBeenCalled();
    expect(model.getFirst()).toBe(person2);
    expect(model.getFirst()).not.toBe(person);
    expect(model.getFirst()).toBeTruthy();
    try {
      model.dequeue();
      model.dequeue();
    } catch (e) {
      expect(e.message).toBe('Cannot delete the first patient from an empty queue.');
    }
  });
});
