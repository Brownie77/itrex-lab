import ResolutionModel from './resolutionModel.js';

describe('test ResolutionModel', () => {
  let model = null;
  const person = 'Dima';
  const resolution = 'A';

  beforeEach(() => {
    model = new ResolutionModel();
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('should add', () => {
    const spyAdd = jest.spyOn(model, 'add');

    model.add(person);

    expect(spyAdd).toHaveBeenLastCalledWith(person);
    expect(localStorage.__STORE__[model.storageName]).toBeDefined();
    expect(localStorage.__STORE__[model.storageName]).not.toBeNull();
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test('should set and return a resolution by persons name', () => {
    const spyGetByName = jest.spyOn(model, 'getByName');
    const spySetByName = jest.spyOn(model, 'setByName');
    const person2 = 'Someone';

    model.add(person2);
    model.add(person);
    model.setByName(person, resolution);

    expect(model.getByName(person)).toBe(resolution);
    expect(model.getByName(person2)).toBeNull();
    expect(model.getByName(person2)).not.toBe(resolution);
    expect(spyGetByName).toHaveBeenCalledTimes(3);
    expect(spySetByName).toHaveBeenLastCalledWith(person, resolution);
  });

  test('should delete a resolution by persons name', () => {
    const spyDelete = jest.spyOn(model, 'delete');
    const person2 = 'Someone';

    model.add(person);
    model.setByName(person, resolution);

    expect(model.getByName(person)).toBe(resolution);

    model.delete(person);

    expect(model.getByName(person)).not.toBe(resolution);
    expect(model.getByName(person)).toBeNull();
    expect(spyDelete).toHaveBeenLastCalledWith(person);

    try {
      model.delete(person2);
    } catch (e) {
      expect(e.message).toBe('Cannot delete patients resolution that doesnt exist.');
    }
  });

  test('should tell if the person is in the list', () => {
    const spyIsIn = jest.spyOn(model, 'isIn');
    const person2 = 'Someone';

    model.add(person);

    expect(model.isIn(person)).toBeTruthy();
    expect(model.isIn(person2)).toBeFalsy();

    expect(spyIsIn).toHaveBeenLastCalledWith(person2);
    expect(spyIsIn).toHaveBeenCalledTimes(2);
  });
});
