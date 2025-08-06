import loginPage from '../pageobjects/login.page.js';

describe('Saucedemo Authentication Tests', () => {
    beforeEach(async () => {
        await loginPage.open();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('saucedemo.com'),
            { timeout: 15000 }
        );
    });
    it('TC - [002] should show error with invalid password, highlight login and password fields, display error icons, and hide password', async () => {
        
        await loginPage.login('standard_user', 'wrong_password');
        expect(await loginPage.isPasswordHidden()).toBe(true);
        expect(await loginPage.getErrorMessageText()).toEqual('Epic sadface: Username and password do not match any user in this service');
        expect(await loginPage.isUsernameFieldHighlighted()).toBe(true);
        expect(await loginPage.isPasswordFieldHighlighted()).toBe(true);
        expect(await loginPage.isUsernameErrorIconDisplayed()).toBe(true);
        expect(await loginPage.isPasswordErrorIconDisplayed()).toBe(true);
    });

    
    it('TC - [003] should show error with invalid username, highlight login and password fields, display error icons, and hide password', async () => {
        
        await loginPage.login('standarD_user', 'secret_sauce');
        expect(await loginPage.isPasswordHidden()).toBe(true);
        expect(await loginPage.getErrorMessageText()).toEqual('Epic sadface: Username and password do not match any user in this service');
        expect(await loginPage.isUsernameFieldHighlighted()).toBe(true);
        expect(await loginPage.isPasswordFieldHighlighted()).toBe(true);
        expect(await loginPage.isUsernameErrorIconDisplayed()).toBe(true);
        expect(await loginPage.isPasswordErrorIconDisplayed()).toBe(true);
    });
    
});