const SC = require('./storageClient');
const types = require('./storageTypes');
const DB = require('./inmemory/database');
const MapStrategy = require('./inmemory/strategies/map');
const ArrayStrategy = require('./inmemory/strategies/array');

describe('test StorageClient', () => {
  let sc = null;
  const db = DB;

  test('should add to array, return the first element and delete the first element', async () => {
    sc = new SC(db, 'testArray', types.ARRAY, MapStrategy, ArrayStrategy);
    const spyInsert = jest.spyOn(sc, 'insert');
    const spyGet = jest.spyOn(sc, 'get');
    const spyDelete = jest.spyOn(sc, 'delete');
    const one = { identifier: 1 };
    const two = { identifier: 2 };
    await sc.insert(one);
    const value = await sc.get();

    expect(spyInsert).toHaveBeenLastCalledWith(one);
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(spyGet).toHaveBeenLastCalledWith();
    expect(spyGet).toHaveBeenCalledTimes(1);
    expect(value).toBe(one);
    await sc.insert(two);
    expect(sc.exist(one)).toBeTruthy();
    expect(await sc.get()).toBe(one);
    await sc.delete(); // delete one
    expect(await sc.exist(one)).toBeFalsy();
    expect(spyDelete).toHaveBeenLastCalledWith();
    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(await sc.get()).toBe(two);
  });

  test('should add to map, return by key and reset value by key', async () => {
    sc = new SC(db, 'testMap', types.MAP, MapStrategy, ArrayStrategy);
    const one = { identifier: 1 };
    const valueOne = { val: 'one' };
    const two = { identifier: 2 };
    const valueTwo = { val: 'two' };

    await sc.insert(one, valueOne);
    const val = await sc.get(one);
    expect(val).toStrictEqual(valueOne);
    await sc.insert(two, valueTwo);
    let val2 = await sc.get(two);
    expect(val2).toStrictEqual(valueTwo);
    await sc.insert(two, valueOne);
    val2 = await sc.get(two);
    expect(val2).toStrictEqual(valueOne);
    await sc.delete(two);
    val2 = await sc.get(two);
    expect(val2).toStrictEqual({});
    expect(await sc.exist(two)).toBeTruthy();
    expect(await sc.exist({ identifier: 'asd' })).toBeFalsy();
  });
});
