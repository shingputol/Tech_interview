import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Checkout Pages
 * Covers US5: Checkout functionality
 * Includes: Checkout Information, Checkout Overview, and Checkout Complete pages
 */
export class CheckoutPage {
  readonly page: Page;
  
  // Checkout Information Page
  readonly pageTitle: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  
  // Checkout Overview Page
  readonly overviewTitle: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly overviewCancelButton: Locator;
  
  // Checkout Complete Page
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Checkout Information
    this.pageTitle = page.locator('.title');
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
    
    // Checkout Overview
    this.overviewTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.itemNames = page.locator('.inventory_item_name');
    this.itemPrices = page.locator('.inventory_item_price');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
    this.overviewCancelButton = page.locator('[data-test="cancel"]');
    
    // Checkout Complete
    this.completeHeader = page.locator('.complete-header');
    this.completeText = page.locator('.complete-text');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('.pony_express');
  }

  /**
   * Navigate to checkout information page
   */
  async gotoCheckoutInfo() {
    await this.page.goto('/checkout-step-one.html');
  }

  /**
   * Verify user is on checkout information page
   */
  async verifyOnCheckoutInfoPage() {
    await expect(this.pageTitle).toHaveText('Checkout: Your Information');
    await expect(this.page).toHaveURL(/checkout-step-one\.html/);
  }

  /**
   * Fill checkout information form
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal/ZIP code
   */
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click Continue button on checkout info page
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Complete checkout information step
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal/ZIP code
   */
  async completeCheckoutInfo(firstName: string, lastName: string, postalCode: string) {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  /**
   * Cancel checkout from information page
   */
  async cancelCheckoutInfo() {
    await this.cancelButton.click();
  }

  /**
   * Get error message on checkout info page
   */
  async getErrorMessage(): Promise<string> {
    await expect(this.errorMessage).toBeVisible();
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Verify error message is displayed
   * @param expectedMessage - Expected error message (partial match)
   */
  async verifyErrorMessage(expectedMessage: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }

  /**
   * Verify user is on checkout overview page
   */
  async verifyOnCheckoutOverviewPage() {
    await expect(this.overviewTitle).toHaveText('Checkout: Overview');
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  /**
   * Get cart items count on overview page
   */
  async getOverviewItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get product names on overview page
   */
  async getOverviewProductNames(): Promise<string[]> {
    const count = await this.itemNames.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await this.itemNames.nth(i).textContent();
      if (name) names.push(name);
    }
    
    return names;
  }

  /**
   * Verify payment information is displayed
   */
  async verifyPaymentInfo() {
    await expect(this.paymentInfo).toBeVisible();
  }

  /**
   * Verify shipping information is displayed
   */
  async verifyShippingInfo() {
    await expect(this.shippingInfo).toBeVisible();
  }

  /**
   * Get subtotal amount
   */
  async getSubtotal(): Promise<number> {
    const text = await this.subtotalLabel.textContent() || '';
    const match = text.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get tax amount
   */
  async getTax(): Promise<number> {
    const text = await this.taxLabel.textContent() || '';
    const match = text.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get total amount
   */
  async getTotal(): Promise<number> {
    const text = await this.totalLabel.textContent() || '';
    const match = text.match(/\$(\d+\.\d+)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Verify price calculation (subtotal + tax = total)
   */
  async verifyPriceCalculation() {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();
    
    // Allow small floating point difference
    const expectedTotal = subtotal + tax;
    expect(Math.abs(total - expectedTotal)).toBeLessThan(0.01);
  }

  /**
   * Verify all overview information is displayed
   */
  async verifyOverviewInformation() {
    await expect(this.subtotalLabel).toBeVisible();
    await expect(this.taxLabel).toBeVisible();
    await expect(this.totalLabel).toBeVisible();
    await this.verifyPaymentInfo();
    await this.verifyShippingInfo();
  }

  /**
   * Click Finish button to complete order
   */
  async finishOrder() {
    await this.finishButton.click();
  }

  /**
   * Cancel checkout from overview page
   */
  async cancelCheckoutOverview() {
    await this.overviewCancelButton.click();
  }

  /**
   * Verify user is on checkout complete page
   */
  async verifyOnCheckoutCompletePage() {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
    await expect(this.completeHeader).toBeVisible();
  }

  /**
   * Verify order confirmation message
   */
  async verifyOrderConfirmation() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.ponyExpressImage).toBeVisible();
  }

  /**
   * Get confirmation header text
   */
  async getConfirmationHeader(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  }

  /**
   * Get confirmation message text
   */
  async getConfirmationText(): Promise<string> {
    return await this.completeText.textContent() || '';
  }

  /**
   * Click Back Home button
   */
  async backToProducts() {
    await this.backHomeButton.click();
  }

  /**
   * Complete full checkout flow
   * @param firstName - First name
   * @param lastName - Last name
   * @param postalCode - Postal code
   */
  async completeCheckoutFlow(firstName: string, lastName: string, postalCode: string) {
    await this.completeCheckoutInfo(firstName, lastName, postalCode);
    await this.verifyOnCheckoutOverviewPage();
    await this.finishOrder();
    await this.verifyOnCheckoutCompletePage();
  }
}
