const SC = require('./storageClient');

describe('test StorageClient', () => {
  let sc = null;

  beforeEach(() => {
    sc = new SC();
  });

  test('should add to array, return the first element and delete the first element', () => {
    sc.create('array', 'testArray');
    const spyInsert = jest.spyOn(sc, 'insert');
    const spyGet = jest.spyOn(sc, 'get');
    const spyDelete = jest.spyOn(sc, 'delete');
    const one = { name: 1 };
    const two = { name: 2 };
    sc.insert('testArray', one);
    const value = sc.get('testArray');

    expect(spyInsert).toHaveBeenLastCalledWith('testArray', one);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(spyGet).toHaveBeenLastCalledWith('testArray');
    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(value).toBe(one);
    sc.insert('testArray', two);
    expect(sc.exist('array', 'testArray', one)).toBeTruthy();
    expect(sc.get('testArray')).toBe(one);
    sc.delete('testArray'); // delete one
    expect(sc.exist('array', 'testArray', one)).toBeFalsy();
    expect(spyDelete).toHaveBeenLastCalledWith('testArray');
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(sc.get('testArray')).toBe(two);
  });

  test('should add to map, return by key and reset value by key', () => {
    sc.create('map', 'testMap');
    const one = { name: 1 };
    const valueOne = { val: 'one' };
    const two = { name: 2 };
    const valueTwo = { val: 'two' };

    sc.insert('testMap', one, valueOne);
    const val = sc.get('testMap', one);
    expect(val).toStrictEqual(valueOne);
    sc.insert('testMap', two, valueTwo);
    let val2 = sc.get('testMap', two);
    expect(val2).toStrictEqual(valueTwo);
    sc.insert('testMap', two, valueOne);
    val2 = sc.get('testMap', two);
    expect(val2).toStrictEqual(valueOne);
    sc.delete('testMap', two);
    val2 = sc.get('testMap', two);
    expect(val2).toStrictEqual({});
    expect(sc.exist('map', 'testMap', two)).toBeTruthy();
    expect(sc.exist('map', 'testMap', { name: 'asd' })).toBeFalsy();
  });
});
