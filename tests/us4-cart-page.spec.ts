import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { login } from '../utils/helpers';

/**
 * Test Suite for US4: Cart Page
 * Coverage: 10 test cases (TC-US4-001 to TC-US4-010)
 */

test.describe('US4: Cart Page', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await login(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('TC-US4-001: Verify cart icon redirects to cart page @smoke @P0', async ({ page }) => {
    // Click on cart icon
    await productsPage.goToCart();
    
    // Verify redirect to cart page
    await cartPage.verifyOnCartPage();
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('TC-US4-002: Verify cart page displays products @smoke @P0', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.addToCartByIndex(2);
    
    // Navigate to cart
    await productsPage.goToCart();
    await cartPage.verifyOnCartPage();
    
    // Verify all added products are displayed
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(3);
  });

  test('TC-US4-003: Verify cart shows product details @regression @P1', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Verify product information is displayed
    await cartPage.verifyProductInformation();
    
    // Verify specific elements
    await expect(cartPage.cartItemNames.first()).toBeVisible();
    await expect(cartPage.cartItemDescriptions.first()).toBeVisible();
    await expect(cartPage.cartItemPrices.first()).toBeVisible();
  });

  test('TC-US4-004: Verify cart shows total price @smoke @P0', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Get cart item prices
    const prices = await cartPage.getCartItemPrices();
    const expectedTotal = prices.reduce((sum, price) => sum + price, 0);
    
    // STRICT REQUIREMENT TEST: US4 AC states "total price in £"
    // Verify prices are shown in £ not $
    const priceTexts = await cartPage.cartItemPrices.allTextContents();
    priceTexts.forEach(priceText => {
      expect(priceText).toMatch(/£\d+\.\d{2}/); // DEFECT-001: Will fail - shows $
      expect(priceText).not.toMatch(/\$/);
    });
    
    // Note: Cart page doesn't show subtotal until checkout overview
    // DEFECT: Spec says cart should show total price, but it's only shown in checkout overview
    
    // Verify items are shown with prices
    expect(prices.length).toBeGreaterThan(0);
    prices.forEach(price => {
      expect(price).toBeGreaterThan(0);
    });
  });

  test('TC-US4-005: Verify total price calculation @smoke @P0', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.addToCartByIndex(2);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Calculate expected total
    const calculatedTotal = await cartPage.calculateCartTotal();
    
    // Verify total is correct sum
    const prices = await cartPage.getCartItemPrices();
    const expectedSum = prices.reduce((sum, price) => sum + price, 0);
    
    expect(calculatedTotal).toBe(expectedSum);
    expect(calculatedTotal).toBeGreaterThan(0);
  });

  test('TC-US4-006: Verify removing product from cart @smoke @P0', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBe(2);
    
    // Remove one product
    await cartPage.removeProductByIndex(0);
    
    // Verify count decreases
    const newCount = await cartPage.getCartItemCount();
    expect(newCount).toBe(1);
  });

  test('TC-US4-007: Verify cart count updates after removal @smoke @P0', async ({ page }) => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.verifyCartCount(2);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Remove one product
    await cartPage.removeProductByIndex(0);
    
    // Verify cart badge updates
    const badgeCount = await cartPage.getCartBadgeCount();
    expect(badgeCount).toBe(1);
  });

  test('TC-US4-008: Verify empty cart state @regression @P1', async () => {
    // Navigate to cart without adding items
    await productsPage.goToCart();
    
    // Verify cart is empty
    await cartPage.verifyCartIsEmpty();
    
    // Verify no items displayed
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(0);
  });

  test('TC-US4-009: Verify Continue Shopping button @regression @P2', async ({ page }) => {
    // Navigate to cart
    await productsPage.goToCart();
    await cartPage.verifyOnCartPage();
    
    // Click Continue Shopping
    await cartPage.continueShopping();
    
    // Verify redirect back to products page
    await expect(page).toHaveURL(/inventory\.html/);
    await productsPage.verifyOnProductsPage();
  });

  test('TC-US4-010: Verify cart quantity management @regression @P1', async () => {
    // Add product to cart
    await productsPage.addToCartByIndex(0);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Verify quantity is shown
    const details = await cartPage.getProductDetails(0);
    expect(details.quantity).toBeTruthy();
    expect(details.quantity).toBe('1');
    
    // DEFECT NOTE: Saucedemo doesn't allow increasing quantity
    // Each item can only have quantity of 1
    // To have "2" of same item, it would need to be added twice (not supported)
  });

  test('TC-US4-EXTRA: Verify remove product by name @regression @P2', async () => {
    // Add specific products
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.addToCartByName('Sauce Labs Bike Light');
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Verify products are in cart
    await cartPage.verifyProductInCart('Sauce Labs Backpack');
    await cartPage.verifyProductInCart('Sauce Labs Bike Light');
    
    // Remove specific product by name
    await cartPage.removeProductByName('Sauce Labs Backpack');
    
    // Verify only one item remains
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(1);
    
    // Verify correct item remains
    const names = await cartPage.getCartItemNames();
    expect(names).toContain('Sauce Labs Bike Light');
    expect(names).not.toContain('Sauce Labs Backpack');
  });

  test('TC-US4-EXTRA: Verify checkout button availability @regression @P1', async () => {
    // With items in cart
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    
    // Checkout button should be enabled
    await expect(cartPage.checkoutButton).toBeEnabled();
    
    // Remove all items
    await cartPage.removeProductByIndex(0);
    
    // Checkout button should still be visible (Saucedemo allows empty cart checkout)
    await expect(cartPage.checkoutButton).toBeVisible();
  });
});
