import { $ } from '@wdio/globals'
import Page from './page.js';


class LoginPage extends Page {
   
    get inputUsername () {
        return $('#user-name');
    }

    get inputPassword () {
        return $('#password');
    }

    get btnSubmit () {
        return $('#login-button');
        
    }
    get errorMessage () {
        return $(' .error-message-container');
    }

    get usernameErrorIcon () {
        return $('#user-name + .error_icon');
    }

    get passwordErrorIcon () {
        return $('#password + .error_icon');
    }

    
    async login (username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    
    async open () {
        return await super.open ('');
    }

    async getErrorMessageText () {
        return await this.errorMessage.getText();
    }

    async isUsernameFieldHighlighted () {
        const classAttribute = await this.inputUsername.getAttribute('class');
        return classAttribute.includes('input_error');
    }

    async isPasswordFieldHighlighted () {
        const classAttribute = await this.inputPassword.getAttribute('class');
        return classAttribute.includes('input_error');
    }

    async isUsernameErrorIconDisplayed () {
        return await this.usernameErrorIcon.isDisplayed();
    }

    async isPasswordErrorIconDisplayed () {
        return await this.passwordErrorIcon.isDisplayed();
    }
    async isPasswordHidden () {
        return await this.inputPassword.getAttribute('type') === 'password';
    }
    async isUsernameFieldEmpty () {
        return (await this.inputUsername.getValue()) === '';
    }
    async isPasswordFieldEmpty () {
        return (await this.inputPassword.getValue()) === '';
    }
}
export default new LoginPage();
