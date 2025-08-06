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
    }

    async isDisplayed () {
        return await this.cartList.isDisplayed();
    }

    async getCartItemName() {
        const item = await $('.cart_item .cart_item_label .inventory_item_name');
        return await item.getText();
    }

    async getCartItemNames() {
        const items = await $$('.cart_item .cart_item_label .inventory_item_name');
        if (!items || items.length === 0) {
            throw new Error('No items found with selector .cart_item .cart_item_label .inventory_item_name on cart.html');
        }
        const names = [];
        for (const item of items) {
            const text = await item.getText();
            names.push(text);
        }
        return names;
    }
     async getCartItemCount() {
        const items = await $$('.cart_item');
        return items.length;
    }

    async getErrorMessageText() {
        try {
            const error = await this.errorMessage;
            await error.waitForDisplayed({ timeout: 3000 });
            const text = await error.getText();
            return text;
        } catch (error) {
            return '';
        }
    }

}

export default new CartPage();