export default class AuthModel {
  async register(data) {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/registration',
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

  async logout() {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/logout',
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }

  async authenticate() {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/authenticate',
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }

  async notAuthenticated() {
    const config = {
      method: 'POST',
      url: 'http://localhost:8080/api/v1/auth/not-authenticated',
      withCredentials: true,
    };
    return axios(config).then((res) => res);
  }
}
