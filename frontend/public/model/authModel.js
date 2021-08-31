export default class AuthModel {
  async register(data) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/register',
      data: data,
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }
  async login(data) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/login',
      data: data,
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }
}
