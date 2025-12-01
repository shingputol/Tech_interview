import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { USERS, ERROR_MESSAGES } from '../data/users';

/**
 * Test Suite for US1: User Login
 * Coverage: 12 test cases (TC-US1-001 to TC-US1-012)
 */

test.describe('US1: User Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-US1-001: Verify login page is first step in user journey @smoke @P0', async ({ page }) => {
    // Verify user lands on login page
    await expect(page).toHaveURL('/');
    await expect(loginPage.isOnLoginPage()).resolves.toBe(true);
    
    // Try to access inventory directly without login
    await page.goto('/inventory.html');
    
    // Should be redirected to login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-002: Verify login page elements exist @smoke @P0', async () => {
    // Verify all required elements are visible
    await loginPage.verifyLoginPageElements();
    
    // Additional assertions
    await expect(loginPage.usernameInput).toHaveAttribute('placeholder', 'Username');
    await expect(loginPage.passwordInput).toHaveAttribute('placeholder', 'Password');
    await expect(loginPage.loginButton).toHaveValue('Login');
  });

  test('TC-US1-003: Verify successful login with valid credentials @smoke @P0', async ({ page }) => {
    // Login with valid credentials
    await loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password);
    
    // Verify redirect to product listing page
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Verify products page is displayed
    const productsPage = new ProductsPage(page);
    await productsPage.verifyOnProductsPage();
  });

  test('TC-US1-004: Verify login with invalid username @regression @P1', async ({ page }) => {
    // Attempt login with invalid username
    await loginPage.login('invalid_user', USERS.STANDARD.password);
    
    // Verify error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
    
    // Verify user remains on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-005: Verify login with invalid password @regression @P1', async ({ page }) => {
    // Attempt login with invalid password
    await loginPage.login(USERS.STANDARD.username, 'wrong_password');
    
    // Verify error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.INVALID_CREDENTIALS);
    
    // Verify user remains on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-006: Verify login with empty credentials @regression @P1', async ({ page }) => {
    // Attempt login with empty credentials
    await loginPage.login('', '');
    
    // Verify error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
    
    // Verify user remains on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-007: Verify login with empty username @regression @P1', async ({ page }) => {
    // Attempt login with empty username
    await loginPage.login('', USERS.STANDARD.password);
    
    // Verify error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
    
    // Verify user remains on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-008: Verify login with empty password @regression @P1', async ({ page }) => {
    // Attempt login with empty password
    await loginPage.login(USERS.STANDARD.username, '');
    
    // Verify error message is displayed
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.PASSWORD_REQUIRED);
    
    // Verify user remains on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-009: Verify login with locked out user @regression @P1', async ({ page }) => {
    // Attempt login with locked out user
    await loginPage.login(USERS.LOCKED_OUT.username, USERS.LOCKED_OUT.password);
    
    // Verify locked out error message
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.LOCKED_OUT);
    
    // Verify user remains on login page
    await expect(page).toHaveURL('/');
  });

  test('TC-US1-010: Verify login with problem user @regression @P2', async ({ page }) => {
    // Login with problem user
    await loginPage.login(USERS.PROBLEM.username, USERS.PROBLEM.password);
    
    // User should be authenticated despite being "problem user"
    await expect(page).toHaveURL(/inventory\.html/);
    
    // Note: This user may have UI issues but authentication should work
    const productsPage = new ProductsPage(page);
    await productsPage.verifyOnProductsPage();
  });

  test('TC-US1-011: Verify login with performance glitch user @regression @P2', async ({ page }) => {
    // Login with performance glitch user
    // This may take longer, so increase timeout
    test.setTimeout(60000);
    
    await loginPage.login(USERS.PERFORMANCE_GLITCH.username, USERS.PERFORMANCE_GLITCH.password);
    
    // User should be authenticated despite performance issues
    await expect(page).toHaveURL(/inventory\.html/, { timeout: 30000 });
    
    const productsPage = new ProductsPage(page);
    await productsPage.verifyOnProductsPage();
  });

  test('TC-US1-012: Verify forced login before browsing @smoke @P0', async ({ page }) => {
    // Try to access different pages without login
    const protectedPages = [
      '/inventory.html',
      '/cart.html',
      '/checkout-step-one.html',
      '/checkout-step-two.html'
    ];
    
    for (const url of protectedPages) {
      await page.goto(url);
      
      // Should be redirected to login page or see error
      await expect(page).toHaveURL('/');
    }
  });

  test('TC-US1-EXTRA: Verify error message can be closed @regression @P2', async ({ page }) => {
    // Trigger an error
    await loginPage.login('', '');
    await loginPage.verifyErrorMessage(ERROR_MESSAGES.USERNAME_REQUIRED);
    
    // Close the error
    await loginPage.clearError();
    
    // Error should not be visible
    await expect(loginPage.errorMessage).not.toBeVisible();
  });
});
