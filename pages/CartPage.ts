import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Cart Page
 * Covers US4: Cart Page functionality
 */
export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly cartItems: Locator;
  readonly cartItemNames: Locator;
  readonly cartItemDescriptions: Locator;
  readonly cartItemPrices: Locator;
  readonly cartQuantities: Locator;
  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
    this.cartItemNames = page.locator('.inventory_item_name');
    this.cartItemDescriptions = page.locator('.inventory_item_desc');
    this.cartItemPrices = page.locator('.inventory_item_price');
    this.cartQuantities = page.locator('.cart_quantity');
    this.removeButtons = page.locator('button[id^="remove"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  /**
   * Navigate to cart page
   */
  async goto() {
    await this.page.goto('/cart.html');
  }

  /**
   * Verify user is on cart page
   */
  async verifyOnCartPage() {
    await expect(this.pageTitle).toHaveText('Your Cart');
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  /**
   * Get count of items in cart
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  /**
   * Get all product names in cart
   */
  async getCartItemNames(): Promise<string[]> {
    const count = await this.cartItemNames.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await this.cartItemNames.nth(i).textContent();
      if (name) names.push(name);
    }
    
    return names;
  }

  /**
   * Get all product prices in cart
   */
  async getCartItemPrices(): Promise<number[]> {
    const count = await this.cartItemPrices.count();
    const prices: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const priceText = await this.cartItemPrices.nth(i).textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        prices.push(price);
      }
    }
    
    return prices;
  }

  /**
   * Calculate expected total from cart items
   */
  async calculateCartTotal(): Promise<number> {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }

  /**
   * Verify cart contains expected product
   * @param productName - Name of the product to verify
   */
  async verifyProductInCart(productName: string) {
    const names = await this.getCartItemNames();
    expect(names).toContain(productName);
  }

  /**
   * Remove product from cart by name
   * @param productName - Name of the product to remove
   */
  async removeProductByName(productName: string) {
    const cartItem = this.page.locator('.cart_item', { hasText: productName });
    const removeButton = cartItem.locator('button[id^="remove"]');
    await removeButton.click();
  }

  /**
   * Remove product from cart by index
   * @param index - Index of the product to remove (0-based)
   */
  async removeProductByIndex(index: number) {
    await this.removeButtons.nth(index).click();
  }

  /**
   * Click Continue Shopping button
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Click Checkout button
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Verify cart is empty
   */
  async verifyCartIsEmpty() {
    const count = await this.getCartItemCount();
    expect(count).toBe(0);
  }

  /**
   * Verify checkout button is enabled/disabled
   */
  async verifyCheckoutButtonEnabled(enabled: boolean = true) {
    if (enabled) {
      await expect(this.checkoutButton).toBeEnabled();
    } else {
      await expect(this.checkoutButton).toBeDisabled();
    }
  }

  /**
   * Get cart badge count
   */
  async getCartBadgeCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const count = await this.cartBadge.textContent();
      return parseInt(count || '0');
    }
    return 0;
  }

  /**
   * Verify cart displays all product information
   */
  async verifyProductInformation() {
    const count = await this.getCartItemCount();
    
    for (let i = 0; i < count; i++) {
      await expect(this.cartItemNames.nth(i)).toBeVisible();
      await expect(this.cartItemDescriptions.nth(i)).toBeVisible();
      await expect(this.cartItemPrices.nth(i)).toBeVisible();
      await expect(this.cartQuantities.nth(i)).toBeVisible();
    }
  }

  /**
   * Get product details from cart
   */
  async getProductDetails(index: number): Promise<{
    name: string;
    description: string;
    price: string;
    quantity: string;
  }> {
    const name = await this.cartItemNames.nth(index).textContent() || '';
    const description = await this.cartItemDescriptions.nth(index).textContent() || '';
    const price = await this.cartItemPrices.nth(index).textContent() || '';
    const quantity = await this.cartQuantities.nth(index).textContent() || '';
    
    return { name, description, price, quantity };
  }
}
