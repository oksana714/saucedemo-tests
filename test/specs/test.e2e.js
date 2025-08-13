import { faker } from '@faker-js/faker';
import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import checkoutPage from '../pageobjects/checkout.page.js';

describe('Saucedemo Website Tests', () => {
  beforeEach(async () => {
    await loginPage.open();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('saucedemo.com'), {
      timeout: 5000,
    });
    await loginPage.inputUsername.waitForDisplayed({ timeout: 5000 });
    await loginPage.inputPassword.waitForDisplayed({ timeout: 5000 });
    await loginPage.login('standard_user', 'secret_sauce');
    await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), {
      timeout: 5000,
    });
  });

  it('TC - [001] should login with valid credentials, hide password, and redirect to inventory page', async () => {
    async () => {
      expect(await loginPage.inputPassword.getAttribute('type')).toEqual('password');
      expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
      expect(await inventoryPage.shoppingCartLink.isDisplayed()).toBe(true);
    };
  });

  it('TC - [004] should expand menu with 4 items and logout to login page with empty fields', async () => {
    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
    await inventoryPage.clickBurgerButton();
    expect((await inventoryPage.menuItems).length).toEqual(4);
    await inventoryPage.clickLogoutButton();
    expect(await browser.getUrl()).toContain('saucedemo.com');
    expect(await loginPage.inputUsername.getValue()).toEqual('');
    expect(await loginPage.inputPassword.getValue()).toEqual('');
  });

  it('TC - [005] should add product to cart, logout, login again, and verify product in cart', async () => {
    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
    const productName = await inventoryPage.firstProductName.getText();
    await inventoryPage.clickAddToCartByIndex(1);
    const badge = await inventoryPage.cartBadge;
    expect(await badge.isExisting()).toBe(true);
    expect(await badge.getText()).toEqual('1');
    await inventoryPage.clickBurgerButton();
    expect((await inventoryPage.menuItems).length).toEqual(4);
    await inventoryPage.clickLogoutButton();
    expect(await browser.getUrl()).toContain('saucedemo.com');
    expect(await loginPage.inputUsername.getValue()).toEqual('');
    expect(await loginPage.inputPassword.getValue()).toEqual('');

    await loginPage.login('standard_user', 'secret_sauce');

    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);

    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
    await inventoryPage.clickCartButton();
    expect(await cartPage.cartList.isDisplayed()).toBe(true);
    const item = await cartPage.cartItemName[0];
    expect(await item.getText()).toEqual(productName);
  });

  it('TC - [006] should verify all sorting options for products', async () => {
    await inventoryPage.inventoryList.waitForDisplayed({ timeout: 10000 });
    await inventoryPage.selectSortOption('az');
    let productNamesElements = await inventoryPage.inventoryItemNames;
    expect(productNamesElements.length).toBeGreaterThan(0, 'No product names found for az sort');
    let productNames = [];
    for (const element of productNamesElements) {
      productNames.push(await element.getText());
    }
    expect(productNames).toEqual([...productNames].sort(), 'Product names not sorted A-Z');
    await inventoryPage.selectSortOption('za');
    productNamesElements = await inventoryPage.inventoryItemNames;
    expect(productNamesElements.length).toBeGreaterThan(0, 'No product names found for za sort');
    productNames = [];
    for (const element of productNamesElements) {
      productNames.push(await element.getText());
    }
    expect(productNames).toEqual(
      [...productNames].sort().reverse(),
      'Product names not sorted Z-A'
    );
    await inventoryPage.selectSortOption('lohi');
    let productPricesElements = await inventoryPage.inventoryItemPrices;
    expect(productPricesElements.length).toBeGreaterThan(
      0,
      'No product prices found for lohi sort'
    );
    let productPrices = [];
    for (const element of productPricesElements) {
      const text = await element.getText();
      productPrices.push(parseFloat(text.replace('$', '')));
    }
    expect(productPrices).toEqual(
      [...productPrices].sort((a, b) => a - b),
      'Product prices not sorted low to high'
    );
    await inventoryPage.selectSortOption('hilo');
    productPricesElements = await inventoryPage.inventoryItemPrices;
    expect(productPricesElements.length).toBeGreaterThan(
      0,
      'No product prices found for hilo sort'
    );
    productPrices = [];
    for (const element of productPricesElements) {
      const text = await element.getText();
      productPrices.push(parseFloat(text.replace('$', '')));
    }
    expect(productPrices).toEqual(
      [...productPrices].sort((a, b) => b - a),
      'Product prices not sorted high to low'
    );
  });

  it('TC - [007] should open social media links in new tabs from the inventory page', async () => {
    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);

    const originalWindow = await browser.getWindowHandle();
    await inventoryPage.clickTwitterLink();
    const allWindowsTwitter = await browser.getWindowHandles();
    const newWindowTwitter = allWindowsTwitter.find((handle) => handle !== originalWindow);
    await browser.switchToWindow(newWindowTwitter);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('x.com'), {
      timeout: 5000,
    });
    expect(await browser.getUrl()).toContain('x.com');
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);

    await inventoryPage.clickFacebookLink();
    const allWindowsFacebook = await browser.getWindowHandles();
    const newWindowFacebook = allWindowsFacebook.find((handle) => handle !== originalWindow);
    await browser.switchToWindow(newWindowFacebook);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('facebook.com'), {
      timeout: 5000,
    });
    expect(await browser.getUrl()).toContain('facebook.com');
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);

    await inventoryPage.clickLinkedInLink();
    const allWindowsLinkedIn = await browser.getWindowHandles();
    const newWindowLinkedIn = allWindowsLinkedIn.find((handle) => handle !== originalWindow);
    await browser.switchToWindow(newWindowLinkedIn);
    await browser.waitUntil(async () => (await browser.getUrl()).includes('linkedin.com'), {
      timeout: 5000,
    });
    expect(await browser.getUrl()).toContain('linkedin.com');
    await browser.closeWindow();
    await browser.switchToWindow(originalWindow);

    expect(await browser.getUrl()).toContain('https://www.saucedemo.com/inventory.html');
  });

  it('TC - [008] should complete checkout process', async () => {
    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
    const secondProductName = await inventoryPage.secondProductName.getText();
    const secondProductPrice = parseFloat(
      (await inventoryPage.secondProductPrice.getText()).replace('$', '')
    );
    await inventoryPage.clickAddToCartByIndex(2);
    await inventoryPage.cartBadge.waitForDisplayed({ timeout: 10000 });
    const badge = await inventoryPage.cartBadge;
    expect(await badge.isExisting()).toBe(true);
    expect(await badge.getText()).toEqual('2');
    await inventoryPage.clickCartButton();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('cart.html'), {
      timeout: 5000,
    });
    expect(await cartPage.cartList.isDisplayed()).toBe(true);
    const cartItems = await cartPage.cartItemName;
    expect(cartItems.length).toBeGreaterThan(0, 'No items found in cart');
    let cartItemNames = [];
    for (const item of cartItems) {
      cartItemNames.push(await item.getText());
    }
    expect(cartItemNames).toContain(secondProductName);
    const prices = await cartPage.cartItemPrice;
    expect(prices.length).toBeGreaterThan(0, 'No prices found in cart');
    let priceValues = [];
    for (const price of prices) {
      const text = await price.getText();
      priceValues.push(parseFloat(text.replace('$', '')));
    }
    expect(priceValues).toContain(secondProductPrice);
    await cartPage.clickCheckoutButton();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('checkout-step-one.html'),
      { timeout: 10000, interval: 500 }
    );
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postalCode = faker.location.zipCode();
    await checkoutPage.fillCheckoutForm(firstName, lastName, postalCode);
    expect(await checkoutPage.firstNameInput.getValue()).toEqual(firstName);
    expect(await checkoutPage.lastNameInput.getValue()).toEqual(lastName);
    expect(await checkoutPage.postalCodeInput.getValue()).toEqual(postalCode);
    await checkoutPage.clickContinue();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('checkout-step-two.html'),
      { timeout: 5000 }
    );
    await checkoutPage.taxLabel.waitForDisplayed({ timeout: 10000 });
    const taxElement = await checkoutPage.taxLabel;
    const taxText = await taxElement.getText();
    const taxAmount = parseFloat(taxText.replace('Tax: $', ''));
    const totalElement = await checkoutPage.totalLabel;
    const totalText = await totalElement.getText();
    const totalPrice = parseFloat(totalText.replace('Total: $', ''));
    expect(totalPrice).toEqual(
      parseFloat((priceValues.reduce((sum, price) => sum + price, 0) + taxAmount).toFixed(2))
    );
    await checkoutPage.clickFinish();
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('checkout-complete.html'),
      { timeout: 10000 }
    );
    await checkoutPage.completeHeader.waitForDisplayed({ timeout: 5000 });
    expect(await checkoutPage.completeHeader.getText()).toEqual('Thank you for your order!');
    await checkoutPage.clickBackHome();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('inventory.html'), {
      timeout: 10000,
    });
    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
    expect(await inventoryPage.cartBadge.isExisting()).toBe(false);
  });

  it('TC - [009] should navigate to cart with empty cart and check error', async () => {
    expect(await inventoryPage.inventoryList.isDisplayed()).toBe(true);
    await inventoryPage.clickCartButton();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('cart.html'), {
      timeout: 5000,
    });
    expect(await cartPage.cartList.isDisplayed()).toBe(true);
    const items = await cartPage.cartItem;
    expect(items.length).toEqual(0);
    await cartPage.clickCheckoutButton();
    const errorText = await $(errorSelector).getText();
    expect(errorText).toEqual('Cart is empty');
  });
});
