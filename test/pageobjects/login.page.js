import Page from './page.js';

class LoginPage extends Page {
  get inputUsername() {
    return $('#user-name');
  }

  get inputPassword() {
    return $('#password');
  }

  get btnSubmit() {
    return $('#login-button');
  }
  get errorMessage() {
    return $(' .error-message-container');
  }

  get usernameErrorIcon() {
    return $('#user-name + .error_icon');
  }

  get passwordErrorIcon() {
    return $('#password + .error_icon');
  }

  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async open() {
    return await super.open('');
  }
  async getErrorText(msg) {
    await expect(this.errorMessage).toHaveText(msg);
  }
}
export default new LoginPage();
