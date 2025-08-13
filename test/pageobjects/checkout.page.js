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

  async clickFinish() {
    await this.finishButton.click();
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}

export default new CheckoutPage();
