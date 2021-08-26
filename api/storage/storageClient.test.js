const SC = require('./storageClient');
const types = require('./storageTypes');
const DB = require('./inmemory/database');
const MapStrategy = require('./inmemory/strategies/map');
const ArrayStrategy = require('./inmemory/strategies/array');

describe('test StorageClient', () => {
  let sc = null;
  const db = DB;

  it('should add to array', async () => {
    sc = new SC(db, 'testArray1', types.ARRAY, MapStrategy, ArrayStrategy);
    const spyInsert = jest.spyOn(sc, 'insert');
    const one = { identifier: 1 };
    await sc.insert(one);
    expect(sc.storage.testArray1[0]).toStrictEqual(one);
    expect(spyInsert).toHaveBeenLastCalledWith(one);
    expect(spyInsert).toHaveBeenCalledTimes(1);
  });

  it('should return first from array', async () => {
    sc = new SC(db, 'testArray2', types.ARRAY, MapStrategy, ArrayStrategy);
    const spyGet = jest.spyOn(sc, 'get');
    const one = { identifier: 1 };
    const two = { identifier: 2 };
    await sc.insert(one);
    await sc.insert(two);
    const res = await sc.get();
    expect(res).toStrictEqual(one);
    expect(spyGet).toHaveBeenCalledTimes(1);
  });

  it('should delete first from array', async () => {
    sc = new SC(db, 'testArray3', types.ARRAY, MapStrategy, ArrayStrategy);
    const spyDelete = jest.spyOn(sc, 'delete');
    const one = { identifier: 1 };
    const two = { identifier: 2 };
    await sc.insert(one);
    await sc.insert(two);
    let res = await sc.get();
    expect(res).toStrictEqual(one);

    await sc.delete();
    expect(spyDelete).toHaveBeenCalledTimes(1);

    res = await sc.get();
    expect(res).toStrictEqual(two);
  });

  it('should tell if object exists in array', async () => {
    sc = new SC(db, 'testArray4', types.ARRAY, MapStrategy, ArrayStrategy);
    const spyExist = jest.spyOn(sc, 'exist');
    const one = { identifier: 1 };
    const two = { identifier: 2 };
    await sc.insert(one);
    await sc.insert(two);
    expect(await sc.exist(one)).toBeTruthy();
    await sc.delete();
    expect(spyExist).toHaveBeenCalledTimes(1);
    expect(await sc.exist(one)).toBeFalsy();
  });

  it('should add to map', async () => {
    sc = new SC(db, 'testMap1', types.MAP, MapStrategy, ArrayStrategy);
    const one = { identifier: 1 };
    const valueOne = { val: 'one' };
    await sc.insert(one, valueOne);
    expect(sc.storage.testMap1.get(one)).toStrictEqual(valueOne);
  });

  it('should return by key', async () => {
    sc = new SC(db, 'testMap2', types.MAP, MapStrategy, ArrayStrategy);
    const one = { identifier: 1 };
    const valueOne = { val: 'one' };
    await sc.insert(one, valueOne);
    const res = await sc.get(one);
    expect(res).toStrictEqual(valueOne);
  });

  it('should delete by key', async () => {
    sc = new SC(db, 'testMap2', types.MAP, MapStrategy, ArrayStrategy);
    const one = { identifier: 1 };
    const valueOne = { val: 'one' };
    await sc.insert(one, valueOne);
    let res = await sc.get(one);
    expect(res).toStrictEqual(valueOne);
    await sc.delete(one);
    res = await sc.get(one);
    expect(res).toStrictEqual({});
  });

  it('should reset by key', async () => {
    sc = new SC(db, 'testMap2', types.MAP, MapStrategy, ArrayStrategy);
    const one = { identifier: 1 };
    const valueOne = { val: 'one' };
    const valueTwo = { val: 'two' };
    await sc.insert(one, valueOne);
    let res = await sc.get(one);
    expect(res).toStrictEqual(valueOne);
    await sc.insert(one, valueTwo);
    res = await sc.get(one);
    expect(res).toStrictEqual(valueTwo);
  });

  it('should tell if given key exists', async () => {
    sc = new SC(db, 'testMap2', types.MAP, MapStrategy, ArrayStrategy);
    const one = { identifier: 1 };
    const valueOne = { val: 'one' };
    await sc.insert(one, valueOne);
    let exist = await sc.exist(one);
    expect(exist).toBeTruthy();
    await sc.delete(one);
    exist = await sc.exist(one);
    expect(exist).toBeFalsy();
  });
});
