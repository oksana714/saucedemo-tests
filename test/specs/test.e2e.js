import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';


describe('Saucedemo Website Tests', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('saucedemo.com'),
            { timeout: 10000 }
        );
        //await loginPage.inputUsername.waitForDisplayed({ timeout: 5000 });
    });

    it('TC - [001] should login with valid credentials, hide password, and redirect to inventory page', async () => {
       // await loginPage.inputUsername.setValue('standard_user');
        //await loginPage.inputPassword.setValue('secret_sauce');
        async () => {
        expect(await loginPage.isPasswordHidden()).toBe(true);
        //await loginPage.login('standard_user', 'secret_sauce');
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 5000 }
        );
        const isInventoryDisplayed = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);
}});


it('TC - [002] should show error with invalid password, highlight login and password fields, display error icons, and hide password', async () => {
        await loginPage.login('standard_user', 'wrong_password');
        expect(await loginPage.isPasswordHidden()).toBe(true);
        await loginPage.btnSubmit.click();
        const errorText = await loginPage.getErrorMessageText();
        expect(errorText).toEqual('Epic sadface: Username and password do not match any user in this service');
        expect(await loginPage.isUsernameFieldHighlighted()).toBe(true);
        expect(await loginPage.isPasswordFieldHighlighted()).toBe(true);
        expect(await loginPage.isUsernameErrorIconDisplayed()).toBe(true);
        expect(await loginPage.isPasswordErrorIconDisplayed()).toBe(true);
});

it.only('TC - [003] should show error with invalid username, highlight login and password fields, display error icons, and hide password', async () => {
        await loginPage.login('standarD_user', 'secret_sauce');
        expect(await loginPage.isPasswordHidden()).toBe(true);
        await loginPage.btnSubmit.click();
        const errorText = await loginPage.getErrorMessageText();
        expect(errorText).toEqual('Epic sadface: Username and password do not match any user in this service');
        expect(await loginPage.isUsernameFieldHighlighted()).toBe(true);
        expect(await loginPage.isPasswordFieldHighlighted()).toBe(true);
        expect(await loginPage.isUsernameErrorIconDisplayed()).toBe(true);
        expect(await loginPage.isPasswordErrorIconDisplayed()).toBe(true);
    });


it('TC - [004] should expand menu with 4 items and logout to login page with empty fields', async () => {
     
       //await loginPage.inputUsername.setValue('standard_user');
       // await loginPage.inputPassword.setValue('secret_sauce');
        //await loginPage.btnSubmit.click();
        const isInventoryDisplayed = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);
         await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 10000 }
        );
        await inventoryPage.clickBurgerButton();
        const menuItemsCount = await inventoryPage.getMenuItemsCount();
        expect(menuItemsCount).toEqual(4);


    
        await inventoryPage.clickLogoutButton();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/');
        expect(await loginPage.isUsernameFieldEmpty()).toBe(true);
        expect(await loginPage.isPasswordFieldEmpty()).toBe(true);
    });


it('TC - [005] should add product to cart, logout, login again, and verify product in cart', async () => {
    
       // await loginPage.inputUsername.setValue('standard_user');

        //await loginPage.inputPassword.setValue('secret_sauce');
        
        //await loginPage.btnSubmit.click();
       //  await browser.waitUntil(
        //    async () => (await browser.getUrl()).includes('inventory.html'),
        //    { timeout: 10000 }
       // );
        
        const isInventoryDisplayed = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);
        

    
        const productName = await $('.inventory_item:first-child .inventory_item_name').getText();
        await inventoryPage.clickAddToCartByIndex(1);
        const cartCount = await inventoryPage.getCartBadgeCount();
        expect(cartCount).toEqual(1);

    
        await inventoryPage.clickBurgerButton();
        const menuItemsCount = await inventoryPage.getMenuItemsCount();
        expect(menuItemsCount).toEqual(4);

    
        
        await inventoryPage.clickLogoutButton();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/');
        expect(await loginPage.isUsernameFieldEmpty()).toBe(true);
        expect(await loginPage.isPasswordFieldEmpty()).toBe(true);

    
        await loginPage.inputUsername.setValue('standard_user');
       
        await loginPage.inputPassword.setValue('secret_sauce');
        
        await loginPage.btnSubmit.click();
          await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 10000 }
        );
        
        const isInventoryDisplayedAgain = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayedAgain).toBe(true);

    
        await inventoryPage.clickCartButton();
        const isCartDisplayed = await cartPage.isDisplayed();
        expect(isCartDisplayed).toBe(true);
        const cartItemName = await cartPage.getCartItemName();
        expect(cartItemName).toEqual(productName);
    });
    
it('TC - [006] should verify all sorting options for products', async () => {
    
        await loginPage.inputUsername.setValue('standard_user');
        
        await loginPage.inputPassword.setValue('secret_sauce');
      
        await loginPage.btnSubmit.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 10000 }
        );
        
        const isInventoryDisplayed = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    
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
        await loginPage.inputUsername.setValue('standard_user');
       
        await loginPage.inputPassword.setValue('secret_sauce');
       
        await loginPage.btnSubmit.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 10000 }
        );
        
        const isInventoryDisplayed = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    
        const originalWindow = await browser.getWindowHandle();
        await inventoryPage.clickTwitterLink();
        const allWindowsTwitter = await browser.getWindowHandles();
        const newWindowTwitter = allWindowsTwitter.find(handle => handle !== originalWindow);
        await browser.switchToWindow(newWindowTwitter);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('x.com'),
            { timeout: 5000, timeoutMsg: 'Expected Twitter page to load within 5 seconds' }
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
            { timeout: 5000, timeoutMsg: 'Expected Facebook page to load within 5 seconds' }
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
            { timeout: 5000, timeoutMsg: 'Expected LinkedIn page to load within 5 seconds' }
        );
        expect(await browser.getUrl()).toContain('linkedin.com');
        await browser.closeWindow();
        await browser.switchToWindow(originalWindow);

    
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html');
    });

    it('TC - [008] should complete checkout process', async () => {
    
        await loginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await loginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await loginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await inventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    

        const secondProductName = await $('.inventory_item:nth-child(2) .inventory_item_name').getText();
        
        const secondPriceElement = await $('.inventory_item:nth-child(2) .inventory_item_price');
        await secondPriceElement.waitForDisplayed({ timeout: 5000 });
        
        const secondPriceText = await secondPriceElement.getText();
       
      
        const secondProductPrice = parseFloat(secondPriceText.replace('$', '')); 
        
        const secondButton = await $('.inventory_item:nth-child(2) .btn_inventory');
        await inventoryPage.clickAddToCartByIndex(2);
        const cartCount = await inventoryPage.getCartBadgeCount();
        
        expect(cartCount).toEqual(2);

    
        await inventoryPage.clickCartButton();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 5000 }
        );
        expect(await cartPage.isDisplayed()).toBe(true);

    
        const firstProductName = await cartPage.getCartItemName(); 
        

        const cartItemNames = await cartPage.getCartItemNames();
        
        expect(cartItemNames).toContain(firstProductName);
        expect(cartItemNames).toContain(secondProductName);

    
        await cartPage.clickCheckoutButton();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-one.html'),
            { timeout: 5000 }
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
            { timeout: 5000 }
        );
        const overviewItemPrices = await checkoutPage.getItemPrices();
         
        expect(overviewItemPrices).toContain(secondProductPrice);
        const totalItemPrice = overviewItemPrices.reduce((sum, price) => sum + price, 0);
        const taxAmount = await checkoutPage.getTaxAmount();
        const expectedTotalPrice = totalItemPrice + taxAmount;
        const totalPrice = await checkoutPage.getTotalPrice();
        
        expect(totalPrice).toEqual(expectedTotalPrice);

        
        const finishButton = await checkoutPage.finishButton;
        
        await checkoutPage.clickFinish();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-complete.html'),
            { timeout: 10000 }
        );
        const completeMessage = await checkoutPage.getCompleteMessage();
        expect(completeMessage).toEqual('Thank you for your order!');

    
        await checkoutPage.clickBackHome();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 5000 }
        );
        await inventoryPage.isDisplayed(); 
        const finalCartCount = await inventoryPage.getCartBadgeCount();
        
        expect(finalCartCount).toEqual(0);
    });

    it('TC - [009] should navigate to cart with empty cart and check error', async () => {
   
        await loginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await loginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await loginPage.btnSubmit.click();
        await browser.pause(1000);
        expect(await  inventoryPage.isDisplayed()).toBe(true);
        
        await inventoryPage.clickCartButton();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 5000 }
        );
        expect(await cartPage.isDisplayed()).toBe(true);

        const cartItemCount = await cartPage.getCartItemCount();
        expect(cartItemCount).toEqual(0);
        

        await cartPage.clickCheckoutButton();
        expect(await cartPage.isDisplayed()).toBe(true);
        
        const errorText = await cartPage.getErrorMessageText();
        expect(errorText).toEqual('Cart is empty');
        
    
       
   
    });
       
});

