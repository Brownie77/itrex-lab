export default class AuthView {
  constructor() {
    this.email = document.getElementById('email') || null;
    this.password = document.getElementById('password') || null;
    this.confirmPassword = document.getElementById('confirm-password') || null;
    this.bdate = document.getElementById('birthdate') || null;
    this.name = document.getElementById('user-name') || null;
    this.gender = document.forms?.register?.gender || null;

    this.emailLogin = document.getElementById('login-email') || null;
    this.passwordLogin = document.getElementById('login-password') || null;
  }

  getRegisterData() {
    const data = {};

    data.email = this.email.value;
    data.password = this.password.value;
    data.confirmPassword = this.confirmPassword.value;
    data.birthdate = this.bdate.value;
    data.name = this.name.value;
    data.gender = this.gender.value;

    return data;
  }

  getLoginData() {
    const data = {};

    data.email = this.emailLogin.value;
    data.password = this.passwordLogin.value;

    return data;
  }
}
