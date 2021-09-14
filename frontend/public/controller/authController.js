export default class AuthController {
  constructor(authView, authModel) {
    this.view = authView;
    this.model = authModel;

    if (window.location.pathname === '/cabinet') {
      this.handleProtectedRouteAccess();
    }

    if (
      window.location.pathname === '/auth/sign-in' ||
      window.location.pathname === '/auth/sign-up' ||
      window.location.pathname === '/admin/sign-in'
    ) {
      this.handleAuthRoutes();
    }

    document
      .getElementById('register-btn')
      ?.addEventListener('click', this.handleRegister.bind(this));
    document
      .getElementById('login-btn')
      ?.addEventListener('click', this.handleLogin.bind(this));
    document
      .getElementById('login-btn-doctor')
      ?.addEventListener('click', this.handleLoginDoctor.bind(this));
    document
      .getElementById('logout-btn')
      ?.addEventListener('click', this.handleLogout.bind(this));
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
        document.location.href = '/auth/sign-in';
      } else {
        throw new Error('User wasnt registered');
      }
    } catch (err) {
      console.log(err.message);
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
        console.log(window.location.pathname);
        if(window.location.pathname ==='/auth/sign-in') {
          document.location.href = '/cabinet';
        } else {
          document.location.href = '/doctor';

        }
      } else {
        throw new Error('Cannot login');
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  async handleLoginDoctor(event) {
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
      const response = await this.model.loginDoctor(data);
      console.log(response);
      if (response.status === 200) {
        sessionStorage.setItem('doctorId', `${response.data.id}`);
        if(window.location.pathname ==='/auth/sign-in') {
          document.location.href = '/cabinet';
        } else {
          document.location.href = '/doctor';

        }
      } else {
        throw new Error('Cannot login');
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  async handleLogout() {
    try {
      await this.model.logout();
    } catch (err) {
      console.log(err.message);
    }
  }

  async handleProtectedRouteAccess() {
    try {
      const allowed = await this.model.authenticate();
      if (allowed.status !== 200) {
        window.location.href = 'http://localhost:3000/auth/sign-in';
      }
    } catch (err) {
      window.location.href = 'http://localhost:3000/auth/sign-in';
      console.log(err.message);
    }
  }

  async handleAuthRoutes() {
    try {
      const notAllowed = await this.model.notAuthenticated();
      if (notAllowed.data) {
        window.location.href = 'http://localhost:3000/cabinet';
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}
