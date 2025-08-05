import Page from './page.js';

class CartPage extends Page {
    get cartList () {
        return $('.cart_list');
    }
    get cartItem() {
        return $('.cart_item');
    }
    get cartItemName () {
        return $('.cart_item .inventory_item_name'); 
    }
    get checkoutButton() {
        return $('#checkout');
    }
    
    async clickCheckoutButton () {
        await this.checkoutButton.click();
        await browser.pause(1000);
    }

    async isDisplayed () {
        return await this.cartList.isDisplayed();
    }

    async getCartItemName() {
        const item = await $('.cart_item .cart_item_label .inventory_item_name');
        await item.waitForDisplayed({ timeout: 5000 });
        return await item.getText();
    }

    async getCartItemNames() {
        const items = await $$('.cart_item .cart_item_label .inventory_item_name');
        console.log('Found cart items count in CartPage:', items.length); // Debug log
        if (!items || items.length === 0) {
            throw new Error('No items found with selector .cart_item .cart_item_label .inventory_item_name on cart.html');
        }
        const names = [];
        for (const item of items) {
            await item.waitForDisplayed({ timeout: 5000 }); 
            const text = await item.getText();
            names.push(text);
        }
        console.log('Cart item names in CartPage:', names); 
        return names;
    }
     async getCartItemCount() {
        const items = await $$('.cart_item');
        console.log('Cart item count:', items.length); 
        return items.length;
    }

    async getErrorMessageText() {
        try {
            const error = await this.errorMessage;
            await error.waitForDisplayed({ timeout: 3000 });
            const text = await error.getText();
            console.log('Error message:', text); 
            return text;
        } catch (error) {
            console.log('No error message found'); 
            return '';
        }
    }

}

export default new CartPage();