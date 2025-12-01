import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for Product Listing/Inventory Page
 * Covers US2: Product Listing Page and US3: Add to Cart
 */
export class ProductsPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly productSort: Locator;
  readonly productItems: Locator;
  readonly productNames: Locator;
  readonly productDescriptions: Locator;
  readonly productPrices: Locator;
  readonly productImages: Locator;
  readonly addToCartButtons: Locator;
  readonly removeButtons: Locator;
  readonly cartBadge: Locator;
  readonly cartIcon: Locator;
  readonly hamburgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productSort = page.locator('[data-test="product-sort-container"]');
    this.productItems = page.locator('.inventory_item');
    this.productNames = page.locator('.inventory_item_name');
    this.productDescriptions = page.locator('.inventory_item_desc');
    this.productPrices = page.locator('.inventory_item_price');
    this.productImages = page.locator('.inventory_item_img img');
    this.addToCartButtons = page.locator('button[id^="add-to-cart"]');
    this.removeButtons = page.locator('button[id^="remove"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.hamburgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  /**
   * Navigate to products page (requires authentication)
   */
  async goto() {
    await this.page.goto('/inventory.html');
  }

  /**
   * Verify user is on products page
   */
  async verifyOnProductsPage() {
    await expect(this.pageTitle).toHaveText('Products');
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  /**
   * Get count of products displayed
   */
  async getProductCount(): Promise<number> {
    return await this.productItems.count();
  }

  /**
   * Verify all products have required information
   */
  async verifyProductInformation() {
    const count = await this.getProductCount();
    
    // Verify each product has name, description, image, and price
    for (let i = 0; i < count; i++) {
      await expect(this.productNames.nth(i)).toBeVisible();
      await expect(this.productDescriptions.nth(i)).toBeVisible();
      await expect(this.productImages.nth(i)).toBeVisible();
      await expect(this.productPrices.nth(i)).toBeVisible();
    }
  }

  /**
   * Get all product names in current order
   */
  async getProductNames(): Promise<string[]> {
    const count = await this.productNames.count();
    const names: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const name = await this.productNames.nth(i).textContent();
      if (name) names.push(name);
    }
    
    return names;
  }

  /**
   * Get all product prices in current order
   */
  async getProductPrices(): Promise<number[]> {
    const count = await this.productPrices.count();
    const prices: number[] = [];
    
    for (let i = 0; i < count; i++) {
      const priceText = await this.productPrices.nth(i).textContent();
      if (priceText) {
        // Remove $ symbol and convert to number
        const price = parseFloat(priceText.replace('$', ''));
        prices.push(price);
      }
    }
    
    return prices;
  }

  /**
   * Sort products by selected option
   * @param sortOption - 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.productSort.selectOption(sortOption);
    // Wait for sorting to complete
    await this.page.waitForTimeout(500);
  }

  /**
   * Verify products are sorted alphabetically A-Z
   */
  async verifySortedAZ() {
    const names = await this.getProductNames();
    const sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
  }

  /**
   * Verify products are sorted alphabetically Z-A
   */
  async verifySortedZA() {
    const names = await this.getProductNames();
    const sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
  }

  /**
   * Verify products are sorted by price low to high
   */
  async verifySortedLowToHigh() {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
  }

  /**
   * Verify products are sorted by price high to low
   */
  async verifySortedHighToLow() {
    const prices = await this.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  }

  /**
   * Add product to cart by name
   * @param productName - Name of the product to add
   */
  async addToCartByName(productName: string) {
    const productItem = this.page.locator('.inventory_item', { hasText: productName });
    const addButton = productItem.locator('button[id^="add-to-cart"]');
    await addButton.click();
  }

  /**
   * Add product to cart by index
   * @param index - Index of the product (0-based)
   */
  async addToCartByIndex(index: number) {
    // Get the specific product item and find its Add to Cart button
    const productItem = this.productItems.nth(index);
    const addButton = productItem.locator('button[id^="add-to-cart"]');
    await addButton.click();
  }

  /**
   * Remove product from cart by name
   * @param productName - Name of the product to remove
   */
  async removeFromCartByName(productName: string) {
    const productItem = this.page.locator('.inventory_item', { hasText: productName });
    const removeButton = productItem.locator('button[id^="remove"]');
    await removeButton.click();
  }

  /**
   * Get cart badge count
   */
  async getCartCount(): Promise<number> {
    if (await this.cartBadge.isVisible()) {
      const count = await this.cartBadge.textContent();
      return parseInt(count || '0');
    }
    return 0;
  }

  /**
   * Verify cart badge shows expected count
   * @param expectedCount - Expected number in cart badge
   */
  async verifyCartCount(expectedCount: number) {
    if (expectedCount === 0) {
      await expect(this.cartBadge).not.toBeVisible();
    } else {
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(expectedCount.toString());
    }
  }

  /**
   * Click on cart icon to navigate to cart page
   */
  async goToCart() {
    await this.cartIcon.click();
  }

  /**
   * Verify Add to Cart button exists for all products
   */
  async verifyAddToCartButtons() {
    const productCount = await this.getProductCount();
    const buttonCount = await this.addToCartButtons.count();
    expect(buttonCount).toBe(productCount);
  }

  /**
   * Logout from the application
   */
  async logout() {
    await this.hamburgerMenu.click();
    await this.logoutLink.click();
  }

  /**
   * Get product details by index
   */
  async getProductDetails(index: number): Promise<{
    name: string;
    description: string;
    price: string;
  }> {
    const name = await this.productNames.nth(index).textContent() || '';
    const description = await this.productDescriptions.nth(index).textContent() || '';
    const price = await this.productPrices.nth(index).textContent() || '';
    
    return { name, description, price };
  }
}
