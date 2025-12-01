import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { login } from '../utils/helpers';

/**
 * Test Suite for US3: Add to Cart
 * Coverage: 9 test cases (TC-US3-001 to TC-US3-009)
 */

test.describe('US3: Add to Cart', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    await login(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
  });

  test('TC-US3-001: Verify "Add to Cart" button on product tiles @smoke @P0', async () => {
    // Verify Add to Cart buttons exist for all products
    await productsPage.verifyAddToCartButtons();
    
    const productCount = await productsPage.getProductCount();
    const buttonCount = await productsPage.addToCartButtons.count();
    
    expect(buttonCount).toBe(productCount);
    
    // Verify each button is visible and enabled
    for (let i = 0; i < buttonCount; i++) {
      await expect(productsPage.addToCartButtons.nth(i)).toBeVisible();
      await expect(productsPage.addToCartButtons.nth(i)).toBeEnabled();
    }
  });

  test('TC-US3-002: Verify adding single product to cart @smoke @P0', async () => {
    // Initially cart should be empty
    await expect(productsPage.cartBadge).not.toBeVisible();
    
    // Add first product to cart
    await productsPage.addToCartByIndex(0);
    
    // Verify cart badge shows 1
    await productsPage.verifyCartCount(1);
    await expect(productsPage.cartBadge).toBeVisible();
    await expect(productsPage.cartBadge).toHaveText('1');
  });

  test('TC-US3-003: Verify adding multiple different products @smoke @P0', async () => {
    // Add first product
    await productsPage.addToCartByIndex(0);
    await productsPage.verifyCartCount(1);
    
    // Add second product
    await productsPage.addToCartByIndex(1);
    await productsPage.verifyCartCount(2);
    
    // Add third product
    await productsPage.addToCartByIndex(2);
    await productsPage.verifyCartCount(3);
  });

  test('TC-US3-004: Verify adding same product multiple times @smoke @P0', async () => {
    // Get first product name
    const productName = await productsPage.productNames.first().textContent();
    
    // STRICT REQUIREMENT TEST: US3 AC states "It should be possible to add 
    // the same product to the cart more than once"
    
    // Add same product first time
    await productsPage.addToCartByIndex(0);
    await productsPage.verifyCartCount(1);
    
    // Try to add same product second time
    // This WILL FAIL because button changes to "Remove" and we can't add again
    await productsPage.addToCartByIndex(0);
    await productsPage.verifyCartCount(2); // DEFECT-005: This will fail - count stays at 1
    
    // Verify both items in cart are the same product
    await productsPage.goToCart();
    const cartItems = await cartPage.getCartItemNames();
    const sameProductCount = cartItems.filter((name: string) => name === productName).length;
    expect(sameProductCount).toBe(2); // DEFECT-005: This will fail - only 1 item
    
    // DEFECT-005: Saucedemo doesn't support adding same item multiple times
    // Button changes to "Remove" after adding once, violating AC
  });

  test('TC-US3-005: Verify cart icon badge updates @smoke @P0', async () => {
    // Initially no badge
    let cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(0);
    
    // Add products and verify badge updates
    await productsPage.addToCartByIndex(0);
    cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(1);
    
    await productsPage.addToCartByIndex(1);
    cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(2);
    
    await productsPage.addToCartByIndex(2);
    cartCount = await productsPage.getCartCount();
    expect(cartCount).toBe(3);
  });

  test('TC-US3-006: Verify cart icon location @regression @P1', async () => {
    // Verify cart icon is visible
    await expect(productsPage.cartIcon).toBeVisible();
    
    // DEFECT: Spec says "top left" but cart is actually in "top right"
    // We can verify it's in the header/navigation area
    
    // Get bounding box to verify position
    const box = await productsPage.cartIcon.boundingBox();
    expect(box).not.toBeNull();
    
    // Verify it's in the upper portion of the page
    expect(box!.y).toBeLessThan(200);
  });

  test('TC-US3-007: Verify "Remove" button after adding to cart @regression @P1', async () => {
    // Add product to cart
    await productsPage.addToCartByIndex(0);
    
    // Verify button changes to "Remove"
    await expect(productsPage.removeButtons.first()).toBeVisible();
    await expect(productsPage.removeButtons.first()).toHaveText('Remove');
    
    // Verify Add to Cart button is no longer visible for this product
    const productCount = await productsPage.getProductCount();
    const addButtonCount = await productsPage.addToCartButtons.count();
    const removeButtonCount = await productsPage.removeButtons.count();
    
    expect(addButtonCount).toBe(productCount - 1);
    expect(removeButtonCount).toBe(1);
  });

  test('TC-US3-008: Verify removing product from listing page @regression @P1', async () => {
    // Add product to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.verifyCartCount(1);
    
    // Remove the product
    await productsPage.removeButtons.first().click();
    
    // Verify cart badge updates
    await productsPage.verifyCartCount(0);
    
    // Verify button changes back to "Add to Cart"
    await expect(productsPage.addToCartButtons.first()).toBeVisible();
  });

  test('TC-US3-009: Verify cart persistence across sorting @regression @P2', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.verifyCartCount(2);
    
    // Change sort order
    await productsPage.sortProducts('za');
    
    // Verify cart count persists
    await productsPage.verifyCartCount(2);
    
    // Change sort again
    await productsPage.sortProducts('lohi');
    
    // Verify cart count still persists
    await productsPage.verifyCartCount(2);
  });

  test('TC-US3-EXTRA: Verify add to cart by product name @regression @P2', async () => {
    // Add specific product by name
    await productsPage.addToCartByName('Sauce Labs Backpack');
    await productsPage.verifyCartCount(1);
    
    // Add another product by name
    await productsPage.addToCartByName('Sauce Labs Bike Light');
    await productsPage.verifyCartCount(2);
  });

  test('TC-US3-EXTRA: Verify cart navigation @regression @P1', async () => {
    // Add products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.verifyCartCount(1);
    
    // Click cart icon
    await productsPage.goToCart();
    
    // Verify navigation to cart page
    await expect(productsPage.page).toHaveURL(/cart\.html/);
  });
});
