export default class AuthController {
  constructor(authView, authModel) {
    this.view = authView;
    this.model = authModel;

    document
      .getElementById('register-btn')
      ?.addEventListener('click', this.handleRegister.bind(this));
    document
      .getElementById('login-btn')
      ?.addEventListener('click', this.handleLogin.bind(this));
  }

  async handleRegister(event) {
    try {
      event.preventDefault();
      const data = this.view.getRegisterData();
      const values = Object.values(data);
      if (values.length !== 6) {
        throw new Error('Fill up all the inputs');
      }
      values.map((value) => {
        if (!value) {
          throw new Error('Fill up all the inputs with valid data');
        }
      });
      const response = await this.model.register(data);
      if (response.status === 201) {
        document.location.href = '/auth/sign_in';
      } else {
        throw new Error('User wasnt registered');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async handleLogin(event) {
    try {
      event.preventDefault();
      const data = this.view.getLoginData();
      const values = Object.values(data);
      if (values.length !== 2) {
        throw new Error('Fill up all the inputs');
      }
      values.map((value) => {
        if (!value) {
          throw new Error('Fill up all the inputs with valid data');
        }
      });
      const response = await this.model.login(data);
      if (response.status === 200) {
        document.location.href = '/cabinet';
      } else {
        throw new Error('Cannot login');
      }
    } catch (err) {
      console.log(err);
    }
  }
}
