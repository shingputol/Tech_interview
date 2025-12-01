import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { USERS } from '../data/users';
import { login } from '../utils/helpers';

/**
 * Test Suite for US2: Product Listing Page
 * Coverage: 12 test cases (TC-US2-001 to TC-US2-012)
 */

test.describe('US2: Product Listing Page', () => {
  let productsPage: ProductsPage;

  test.beforeEach(async ({ page }) => {
    // Login before each test
    await login(page);
    productsPage = new ProductsPage(page);
  });

  test('TC-US2-001: Verify redirect to product listing after login @smoke @P0', async ({ page }) => {
    // Already logged in via beforeEach
    // Verify user is on products page
    await productsPage.verifyOnProductsPage();
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-US2-002: Verify product grid displays @smoke @P0', async () => {
    // Verify products are displayed
    const productCount = await productsPage.getProductCount();
    
    // Should have 6 products (standard Saucedemo inventory)
    expect(productCount).toBeGreaterThan(0);
    expect(productCount).toBe(6);
    
    // Verify products are visible in grid
    await expect(productsPage.productItems.first()).toBeVisible();
  });

  test('TC-US2-003: Verify product name is displayed @smoke @P0', async () => {
    // Verify all products have names
    const productCount = await productsPage.getProductCount();
    
    for (let i = 0; i < productCount; i++) {
      await expect(productsPage.productNames.nth(i)).toBeVisible();
      const name = await productsPage.productNames.nth(i).textContent();
      expect(name).toBeTruthy();
      expect(name!.length).toBeGreaterThan(0);
    }
  });

  test('TC-US2-004: Verify product description is displayed @regression @P1', async () => {
    // Verify all products have descriptions
    const productCount = await productsPage.getProductCount();
    
    for (let i = 0; i < productCount; i++) {
      await expect(productsPage.productDescriptions.nth(i)).toBeVisible();
      const description = await productsPage.productDescriptions.nth(i).textContent();
      expect(description).toBeTruthy();
      expect(description!.length).toBeGreaterThan(0);
    }
  });

  test('TC-US2-005: Verify product image is displayed @regression @P1', async () => {
    // Verify all products have images
    const productCount = await productsPage.getProductCount();
    
    for (let i = 0; i < productCount; i++) {
      await expect(productsPage.productImages.nth(i)).toBeVisible();
      
      // Verify image has src attribute
      const src = await productsPage.productImages.nth(i).getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).toContain('.jpg');
    }
  });

  test('TC-US2-006: Verify product price is displayed @smoke @P0', async () => {
    // Verify all products have prices
    const productCount = await productsPage.getProductCount();
    
    for (let i = 0; i < productCount; i++) {
      await expect(productsPage.productPrices.nth(i)).toBeVisible();
      const price = await productsPage.productPrices.nth(i).textContent();
      
      expect(price).toBeTruthy();
      
      // STRICT REQUIREMENT TEST: US2 AC states "Price in £"
      // This test WILL FAIL because actual website uses $
      expect(price).toMatch(/£\d+\.\d{2}/); // Required: £XX.XX format
      expect(price).not.toMatch(/\$/);      // Should NOT contain $
      
      // DEFECT-001: Price is shown in $ instead of £ as required
    }
  });

  test('TC-US2-007: Verify all required product info is present @smoke @P0', async () => {
    // Verify each product has all required information
    await productsPage.verifyProductInformation();
    
    // Verify count of each element matches product count
    const productCount = await productsPage.getProductCount();
    expect(await productsPage.productNames.count()).toBe(productCount);
    expect(await productsPage.productDescriptions.count()).toBe(productCount);
    expect(await productsPage.productImages.count()).toBe(productCount);
    expect(await productsPage.productPrices.count()).toBe(productCount);
  });

  test('TC-US2-008: Verify sort by Name (A to Z) @regression @P1', async () => {
    // Sort products by name A-Z
    await productsPage.sortProducts('az');
    
    // Verify products are sorted correctly
    await productsPage.verifySortedAZ();
    
    // Additional verification - get first and last products
    const names = await productsPage.getProductNames();
    expect(names[0] <= names[names.length - 1]).toBe(true);
  });

  test('TC-US2-009: Verify sort by Name (Z to A) @regression @P1', async () => {
    // Sort products by name Z-A
    await productsPage.sortProducts('za');
    
    // Verify products are sorted correctly
    await productsPage.verifySortedZA();
    
    // Additional verification
    const names = await productsPage.getProductNames();
    expect(names[0] >= names[names.length - 1]).toBe(true);
  });

  test('TC-US2-010: Verify sort by Price (low to high) @regression @P1', async () => {
    // Sort products by price low to high
    await productsPage.sortProducts('lohi');
    
    // Verify products are sorted correctly
    await productsPage.verifySortedLowToHigh();
    
    // Additional verification
    const prices = await productsPage.getProductPrices();
    expect(prices[0] <= prices[prices.length - 1]).toBe(true);
  });

  test('TC-US2-011: Verify sort by Price (high to low) @regression @P1', async () => {
    // Sort products by price high to low
    await productsPage.sortProducts('hilo');
    
    // Verify products are sorted correctly
    await productsPage.verifySortedHighToLow();
    
    // Additional verification
    const prices = await productsPage.getProductPrices();
    expect(prices[0] >= prices[prices.length - 1]).toBe(true);
  });

  test('TC-US2-012: Verify default sort order @regression @P2', async () => {
    // Verify default sort order on initial load
    const initialNames = await productsPage.getProductNames();
    
    // Reload page
    await productsPage.goto();
    
    // Verify same order
    const reloadedNames = await productsPage.getProductNames();
    expect(reloadedNames).toEqual(initialNames);
    
    // Default should be Name A-Z
    await productsPage.verifySortedAZ();
  });

  test('TC-US2-EXTRA: Verify product details completeness @regression @P2', async () => {
    // Verify detailed information for each product
    const productCount = await productsPage.getProductCount();
    
    for (let i = 0; i < productCount; i++) {
      const details = await productsPage.getProductDetails(i);
      
      // Name should not be empty
      expect(details.name.length).toBeGreaterThan(0);
      
      // Description should not be empty
      expect(details.description.length).toBeGreaterThan(0);
      
      // Price should be valid
      expect(details.price).toMatch(/\$\d+\.\d{2}/);
      
      // Price should be parseable
      const priceValue = parseFloat(details.price.replace('$', ''));
      expect(priceValue).toBeGreaterThan(0);
    }
  });
});
