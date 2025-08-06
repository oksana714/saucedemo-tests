import Page from './page.js';

class InventoryPage extends Page {
    get inventoryList () {
        return $('.inventory_list');
    }
    get shoppingCartLink () {
        return $('.shopping_cart_link');
    }
    get burgerButton () {
        return $('#react-burger-menu-btn');
    }
    get menuItems () {
        return $$('.bm-item.menu-item');
    }
    get logoutButton () {
        return $('#logout_sidebar_link');
    }
    get cartBadge () {
        return $('.shopping_cart_badge'); 
    }
    get sortDropdown () {
        return $('.product_sort_container')
    }
    get inventoryItems () {
        return $$('.inventory_item');
    }
    get inventoryItemNames () {
        return $$('.inventory_item_name');
    }
    get inventoryItemPrices () {
        return $$('.inventory_item_price');
    }
    get twitterLink () {
        return $('a[data-test="social-twitter"]');
    }
    get facebookLink () {
        return $('a[data-test="social-facebook"]');
    }
    get linkedinLink () {
        return $('a[data-test="social-linkedin"]');
    }

    async isDisplayed () {
        const isInventoryListDisplayed = await this.inventoryList.isDisplayed();
        const isShoppingCartDisplayed = await this.shoppingCartLink.isDisplayed();
        return isInventoryListDisplayed && isShoppingCartDisplayed;
    }
    
    async clickBurgerButton() {
        await this.burgerButton.click();
        await this.menuItems[0].waitForDisplayed({ timeout: 10000 });
    }
    
    async getMenuItemsCount () {
        return (await this.menuItems).length;
    }
    
    async clickLogoutButton () {
        await this.logoutButton.click();
    }
    async clickAddToCartByIndex(index = 1) {
        const selector = `.inventory_item:nth-child(${index}) .btn_inventory`;
        await $(selector).click();
        await this.cartBadge.waitForDisplayed({ timeout: 10000 });
    }
    
    async getCartBadgeCount() {
        const badge = await this.cartBadge;
        const isBadgeDisplayed = await badge.isExisting();
        if (!isBadgeDisplayed) {
        return 0;
    }
        const text = await badge.getText();
        return parseInt(text, 10) || 0;
    }

    async clickCartButton() {
        await this.shoppingCartLink.click();
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('cart.html'),
            { timeout: 10000 }
        ); 
    }
    
    async selectSortOption(value) {
        await this.sortDropdown.selectByAttribute('value', value); 
        await this.inventoryList.waitForDisplayed({ timeout: 10000 });
    }
    
    async getProductNames () {
        await this.inventoryList.waitForDisplayed({ timeout: 5000 });
        const names = await this.inventoryItemNames.map(async (element) => await element.getText());
        if (!names || names.length === 0) {
            throw new Error('No product names found on the inventory page');
        }
        return names;
    }

    async getProductPrices () {
        await this.inventoryList.waitForDisplayed({ timeout: 5000 });
        const prices = await this.inventoryItemPrices.map(async (element) => {
            const priceText = await element.getText();
            return parseFloat(priceText.replace('$', ''));
        });
        if (!prices || prices.length === 0) {
            throw new Error('No product prices found on the inventory page');
        }
        return prices;
    }
    
    async clickTwitterLink() {
        await this.twitterLink.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 10000 }
        );
    }

    async clickFacebookLink() {
        await this.facebookLink.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 10000 }
        );
    }

    async clickLinkedInLink() {
        await this.linkedinLink.click();
        await browser.waitUntil(
            async () => (await browser.getWindowHandles()).length > 1,
            { timeout: 10000 }
        );
    }
}
export default new InventoryPage();