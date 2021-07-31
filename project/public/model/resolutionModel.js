export default class ResolutionModel {
  constructor() {
    this.resolutionMap = this.#getResolutionMap() || new Map();
  }

  getResolutionByName(name) {
    return this.resolutionMap.get(name);
  }

  addToResolutionMap(person) {
    this.resolutionMap.set(person, null);
    this.#saveResolutionMap();
  }

  setResolution(person, resolution) {
    if (this.isIn(person)) {
      this.resolutionMap.set(person, resolution);
      this.#saveResolutionMap();
    }
  }

  isIn(name) {
    return this.resolutionMap.has(name);
  }

  deleteResolution(name) {
    if (this.isIn(name)) {
      this.resolutionMap.set(name, null);
      this.#saveResolutionMap();
    }
  }

  #saveResolutionMap() {
    localStorage.setItem('resolutions', JSON.stringify(Array.from(this.resolutionMap.entries())));
  }

  #getResolutionMap() {
    const resolutions = localStorage.getItem('resolutions');
    return resolutions ? new Map(JSON.parse(resolutions)) : null;
  }
}
