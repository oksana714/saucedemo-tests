import Page from './page.js';

class InventoryPage extends Page {
  get inventoryList() {
    return $('.inventory_list');
  }
  get shoppingCartLink() {
    return $('.shopping_cart_link');
  }
  get burgerButton() {
    return $('#react-burger-menu-btn');
  }
  get menuItems() {
    return $$('.bm-item.menu-item');
  }
  get logoutButton() {
    return $('#logout_sidebar_link');
  }
  get cartBadge() {
    return $('.shopping_cart_badge');
  }
  get sortDropdown() {
    return $('.product_sort_container');
  }
  get inventoryItems() {
    return $$('.inventory_item');
  }
  get inventoryItemNames() {
    return $$('.inventory_item_name');
  }
  get inventoryItemPrices() {
    return $$('.inventory_item_price');
  }
  get twitterLink() {
    return $('a[data-test="social-twitter"]');
  }
  get facebookLink() {
    return $('a[data-test="social-facebook"]');
  }
  get linkedinLink() {
    return $('a[data-test="social-linkedin"]');
  }

  async clickBurgerButton() {
    await this.burgerButton.click();
  }

  async getMenuItemsCount() {
    return (await this.menuItems).length;
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async clickAddToCartByIndex(index = 1) {
    const selector = `.inventory_item:nth-child(${index}) .btn_inventory`;
    await $(selector).click();
  }

  async getCartBadgeCount() {
    const text = await this.cartBadge.getText();
    return parseInt(text, 10) || 0;
  }

  async clickCartButton() {
    await this.shoppingCartLink.click();
  }

  async selectSortOption(value) {
    await this.sortDropdown.selectByAttribute('value', value);
  }

  async getProductNames() {
    return await this.inventoryItemNames.map(async (element) => await element.getText());
  }

  async getProductPrices() {
    return await this.inventoryItemPrices.map(async (element) => {
      const priceText = await element.getText();
      return parseFloat(priceText.replace('$', ''));
    });
  }

  async clickTwitterLink() {
    await this.twitterLink.click();
  }

  async clickFacebookLink() {
    await this.facebookLink.click();
  }

  async clickLinkedInLink() {
    await this.linkedinLink.click();
  }
}
export default new InventoryPage();
