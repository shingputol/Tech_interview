import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { login } from '../utils/helpers';
import { CHECKOUT_INFO } from '../data/checkout';

/**
 * End-to-End Test Scenarios
 * Coverage: Complete user journeys from login to checkout
 */

test.describe('E2E: Complete Purchase Journeys', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    await login(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('TC-E2E-001: Complete purchase journey - single item @smoke @P0', async ({ page }) => {
    // 1. Browse products
    await productsPage.verifyOnProductsPage();
    
    // 2. Add one product to cart
    const productName = await productsPage.productNames.first().textContent();
    await productsPage.addToCartByIndex(0);
    await productsPage.verifyCartCount(1);
    
    // 3. Go to cart
    await productsPage.goToCart();
    await cartPage.verifyOnCartPage();
    
    // 4. Verify product in cart
    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(productName!);
    
    // 5. Proceed to checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyOnCheckoutInfoPage();
    
    // 6. Fill checkout information
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // 7. Review order on overview page
    await checkoutPage.verifyOnCheckoutOverviewPage();
    await checkoutPage.verifyOverviewInformation();
    
    // 8. Complete order
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOnCheckoutCompletePage();
    await checkoutPage.verifyOrderConfirmation();
    
    // 9. Return to products
    await checkoutPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    
    // 10. Verify cart is cleared
    await productsPage.verifyCartCount(0);
  });

  test('TC-E2E-002: Complete purchase journey - multiple items @smoke @P0', async ({ page }) => {
    // 1. Add multiple products to cart
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.addToCartByIndex(2);
    await productsPage.verifyCartCount(3);
    
    // 2. Go to cart
    await productsPage.goToCart();
    await cartPage.verifyOnCartPage();
    
    // 3. Verify all products are in cart
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(3);
    
    // 4. Checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID_ALT.firstName,
      CHECKOUT_INFO.VALID_ALT.lastName,
      CHECKOUT_INFO.VALID_ALT.postalCode
    );
    
    // 5. Verify all items on overview
    const overviewCount = await checkoutPage.getOverviewItemCount();
    expect(overviewCount).toBe(3);
    
    // 6. Verify pricing
    await checkoutPage.verifyPriceCalculation();
    
    // 7. Complete order
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderConfirmation();
    
    // 8. Return home and verify cart cleared
    await checkoutPage.backToProducts();
    await productsPage.verifyCartCount(0);
  });

  test('TC-E2E-003: Add items, modify cart, then checkout @regression @P1', async ({ page }) => {
    // 1. Add 3 products
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.addToCartByIndex(2);
    await productsPage.verifyCartCount(3);
    
    // 2. Go to cart
    await productsPage.goToCart();
    
    // 3. Remove 1 product from cart
    await cartPage.removeProductByIndex(1);
    
    // 4. Verify count updated
    const itemCount = await cartPage.getCartItemCount();
    expect(itemCount).toBe(2);
    
    // 5. Proceed with checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.UK_POSTCODE_1.firstName,
      CHECKOUT_INFO.UK_POSTCODE_1.lastName,
      CHECKOUT_INFO.UK_POSTCODE_1.postalCode
    );
    
    // 6. Verify 2 items on overview
    const overviewCount = await checkoutPage.getOverviewItemCount();
    expect(overviewCount).toBe(2);
    
    // 7. Complete order
    await checkoutPage.finishOrder();
    await checkoutPage.verifyOrderConfirmation();
  });

  test('TC-E2E-004: Sort products then purchase @regression @P2', async ({ page }) => {
    // Verify we're on products page first
    await productsPage.verifyOnProductsPage();
    
    // 1. Sort by price low to high
    await productsPage.sortProducts('lohi');
    await productsPage.verifySortedLowToHigh();
    
    // 2. Add cheapest item (first one after sorting)
    await productsPage.addToCartByIndex(0);
    const cheapestProduct = await productsPage.productNames.first().textContent();
    
    // 3. Complete checkout
    await productsPage.goToCart();
    await cartPage.verifyProductInCart(cheapestProduct!);
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutFlow(
      CHECKOUT_INFO.UK_POSTCODE_2.firstName,
      CHECKOUT_INFO.UK_POSTCODE_2.lastName,
      CHECKOUT_INFO.UK_POSTCODE_2.postalCode
    );
    
    // 4. Verify success
    await checkoutPage.verifyOrderConfirmation();
  });

  test('TC-E2E-EXTRA: Complete journey with all sorting options @regression @P2', async ({ page }) => {
    // Test sorting doesn't affect checkout
    
    // 1. Sort by name Z-A
    await productsPage.sortProducts('za');
    await productsPage.verifySortedZA();
    
    // 2. Add first product
    await productsPage.addToCartByIndex(0);
    
    // 3. Change sort to price high to low
    await productsPage.sortProducts('hilo');
    await productsPage.verifySortedHighToLow();
    
    // 4. Add another product
    await productsPage.addToCartByIndex(0);
    
    // 5. Verify cart count
    await productsPage.verifyCartCount(2);
    
    // 6. Complete purchase
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutFlow(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    await checkoutPage.verifyOrderConfirmation();
  });

  test('TC-E2E-EXTRA: Add all products and checkout @regression @P2', async ({ page }) => {
    // 1. Get product count
    const productCount = await productsPage.getProductCount();
    
    // 2. Add all products
    for (let i = 0; i < productCount; i++) {
      await productsPage.addToCartByIndex(i);
    }
    
    // 3. Verify cart count
    await productsPage.verifyCartCount(productCount);
    
    // 4. Go to cart and verify all items
    await productsPage.goToCart();
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(productCount);
    
    // 5. Complete checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutFlow(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    await checkoutPage.verifyOrderConfirmation();
  });

  test('TC-E2E-EXTRA: Cancel and resume checkout @regression @P2', async ({ page }) => {
    // 1. Add products
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    
    // 2. Start checkout
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // 3. Cancel from checkout info
    await checkoutPage.cancelCheckoutInfo();
    await expect(page).toHaveURL(/cart\.html/);
    
    // 4. Resume checkout
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // 5. Cancel from overview
    await checkoutPage.cancelCheckoutOverview();
    await expect(page).toHaveURL(/inventory\.html/);
    
    // 6. Verify cart still has items
    await productsPage.verifyCartCount(2);
    
    // 7. Complete checkout this time
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutFlow(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    await checkoutPage.verifyOrderConfirmation();
  });
});
