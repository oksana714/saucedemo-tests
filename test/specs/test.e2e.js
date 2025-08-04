import { expect, browser } from '@wdio/globals';
import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import CheckoutPage from '../pageobjects/checkout.page.js';


describe('Saucedemo Website Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('saucedemo.com'),
            { timeout: 5000, timeoutMsg: 'Expected login page to load within 5 seconds' }
        );
        await LoginPage.inputUsername.waitForDisplayed({ timeout: 5000 });
    });

    it('TC - [001] should login with valid credentials, hide password, and redirect to inventory page', async () => {
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(2000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(2000);
        expect(await LoginPage.isPasswordHidden()).toBe(true);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);
    });


it('TC - [002] should show error with invalid password, highlight login and password fields, display error icons, and hide password', async () => {
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(2000);
        await LoginPage.inputPassword.setValue('wrong_password');
        await browser.pause(2000);
        expect(await LoginPage.isPasswordHidden()).toBe(true);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const errorText = await LoginPage.getErrorMessageText();
        expect(errorText).toEqual('Epic sadface: Username and password do not match any user in this service');
        expect(await LoginPage.isUsernameFieldHighlighted()).toBe(true);
        expect(await LoginPage.isPasswordFieldHighlighted()).toBe(true);
        expect(await LoginPage.isUsernameErrorIconDisplayed()).toBe(true);
        expect(await LoginPage.isPasswordErrorIconDisplayed()).toBe(true);
    });

it('TC - [003] should show error with invalid username, highlight login and password fields, display error icons, and hide password', async () => {
        await LoginPage.inputUsername.setValue('standarD_user');
        await browser.pause(2000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(2000);
        expect(await LoginPage.isPasswordHidden()).toBe(true);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const errorText = await LoginPage.getErrorMessageText();
        expect(errorText).toEqual('Epic sadface: Username and password do not match any user in this service');
        expect(await LoginPage.isUsernameFieldHighlighted()).toBe(true);
        expect(await LoginPage.isPasswordFieldHighlighted()).toBe(true);
        expect(await LoginPage.isUsernameErrorIconDisplayed()).toBe(true);
        expect(await LoginPage.isPasswordErrorIconDisplayed()).toBe(true);
    });


it('TC - [004] should expand menu with 4 items and logout to login page with empty fields', async () => {
     // Precondition: Login
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);
     
     // Step 1: Click Burger button 
        await InventoryPage.clickBurgerButton();
        const menuItemsCount = await InventoryPage.getMenuItemsCount();
        expect(menuItemsCount).toEqual(4);


    // Step 2: Click "Logout" button
        await InventoryPage.clickLogoutButton();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/');
        expect(await LoginPage.isUsernameFieldEmpty()).toBe(true);
        expect(await LoginPage.isPasswordFieldEmpty()).toBe(true);
    });


it('TC - [005] should add product to cart, logout, login again, and verify product in cart', async () => {
    // Precondition: Login
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    // Step 1: Add a product to the cart
        const productName = await $('.inventory_item:first-child .inventory_item_name').getText();
        await InventoryPage.clickAddToCartByIndex(1);
        const cartCount = await InventoryPage.getCartBadgeCount();
        expect(cartCount).toEqual(1);

    // Step 2: Click on the "Burger" button
        await InventoryPage.clickBurgerButton();
        const menuItemsCount = await InventoryPage.getMenuItemsCount();
        expect(menuItemsCount).toEqual(4);

    // Step 3: Click on the "Logout" button
        await browser.pause(2000);
        await InventoryPage.clickLogoutButton();
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/');
        expect(await LoginPage.isUsernameFieldEmpty()).toBe(true);
        expect(await LoginPage.isPasswordFieldEmpty()).toBe(true);

    // Step 4: Log in again
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayedAgain = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayedAgain).toBe(true);

     // Step 5: Go to the cart and verify the product
        await InventoryPage.clickCartButton();
        const isCartDisplayed = await CartPage.isDisplayed();
        expect(isCartDisplayed).toBe(true);
        const cartItemName = await CartPage.getCartItemName();
        expect(cartItemName).toEqual(productName);
    });
    
it('TC - [006] should verify all sorting options for products', async () => {
    // Precondition: Log in to the account
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    // Verify sorting by Name (A to Z)
        await InventoryPage.selectSortOption('az');
        let productNames = await InventoryPage.getProductNames();
        expect(productNames).toEqual([...productNames].sort());

    // Verify sorting by Name (Z to A)
        await InventoryPage.selectSortOption('za');
        productNames = await InventoryPage.getProductNames();
        expect(productNames).toEqual([...productNames].sort().reverse());

    // Verify sorting by Price (low to high)
        await InventoryPage.selectSortOption('lohi');
        let productPrices = await InventoryPage.getProductPrices();
        expect(productPrices).toEqual([...productPrices].sort((a, b) => a - b));

    // Verify sorting by Price (high to low)
        await InventoryPage.selectSortOption('hilo');
        productPrices = await InventoryPage.getProductPrices();
        expect(productPrices).toEqual([...productPrices].sort((a, b) => b - a));
    });

    it('TC - [007] should open social media links in new tabs from the inventory page', async () => {
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    // Click Twitter link and verify new tab
        const originalWindow = await browser.getWindowHandle();
        await InventoryPage.clickTwitterLink();
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

    // Click Facebook link and verify new tab
        await InventoryPage.clickFacebookLink();
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

    // Click LinkedIn link and verify new tab
        await InventoryPage.clickLinkedInLink();
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

    // Verify return to inventory page
        expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html');
    });

    it('TC - [008] should complete checkout process', async () => {
    //Precondition: Log in to the account
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        const isInventoryDisplayed = await InventoryPage.isDisplayed();
        expect(isInventoryDisplayed).toBe(true);

    // Add second product

        const secondProductName = await $('.inventory_item:nth-child(2) .inventory_item_name').getText();
        console.log('Second product name:', secondProductName); 
        const secondPriceElement = await $('.inventory_item:nth-child(2) .inventory_item_price');
        await secondPriceElement.waitForDisplayed({ timeout: 5000 });
        console.log('Second price displayed:', await secondPriceElement.isDisplayed()); 
        const secondPriceText = await secondPriceElement.getText();
        console.log('Second price text:', secondPriceText); 
      
        const secondProductPrice = parseFloat(secondPriceText.replace('$', '')); 
        console.log('Second product price:', secondProductPrice); 
        const secondButton = await $('.inventory_item:nth-child(2) .btn_inventory');
        await InventoryPage.clickAddToCartByIndex(2);
        await browser.pause(2000); 
        const cartCount = await InventoryPage.getCartBadgeCount();
        console.log('Cart count after adding second product:', cartCount); 
        expect(cartCount).toEqual(2);

    // Go to cart
        await InventoryPage.clickCartButton();
        await browser.pause(1000);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 5000, timeoutMsg: 'Expected cart page to load within 5 seconds' }
        );
        expect(await CartPage.isDisplayed()).toBe(true);

    // Verify cart items using CartPage
        const firstProductName = await CartPage.getCartItemName(); 
        console.log('First product in cart:', firstProductName); 

        const cartItemNames = await CartPage.getCartItemNames();
        console.log('Cart items from CartPage:', cartItemNames); 
        expect(cartItemNames).toContain(firstProductName);
        expect(cartItemNames).toContain(secondProductName);

    // Go to checkout
        await CartPage.clickCheckoutButton();
        await browser.pause(1000);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-one.html'),
            { timeout: 5000, timeoutMsg: 'Expected checkout page to load within 5 seconds' }
        );

    // Fill checkout form
        const firstName = 'Oksana';
        const lastName = 'Mir';
        const postalCode = '12345';
        await CheckoutPage.fillCheckoutForm(firstName, lastName, postalCode);
        await browser.pause(1000);
        expect(await CheckoutPage.firstNameInput.getValue()).toEqual(firstName);
        expect(await CheckoutPage.lastNameInput.getValue()).toEqual(lastName);
        expect(await CheckoutPage.postalCodeInput.getValue()).toEqual(postalCode);

    // Continue to overview
        await CheckoutPage.clickContinue();
        await browser.pause(1000);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-step-two.html'),
            { timeout: 5000, timeoutMsg: 'Expected overview page to load within 5 seconds' }
        );
        const overviewItemPrices = await CheckoutPage.getItemPrices();
        console.log('Overview prices:', overviewItemPrices); 
        expect(overviewItemPrices).toContain(secondProductPrice);
        const totalItemPrice = overviewItemPrices.reduce((sum, price) => sum + price, 0);
        const taxAmount = await CheckoutPage.getTaxAmount();
        const expectedTotalPrice = totalItemPrice + taxAmount;
        const totalPrice = await CheckoutPage.getTotalPrice();
        console.log('Total price:', totalPrice, 'Expected:', expectedTotalPrice); 
        expect(totalPrice).toEqual(expectedTotalPrice);

        // Finish checkout
        const finishButton = await CheckoutPage.finishButton;
        console.log('Finish button displayed:', await finishButton.isDisplayed()); 
        await CheckoutPage.clickFinish();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('checkout-complete.html'),
            { timeout: 10000, timeoutMsg: 'Expected checkout complete page to load within 10 seconds' }
        );
        const completeMessage = await CheckoutPage.getCompleteMessage();
        expect(completeMessage).toEqual('Thank you for your order!');

    // Back to inventory page
        await CheckoutPage.clickBackHome();
        await browser.pause(1000);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('inventory.html'),
            { timeout: 5000, timeoutMsg: 'Expected inventory page to load within 5 seconds' }
        );
        await InventoryPage.isDisplayed(); 
        const finalCartCount = await InventoryPage.getCartBadgeCount();
        console.log('Final cart count:', finalCartCount); 
        expect(finalCartCount).toEqual(0);
    });

    it('TC - [009] should navigate to cart with empty cart and check error', async () => {
   
        await LoginPage.inputUsername.setValue('standard_user');
        await browser.pause(1000);
        await LoginPage.inputPassword.setValue('secret_sauce');
        await browser.pause(1000);
        await LoginPage.btnSubmit.click();
        await browser.pause(1000);
        expect(await InventoryPage.isDisplayed()).toBe(true);
        
        await InventoryPage.clickCartButton();
        await browser.pause(1000);
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 5000, timeoutMsg: 'Expected cart page to load within 5 seconds' }
        );
        expect(await CartPage.isDisplayed()).toBe(true);

        const cartItemCount = await CartPage.getCartItemCount();
        expect(cartItemCount).toEqual(0);
        console.log('Cart item count verified:', cartItemCount);

        await CartPage.clickCheckoutButton();
        await browser.pause(1000);
        expect(await CartPage.isDisplayed()).toBe(true);
        console.log('Still on cart page:', await browser.getUrl());
        const errorText = await CartPage.getErrorMessageText();
        expect(errorText).toEqual('Cart is empty');
        console.log('Error message:', errorText);
    
       
   
    });
       
});

