export default class ResolutionModel {
  getByName(name) {
    return axios
      .get(`http://localhost:8080/api/v1/patients/${name}/resolutions`)
      .then((res) => [res.data.resolution, res.status])
      .catch((error) => {
        return [undefined, error.response.status];
      });
  }

  fetchResolution() {
    const config = {
      method: 'GET',
      url: `http://localhost:8080/api/v1/patients/resolution`,
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }

  setByName(name, resolution, ttl) {
    const config = {
      method: 'PUT',
      url: `http://localhost:8080/api/v1/patients/${name}/resolution`,
      data: { resolution, ttl },
    };
    return axios(config).then((res) => res.data);
  }

  delete(name) {
    return axios.delete(
      `http://localhost:8080/api/v1/patients/${name}/resolutions`,
    );
  }
}
