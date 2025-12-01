import { test, expect } from '@playwright/test';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { login } from '../utils/helpers';
import { CHECKOUT_INFO, INVALID_CHECKOUT_INFO } from '../data/checkout';
import { ERROR_MESSAGES } from '../data/users';

/**
 * Test Suite for US5: Checkout
 * Coverage: 17 test cases (TC-US5-001 to TC-US5-017)
 */

test.describe('US5: Checkout', () => {
  let productsPage: ProductsPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    await login(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test('TC-US5-001: Verify checkout button with items in cart @smoke @P0', async () => {
    // Add product to cart
    await productsPage.addToCartByIndex(0);
    
    // Navigate to cart
    await productsPage.goToCart();
    
    // Verify checkout button is visible and enabled
    await expect(cartPage.checkoutButton).toBeVisible();
    await expect(cartPage.checkoutButton).toBeEnabled();
  });

  test('TC-US5-002: Verify checkout with empty cart @regression @P1', async ({ page }) => {
    // Navigate to cart without adding items
    await productsPage.goToCart();
    
    // Verify cart is empty
    await cartPage.verifyCartIsEmpty();
    
    // STRICT REQUIREMENT TEST: US5 AC states "If the user has at least one 
    // product in the cart, the user should be able to continue to the checkout"
    // Implication: If cart is empty, checkout should NOT be possible
    
    // Checkout button should be disabled or hidden when cart is empty
    // This WILL FAIL - button is actually visible and clickable
    await expect(cartPage.checkoutButton).toBeDisabled(); // DEFECT-004: Will fail
    
    // Alternative: verify error message if checkout is attempted
    // await cartPage.proceedToCheckout();
    // await expect(page.locator('.error-message')).toBeVisible(); // Would also fail
    
    // DEFECT-004: Empty cart can proceed to checkout, violating AC
  });

  test('TC-US5-003: Verify checkout information page @smoke @P0', async () => {
    // Add product and proceed to checkout
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Verify on checkout info page
    await checkoutPage.verifyOnCheckoutInfoPage();
    
    // Verify form fields are present
    await expect(checkoutPage.firstNameInput).toBeVisible();
    await expect(checkoutPage.lastNameInput).toBeVisible();
    await expect(checkoutPage.postalCodeInput).toBeVisible();
    await expect(checkoutPage.continueButton).toBeVisible();
  });

  test('TC-US5-004: Verify checkout with valid information @smoke @P0', async ({ page }) => {
    // Add product and proceed to checkout
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Fill checkout information
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify navigation to overview page
    await checkoutPage.verifyOnCheckoutOverviewPage();
    await expect(page).toHaveURL(/checkout-step-two\.html/);
  });

  test('TC-US5-005: Verify checkout with missing first name @regression @P1', async () => {
    // Add product and proceed to checkout
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Fill form with missing first name
    await checkoutPage.fillCheckoutInformation(
      INVALID_CHECKOUT_INFO.EMPTY_FIRST_NAME.firstName,
      INVALID_CHECKOUT_INFO.EMPTY_FIRST_NAME.lastName,
      INVALID_CHECKOUT_INFO.EMPTY_FIRST_NAME.postalCode
    );
    await checkoutPage.clickContinue();
    
    // Verify error message
    await checkoutPage.verifyErrorMessage(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
  });

  test('TC-US5-006: Verify checkout with missing last name @regression @P1', async () => {
    // Add product and proceed to checkout
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Fill form with missing last name
    await checkoutPage.fillCheckoutInformation(
      INVALID_CHECKOUT_INFO.EMPTY_LAST_NAME.firstName,
      INVALID_CHECKOUT_INFO.EMPTY_LAST_NAME.lastName,
      INVALID_CHECKOUT_INFO.EMPTY_LAST_NAME.postalCode
    );
    await checkoutPage.clickContinue();
    
    // Verify error message
    await checkoutPage.verifyErrorMessage(ERROR_MESSAGES.LAST_NAME_REQUIRED);
  });

  test('TC-US5-007: Verify checkout with missing postal code @regression @P1', async () => {
    // Add product and proceed to checkout
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Fill form with missing postal code
    await checkoutPage.fillCheckoutInformation(
      INVALID_CHECKOUT_INFO.EMPTY_POSTAL_CODE.firstName,
      INVALID_CHECKOUT_INFO.EMPTY_POSTAL_CODE.lastName,
      INVALID_CHECKOUT_INFO.EMPTY_POSTAL_CODE.postalCode
    );
    await checkoutPage.clickContinue();
    
    // Verify error message
    await checkoutPage.verifyErrorMessage(ERROR_MESSAGES.POSTAL_CODE_REQUIRED);
  });

  test('TC-US5-008: Verify checkout overview page displays products @smoke @P0', async () => {
    // Add multiple products
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.addToCartByIndex(2);
    
    const productNames = await productsPage.getProductNames();
    const addedProducts = productNames.slice(0, 3);
    
    // Proceed to checkout
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify all products are displayed on overview
    const overviewCount = await checkoutPage.getOverviewItemCount();
    expect(overviewCount).toBe(3);
    
    const overviewProducts = await checkoutPage.getOverviewProductNames();
    expect(overviewProducts.length).toBe(3);
  });

  test('TC-US5-009: Verify checkout overview shows payment info @smoke @P0', async () => {
    // Complete checkout flow to overview
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify payment information is displayed
    await checkoutPage.verifyPaymentInfo();
    await expect(checkoutPage.paymentInfo).toBeVisible();
  });

  test('TC-US5-010: Verify checkout overview shows shipping info @smoke @P0', async () => {
    // Complete checkout flow to overview
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify shipping information is displayed
    await checkoutPage.verifyShippingInfo();
    await expect(checkoutPage.shippingInfo).toBeVisible();
  });

  test('TC-US5-011: Verify checkout overview shows price total @smoke @P0', async () => {
    // Complete checkout flow to overview
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify price information is displayed
    await expect(checkoutPage.subtotalLabel).toBeVisible();
    await expect(checkoutPage.taxLabel).toBeVisible();
    await expect(checkoutPage.totalLabel).toBeVisible();
    
    // STRICT REQUIREMENT TEST: US5 AC states "Price total in £"
    // This WILL FAIL because actual website uses $
    const totalText = await checkoutPage.totalLabel.textContent();
    expect(totalText).toMatch(/£\d+\.\d{2}/); // DEFECT-001: Will fail - shows $
    expect(totalText).not.toMatch(/\$/);       // Will fail - $ is present
  });

  test('TC-US5-012: Verify price calculation on overview @smoke @P0', async () => {
    // Complete checkout flow to overview
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify price calculation
    await checkoutPage.verifyPriceCalculation();
    
    const subtotal = await checkoutPage.getSubtotal();
    const tax = await checkoutPage.getTax();
    const total = await checkoutPage.getTotal();
    
    expect(subtotal).toBeGreaterThan(0);
    expect(tax).toBeGreaterThan(0);
    expect(total).toBeGreaterThan(0);
    expect(total).toBeCloseTo(subtotal + tax, 2);
  });

  test('TC-US5-013: Verify completing order from overview @smoke @P0', async ({ page }) => {
    // Complete checkout flow
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Click Finish
    await checkoutPage.finishOrder();
    
    // Verify navigation to complete page
    await checkoutPage.verifyOnCheckoutCompletePage();
    await expect(page).toHaveURL(/checkout-complete\.html/);
  });

  test('TC-US5-014: Verify order confirmation page @smoke @P0', async () => {
    // Complete full checkout flow
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutFlow(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Verify confirmation message
    await checkoutPage.verifyOrderConfirmation();
    
    const header = await checkoutPage.getConfirmationHeader();
    expect(header).toContain('Thank you');
    
    await expect(checkoutPage.backHomeButton).toBeVisible();
  });

  test('TC-US5-015: Verify cart is cleared after order completion @regression @P1', async ({ page }) => {
    // Add products and complete order
    await productsPage.addToCartByIndex(0);
    await productsPage.addToCartByIndex(1);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutFlow(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Go back to products page
    await checkoutPage.backToProducts();
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Verify cart is empty
    await productsPage.verifyCartCount(0);
  });

  test('TC-US5-016: Verify cancel button on checkout info @regression @P2', async ({ page }) => {
    // Navigate to checkout info
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    
    // Click Cancel
    await checkoutPage.cancelCheckoutInfo();
    
    // Verify return to cart page
    await expect(page).toHaveURL(/cart\.html/);
  });

  test('TC-US5-017: Verify cancel button on checkout overview @regression @P2', async ({ page }) => {
    // Navigate to checkout overview
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.VALID.firstName,
      CHECKOUT_INFO.VALID.lastName,
      CHECKOUT_INFO.VALID.postalCode
    );
    
    // Click Cancel
    await checkoutPage.cancelCheckoutOverview();
    
    // Verify return to products page
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('TC-US5-EXTRA: Verify complete overview information @regression @P1', async () => {
    // Complete checkout to overview
    await productsPage.addToCartByIndex(0);
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.completeCheckoutInfo(
      CHECKOUT_INFO.UK_POSTCODE_1.firstName,
      CHECKOUT_INFO.UK_POSTCODE_1.lastName,
      CHECKOUT_INFO.UK_POSTCODE_1.postalCode
    );
    
    // Verify all overview information
    await checkoutPage.verifyOverviewInformation();
  });
});
