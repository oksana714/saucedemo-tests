import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';


describe('Saucedemo Website Tests', () => {
    beforeEach(async () => {
        await loginPage.open();
       // await browser.waitUntil(
            //async () => (await browser.getUrl()).includes('saucedemo.com'),
            //{ timeout: 15000, interval: 500 }
        //);
        await loginPage.inputUsername.waitForDisplayed({ timeout: 10000 });
        await loginPage.inputPassword.waitForDisplayed({ timeout: 10000 });
        await loginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 10000 }
        );
    });


    it('TC - [001] should login with valid credentials, hide password, and redirect to inventory page', async () => {
       
        async () => {
        expect(await loginPage.isPasswordHidden()).toBe(true);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 5000 }
        );
         expect(await inventoryPage.isDisplayed()).toBe(true);
}});


it('TC - [004] should expand menu with 4 items and logout to login page with empty fields', async () => {
     
    
        expect(await inventoryPage.isDisplayed()).toBe(true);
        await inventoryPage.clickBurgerButton();
        expect(await inventoryPage.getMenuItemsCount()).toEqual(4);


    
        await inventoryPage.clickLogoutButton();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/');
        expect(await loginPage.isUsernameFieldEmpty()).toBe(true);
        expect(await loginPage.isPasswordFieldEmpty()).toBe(true);
    });


it('TC - [005] should add product to cart, logout, login again, and verify product in cart', async () => {
    
    expect(await inventoryPage.isDisplayed()).toBe(true);
        
        const productName = await $('.inventory_item:first-child .inventory_item_name').getText();
        await inventoryPage.clickAddToCartByIndex(1);
        expect(await inventoryPage.getCartBadgeCount()).toEqual(1);
    
        await inventoryPage.clickBurgerButton();
        expect(await inventoryPage.getMenuItemsCount()).toEqual(4);

    
        
        await inventoryPage.clickLogoutButton();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/');
        expect(await loginPage.isUsernameFieldEmpty()).toBe(true);
        expect(await loginPage.isPasswordFieldEmpty()).toBe(true);

    
       await loginPage.login('standard_user', 'secret_sauce');
        
        await browser.waitUntil(
        async () => (await browser.getUrl()).includes('inventory.html'),
        { timeout: 10000 }
    );
    expect(await inventoryPage.isDisplayed()).toBe(true);

    
        await inventoryPage.clickCartButton();
        expect(await cartPage.isDisplayed()).toBe(true);
    expect(await cartPage.getCartItemName()).toEqual(productName);
    });
    
it('TC - [006] should verify all sorting options for products', async () => {
    
        expect(await inventoryPage.isDisplayed()).toBe(true);

    
        await inventoryPage.selectSortOption('az');
        let productNames = await inventoryPage.getProductNames();
        expect(productNames).toEqual([...productNames].sort());

    
        await inventoryPage.selectSortOption('za');
        productNames = await inventoryPage.getProductNames();
        expect(productNames).toEqual([...productNames].sort().reverse());

    
        await inventoryPage.selectSortOption('lohi');
        let productPrices = await inventoryPage.getProductPrices();
        expect(productPrices).toEqual([...productPrices].sort((a, b) => a - b));

   
        await inventoryPage.selectSortOption('hilo');
        productPrices = await inventoryPage.getProductPrices();
        expect(productPrices).toEqual([...productPrices].sort((a, b) => b - a));
    });

    it('TC - [007] should open social media links in new tabs from the inventory page', async () => {
        
    
        expect(await inventoryPage.isDisplayed()).toBe(true);

    
        const originalWindow = await browser.getWindowHandle();
        await inventoryPage.clickTwitterLink();
        const allWindowsTwitter = await browser.getWindowHandles();
        const newWindowTwitter = allWindowsTwitter.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindowTwitter);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('x.com'),
            { timeout: 5000 }
        );
        expect(await browser.getUrl()).toContain('x.com');
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);

   
        await inventoryPage.clickFacebookLink();
        const allWindowsFacebook = await browser.getWindowHandles();
        const newWindowFacebook = allWindowsFacebook.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindowFacebook);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('facebook.com'),
            { timeout: 5000 }
        );
        expect(await browser.getUrl()).toContain('facebook.com');
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);

    
        await inventoryPage.clickLinkedInLink();
        const allWindowsLinkedIn = await browser.getWindowHandles();
        const newWindowLinkedIn = allWindowsLinkedIn.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindowLinkedIn);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('linkedin.com'),
            { timeout: 5000 }
        );
        expect(await browser.getUrl()).toContain('linkedin.com');
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);

    
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html');
    });

    it('TC - [008] should complete checkout process', async () => {
    
        
    expect(await inventoryPage.isDisplayed()).toBe(true);
  
        const secondProductName = await $('.inventory_item:nth-child(2) .inventory_item_name').getText();
        const secondProductPrice = parseFloat((await $('.inventory_item:nth-child(2) .inventory_item_price').getText()).replace('$', ''));
        await inventoryPage.clickAddToCartByIndex(2);
        expect(await inventoryPage.getCartBadgeCount()).toEqual(2);
        await inventoryPage.clickCartButton();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 10000 }
        );
        expect(await cartPage.isDisplayed()).toBe(true);
        expect((await cartPage.getCartItemNames())).toContain(secondProductName);
        await cartPage.clickCheckoutButton();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-one.html'),
            { timeout: 10000 }
        );
        const firstName = 'Oksana';
        const lastName = 'Mir';
        const postalCode = '12345';
        await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
        expect(await checkoutPage.firstNameInput.getValue()).toEqual(firstName);
        expect(await checkoutPage.lastNameInput.getValue()).toEqual(lastName);
        expect(await checkoutPage.postalCodeInput.getValue()).toEqual(postalCode);
        await checkoutPage.clickContinue();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-two.html'),
            { timeout: 10000 }
        );
        expect((await checkoutPage.getItemPrices())).toContain(secondProductPrice);
        const totalItemPrice = (await checkoutPage.getItemPrices()).reduce((sum, price) => sum + price, 0);
        const taxAmount = await checkoutPage.getTaxAmount();
        expect(await checkoutPage.getTotalPrice()).toEqual(totalItemPrice + taxAmount);
        await checkoutPage.clickFinish();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-complete.html'),
            { timeout: 10000 }
        );
        expect(await checkoutPage.getCompleteMessage()).toEqual('Thank you for your order!');
        await checkoutPage.clickBackHome();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 10000, interval: 500 }
        );
        expect(await inventoryPage.isDisplayed()).toBe(true);
        expect(await inventoryPage.getCartBadgeCount()).toEqual(0);
    });

    it('TC - [009] should navigate to cart with empty cart and check error', async () => {
    expect(await inventoryPage.isDisplayed()).toBe(true);
        await inventoryPage.clickCartButton();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 10000, interval: 500 }
        );
        expect(await cartPage.isDisplayed()).toBe(true);
        expect(await cartPage.getCartItemCount()).toEqual(0);
        await cartPage.clickCheckoutButton();
        expect(await cartPage.isDisplayed()).toBe(true);
        expect(await cartPage.getErrorMessageText()).toEqual('Cart is empty');
        
   
    });
       
});

