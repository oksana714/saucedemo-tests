import loginPage from '../pageobjects/login.page.js';

describe('Saucedemo Authentication Tests', () => {
  beforeEach(async () => {
    await loginPage.open();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('saucedemo.com'), {
      timeout: 15000,
    });
  });
  it('TC - [002] should show error with invalid password, highlight login and password fields, display error icons, and hide password', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    expect(await loginPage.inputPassword.getAttribute('type')).toEqual('password');
    expect(await loginPage.errorMessage.getText()).toEqual(
      'Epic sadface: Username and password do not match any user in this service'
    );
    expect(await loginPage.inputUsername.getAttribute('class')).toContain('input_error');
    expect(await loginPage.inputPassword.getAttribute('class')).toContain('input_error');
    expect(await loginPage.usernameErrorIcon.isDisplayed()).toBe(true);
    expect(await loginPage.passwordErrorIcon.isDisplayed()).toBe(true);
  });

  it('TC - [003] should show error with invalid username, highlight login and password fields, display error icons, and hide password', async () => {
    await loginPage.login('standarD_user', 'secret_sauce');
    await loginPage.getErrorText('Epic sadface: Username and password do not match any user in this service');
    expect(await loginPage.inputUsername.getAttribute('class')).toContain('input_error');
    expect(await loginPage.inputPassword.getAttribute('class')).toContain('input_error');
    expect(await loginPage.usernameErrorIcon.isDisplayed()).toBe(true);
    expect(await loginPage.passwordErrorIcon.isDisplayed()).toBe(true);
  });
});
