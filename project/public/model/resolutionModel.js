export default class ResolutionModel {
  constructor() {
    this.resolutionMap = this.#syncResolutionMapWithLocalStorage() || new Map();
    this.storageName = 'resolutions';
  }

  getByName(name) {
    return this.resolutionMap.get(name);
  }

  add(person) {
    this.resolutionMap.set(person, null);
    this.#saveResolutionMap();
  }

  setByName(person, resolution) {
    if (this.isIn(person)) {
      this.resolutionMap.set(person, resolution);
      this.#saveResolutionMap();
    }
  }

  isIn(name) {
    return this.resolutionMap.has(name);
  }

  delete(name) {
    if (this.isIn(name)) {
      this.resolutionMap.set(name, null);
      this.#saveResolutionMap();
    } else {
      throw new Error('Cannot delete patients resolution that doesnt exist.');
    }
  }

  #saveResolutionMap() {
    localStorage.setItem(
      this.storageName,
      JSON.stringify(Array.from(this.resolutionMap.entries())),
    );
  }

  #syncResolutionMapWithLocalStorage() {
    const resolutions = localStorage.getItem(this.storageName);
    return resolutions ? new Map(JSON.parse(resolutions)) : null;
  }
}
