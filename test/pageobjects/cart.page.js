import Page from "./page.js";

class CartPage extends Page {
  get cartList() {
    return $(".cart_list");
  }
  get cartItem() {
    return $(".cart_item");
  }
  get cartItemName() {
    return $(".cart_item .inventory_item_name");
  }
  get checkoutButton() {
    return $("#checkout");
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }
}

export default new CartPage();
