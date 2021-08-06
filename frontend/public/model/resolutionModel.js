export default class ResolutionModel {
  constructor() {
    this.storageName = 'resolutions';
    this.resolutionMap = new Map();
  }

  getByName(name) {
    return axios
      .get(`http://localhost:8080/resolution/get/${name}`)
      .then((res) => res.data.resolution);
  }

  add(name) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/resolution/add',
      data: { name, resolution: null },
    };
    return axios(config);
  }

  setByName(name, resolution, ttl) {
    const config = {
      method: 'PUT',
      url: 'http://localhost:8080/resolution/set',
      data: { name, resolution, ttl },
    };
    return axios(config);
  }

  delete(name) {
    const config = {
      method: 'DELETE',
      url: 'http://localhost:8080/resolution/delete',
      data: { name, resolution: null },
    };
    return axios(config);
  }
}
