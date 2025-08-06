class CheckoutPage {
    
    get firstNameInput() {
        return $('#first-name');
    }

    get lastNameInput() {
        return $('#last-name');
    }

    get postalCodeInput() {
        return $('#postal-code');
    }

    get continueButton() {
        return $('#continue');
    }
   
    

    get totalPriceLabel() {
        return $('.summary_subtotal_label');
    }

    get finishButton() {
        return $('#finish');
    }

    
    get completeHeader() {
        return $('.complete-header');
    }

    get backHomeButton() {
        return $('#back-to-products');
    }

   
    async fillCheckoutForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    
    async getItemNames() {
        const items = await $$('.cart_item .cart_item_label .inventory_item_name'); 
        if (!items || items.length === 0) {
            throw new Error('No items found with selector .cart_item .cart_item_label .inventory_item_name on checkout-step-two.html');
        }
        const names = [];
        for (const item of items) {
            const text = await item.getText();
            names.push(text);
        } 
        return names;
    }

    async getItemPrices() {
        const prices = await $$('.cart_item .cart_item_label .inventory_item_price');
        if (!prices || prices.length === 0) {
            throw new Error('No prices found with selector .cart_item .cart_item_label .inventory_item_price on checkout-step-two.html');
        }
        const priceValues = [];
        for (const price of prices) {
            const text = await price.getText();
            priceValues.push(parseFloat(text.replace('$', '')));
        }
        return priceValues;
    }
    async getTaxAmount() {
        const taxElement = await $('.summary_tax_label');
        const taxText = await taxElement.getText();
        const tax = parseFloat(taxText.replace('Tax: $', '')); 
        return tax;
    }

    async getTotalPrice() {
        const totalElement = await $('.summary_total_label');
        const totalText = await totalElement.getText();
        const total = parseFloat(totalText.replace('Total: $', ''));
        return total;
    }

    async clickFinish() {
        await this.finishButton.click();
    }

    async getCompleteMessage() {
        await this.completeHeader.waitForDisplayed({ timeout: 5000 });
        return await this.completeHeader.getText();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    async isCheckoutCompleteDisplayed() {
        return await this.completeHeader.isDisplayed();
    }
  
}


export default new CheckoutPage();