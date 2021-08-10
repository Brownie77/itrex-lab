export default class ResolutionModel {
  getByName(name) {
    return axios
      .get(`http://localhost:8080/resolutions/${name}`)
      .then((res) => [res.data.resolution, res.status])
      .catch((error) => {
        return [undefined, error.response.status];
      });
  }

  setByName(name, resolution, ttl) {
    const config = {
      method: 'PUT',
      url: `http://localhost:8080/resolutions/${name}`,
      data: { resolution, ttl },
    };
    return axios(config);
  }

  delete(name) {
    return axios.delete(`http://localhost:8080/resolutions/${name}`);
  }
}
