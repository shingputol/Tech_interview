/**
 * Utility functions for test automation
 */

import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { USERS } from '../data/users';

/**
 * Perform login and wait for navigation to products page
 * @param page - Playwright page object
 * @param username - Username to login with (default: standard_user)
 * @param password - Password to login with (default: secret_sauce)
 */
export async function login(
  page: Page,
  username: string = USERS.STANDARD.username,
  password: string = USERS.STANDARD.password
): Promise<void> {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(username, password);
  
  // Wait for navigation to complete
  await page.waitForURL(/inventory\.html/);
}

/**
 * Take a screenshot with a custom name
 * @param page - Playwright page object
 * @param name - Screenshot name
 */
export async function takeScreenshot(page: Page, name: string): Promise<void> {
  await page.screenshot({
    path: `screenshots/${name}-${Date.now()}.png`,
    fullPage: true
  });
}

/**
 * Wait for a specific time (use sparingly, prefer waitFor methods)
 * @param ms - Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate random checkout information
 */
export function generateRandomCheckoutInfo() {
  const firstNames = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Davis'];
  const postcodes = ['SW1A 1AA', 'M1 1AE', 'EC1A 1BB', 'W1A 0AX', 'N1 9GU'];

  return {
    firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
    lastName: lastNames[Math.floor(Math.random() * lastNames.length)],
    postalCode: postcodes[Math.floor(Math.random() * postcodes.length)]
  };
}

/**
 * Round number to 2 decimal places
 * @param num - Number to round
 */
export function roundToTwo(num: number): number {
  return Math.round(num * 100) / 100;
}

/**
 * Parse price string to number
 * @param priceString - Price string (e.g., "$29.99" or "£29.99")
 */
export function parsePrice(priceString: string): number {
  return parseFloat(priceString.replace(/[$£,]/g, ''));
}

/**
 * Format price to currency string
 * @param price - Price as number
 * @param currency - Currency symbol (default: $)
 */
export function formatPrice(price: number, currency: string = '$'): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Get current timestamp for unique identifiers
 */
export function getTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Clear browser storage
 * @param page - Playwright page object
 */
export async function clearStorage(page: Page): Promise<void> {
  await page.evaluate(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
}

/**
 * Check if array is sorted in ascending order
 * @param arr - Array to check
 */
export function isSortedAscending<T>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Check if array is sorted in descending order
 * @param arr - Array to check
 */
export function isSortedDescending<T>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
}
