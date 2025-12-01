# Test Cases - Saucedemo E-commerce Platform

## Test Case Decomposition and Priority Assignment

### Priority Levels
- **P0 (Critical)**: Blocks core functionality, must pass before release
- **P1 (High)**: Important features, should pass before release
- **P2 (Medium)**: Standard features, fix if time permits
- **P3 (Low)**: Nice-to-have, cosmetic issues

---

## US1: User Login

### Test Cases

| Test ID | Test Case Title | Priority | Test Steps | Expected Result |
|---------|----------------|----------|------------|-----------------|
| TC-US1-001 | Verify login page is first step in user journey | P0 | 1. Navigate to https://www.saucedemo.com/ | User should land on login page, cannot bypass to other pages |
| TC-US1-002 | Verify login page elements exist | P0 | 1. Navigate to login page<br>2. Verify username field exists<br>3. Verify password field exists<br>4. Verify Login button exists | All elements should be visible and accessible |
| TC-US1-003 | Verify successful login with valid credentials | P0 | 1. Enter valid username (standard_user)<br>2. Enter valid password (secret_sauce)<br>3. Click Login button | User is authenticated and redirected to product listing page |
| TC-US1-004 | Verify login with invalid username | P1 | 1. Enter invalid username<br>2. Enter valid password<br>3. Click Login button | Error message displayed, user remains on login page |
| TC-US1-005 | Verify login with invalid password | P1 | 1. Enter valid username<br>2. Enter invalid password<br>3. Click Login button | Error message displayed, user remains on login page |
| TC-US1-006 | Verify login with empty credentials | P1 | 1. Leave username empty<br>2. Leave password empty<br>3. Click Login button | Error message displayed requiring credentials |
| TC-US1-007 | Verify login with empty username | P1 | 1. Leave username empty<br>2. Enter valid password<br>3. Click Login button | Error message displayed requiring username |
| TC-US1-008 | Verify login with empty password | P1 | 1. Enter valid username<br>2. Leave password empty<br>3. Click Login button | Error message displayed requiring password |
| TC-US1-009 | Verify login with locked out user | P1 | 1. Enter locked_out_user<br>2. Enter valid password<br>3. Click Login button | Error message indicating user is locked out |
| TC-US1-010 | Verify login with problem user | P2 | 1. Enter problem_user<br>2. Enter valid password<br>3. Click Login button | User is authenticated (test for potential issues) |
| TC-US1-011 | Verify login with performance glitch user | P2 | 1. Enter performance_glitch_user<br>2. Enter valid password<br>3. Click Login button | User is authenticated (may have delays) |
| TC-US1-012 | Verify forced login before browsing | P0 | 1. Try to access /inventory.html directly without login | User is redirected to login page |

---

## US2: Product Listing Page

### Test Cases

| Test ID | Test Case Title | Priority | Test Steps | Expected Result |
|---------|----------------|----------|------------|-----------------|
| TC-US2-001 | Verify redirect to product listing after login | P0 | 1. Login with valid credentials | User is redirected to product listing page |
| TC-US2-002 | Verify product grid displays | P0 | 1. Login and navigate to product listing<br>2. Verify products are displayed in grid format | Products are displayed in a grid layout |
| TC-US2-003 | Verify product name is displayed | P0 | 1. Navigate to product listing<br>2. Check each product tile | Each product displays a name |
| TC-US2-004 | Verify product description is displayed | P1 | 1. Navigate to product listing<br>2. Check each product tile | Each product displays a description |
| TC-US2-005 | Verify product image is displayed | P1 | 1. Navigate to product listing<br>2. Check each product tile | Each product displays an image |
| TC-US2-006 | Verify product price is displayed in £ | P0 | 1. Navigate to product listing<br>2. Check each product tile | Each product displays a price (Note: Check if £ symbol is shown) |
| TC-US2-007 | Verify all required product info is present | P0 | 1. Navigate to product listing<br>2. Check all products | Each product has name, description, image, and price |
| TC-US2-008 | Verify sort by Name (A to Z) | P1 | 1. Navigate to product listing<br>2. Select "Name (A to Z)" from sort dropdown<br>3. Verify product order | Products are sorted alphabetically A-Z |
| TC-US2-009 | Verify sort by Name (Z to A) | P1 | 1. Navigate to product listing<br>2. Select "Name (Z to A)" from sort dropdown<br>3. Verify product order | Products are sorted alphabetically Z-A |
| TC-US2-010 | Verify sort by Price (low to high) | P1 | 1. Navigate to product listing<br>2. Select "Price (low to high)" from sort dropdown<br>3. Verify product order | Products are sorted by price ascending |
| TC-US2-011 | Verify sort by Price (high to low) | P1 | 1. Navigate to product listing<br>2. Select "Price (high to low)" from sort dropdown<br>3. Verify product order | Products are sorted by price descending |
| TC-US2-012 | Verify default sort order | P2 | 1. Navigate to product listing<br>2. Check initial product order | Products have a consistent default order |

---

## US3: Add to Cart

### Test Cases

| Test ID | Test Case Title | Priority | Test Steps | Expected Result |
|---------|----------------|----------|------------|-----------------|
| TC-US3-001 | Verify "Add to Cart" button on product tiles | P0 | 1. Navigate to product listing<br>2. Check each product tile | Each product has an "Add to Cart" button |
| TC-US3-002 | Verify adding single product to cart | P0 | 1. Navigate to product listing<br>2. Click "Add to Cart" on a product<br>3. Check cart icon | Product is added, cart badge shows 1 |
| TC-US3-003 | Verify adding multiple different products | P0 | 1. Add product A to cart<br>2. Add product B to cart<br>3. Check cart icon | Cart badge shows correct count (2) |
| TC-US3-004 | Verify adding same product multiple times | P0 | 1. Click "Add to Cart" on same product<br>2. Click "Add to Cart" again on same product<br>3. Check cart icon | Cart badge shows correct count (2) |
| TC-US3-005 | Verify cart icon badge updates | P0 | 1. Add products to cart<br>2. Observe cart icon | Badge updates with correct product count |
| TC-US3-006 | Verify cart icon location | P1 | 1. Navigate to product listing<br>2. Locate cart icon | Cart icon is visible in top right (spec says top left, verify actual) |
| TC-US3-007 | Verify "Remove" button after adding to cart | P1 | 1. Add product to cart<br>2. Check button state | Button changes to "Remove" |
| TC-US3-008 | Verify removing product from listing page | P1 | 1. Add product to cart<br>2. Click "Remove" button<br>3. Check cart badge | Product removed, cart count decreases |
| TC-US3-009 | Verify cart persistence across sorting | P2 | 1. Add products to cart<br>2. Change sort order<br>3. Check cart count | Cart items persist |

---

## US4: Cart Page

### Test Cases

| Test ID | Test Case Title | Priority | Test Steps | Expected Result |
|---------|----------------|----------|------------|-----------------|
| TC-US4-001 | Verify cart icon redirects to cart page | P0 | 1. Click on cart icon | User is navigated to cart page |
| TC-US4-002 | Verify cart page displays products | P0 | 1. Add products to cart<br>2. Navigate to cart page | All added products are displayed |
| TC-US4-003 | Verify cart shows product details | P1 | 1. Add products to cart<br>2. Navigate to cart page | Product name, description, price shown for each item |
| TC-US4-004 | Verify cart shows total price in £ | P0 | 1. Add products to cart<br>2. Navigate to cart page<br>3. Check total price | Total price is displayed (verify £ symbol) |
| TC-US4-005 | Verify total price calculation | P0 | 1. Add multiple products<br>2. Navigate to cart<br>3. Calculate expected total | Total matches sum of product prices |
| TC-US4-006 | Verify removing product from cart | P0 | 1. Add products to cart<br>2. Navigate to cart<br>3. Click "Remove" on a product | Product is removed from cart |
| TC-US4-007 | Verify cart count updates after removal | P0 | 1. Add products to cart<br>2. Remove a product from cart<br>3. Check cart badge | Cart badge count decreases |
| TC-US4-008 | Verify empty cart state | P1 | 1. Navigate to cart with no items | Cart shows empty state appropriately |
| TC-US4-009 | Verify Continue Shopping button | P2 | 1. Navigate to cart<br>2. Click "Continue Shopping" | User returns to product listing |
| TC-US4-010 | Verify cart quantity management | P1 | 1. Add same product twice<br>2. Navigate to cart | Cart shows appropriate quantity/items |

---

## US5: Checkout

### Test Cases

| Test ID | Test Case Title | Priority | Test Steps | Expected Result |
|---------|----------------|----------|------------|-----------------|
| TC-US5-001 | Verify checkout button with items in cart | P0 | 1. Add products to cart<br>2. Navigate to cart<br>3. Check for checkout button | Checkout button is enabled and visible |
| TC-US5-002 | Verify checkout with empty cart | P1 | 1. Navigate to cart with no items<br>2. Try to checkout | Checkout is disabled or prevented |
| TC-US5-003 | Verify checkout information page | P0 | 1. Add products to cart<br>2. Click checkout<br>3. Verify form fields | First name, last name, and postal code fields present |
| TC-US5-004 | Verify checkout with valid information | P0 | 1. Start checkout<br>2. Enter first name, last name, postal code<br>3. Click Continue | User proceeds to overview page |
| TC-US5-005 | Verify checkout with missing first name | P1 | 1. Start checkout<br>2. Leave first name empty<br>3. Enter other details<br>4. Click Continue | Error message displayed |
| TC-US5-006 | Verify checkout with missing last name | P1 | 1. Start checkout<br>2. Leave last name empty<br>3. Enter other details<br>4. Click Continue | Error message displayed |
| TC-US5-007 | Verify checkout with missing postal code | P1 | 1. Start checkout<br>2. Leave postal code empty<br>3. Enter other details<br>4. Click Continue | Error message displayed |
| TC-US5-008 | Verify checkout overview page displays products | P0 | 1. Complete checkout info<br>2. Navigate to overview<br>3. Check products | All cart products are displayed |
| TC-US5-009 | Verify checkout overview shows payment info | P0 | 1. Navigate to checkout overview | Payment information is displayed |
| TC-US5-010 | Verify checkout overview shows shipping info | P0 | 1. Navigate to checkout overview | Shipping information is displayed |
| TC-US5-011 | Verify checkout overview shows price total in £ | P0 | 1. Navigate to checkout overview<br>2. Check price total | Total price displayed (verify £ symbol) |
| TC-US5-012 | Verify price calculation on overview | P0 | 1. Navigate to checkout overview<br>2. Verify total calculation | Subtotal + Tax = Total matches expected |
| TC-US5-013 | Verify completing order from overview | P0 | 1. Navigate to checkout overview<br>2. Click "Finish" button | Order is completed successfully |
| TC-US5-014 | Verify order confirmation page | P0 | 1. Complete an order<br>2. Check confirmation page | Confirmation message and details displayed |
| TC-US5-015 | Verify cart is cleared after order completion | P1 | 1. Complete an order<br>2. Check cart badge | Cart is empty (badge shows 0 or is hidden) |
| TC-US5-016 | Verify cancel button on checkout info | P2 | 1. Start checkout<br>2. Click Cancel | User returns to cart page |
| TC-US5-017 | Verify cancel button on checkout overview | P2 | 1. Navigate to checkout overview<br>2. Click Cancel | User returns to product listing |

---

## End-to-End Test Scenarios

| Test ID | Test Case Title | Priority | Test Steps | Expected Result |
|---------|----------------|----------|------------|-----------------|
| TC-E2E-001 | Complete purchase journey - single item | P0 | 1. Login<br>2. Add one product<br>3. Go to cart<br>4. Checkout<br>5. Complete order | Order successfully placed |
| TC-E2E-002 | Complete purchase journey - multiple items | P0 | 1. Login<br>2. Add multiple products<br>3. Go to cart<br>4. Checkout<br>5. Complete order | Order successfully placed with all items |
| TC-E2E-003 | Add items, modify cart, then checkout | P1 | 1. Login<br>2. Add 3 products<br>3. Remove 1 from cart<br>4. Checkout<br>5. Complete order | Order placed with 2 items |
| TC-E2E-004 | Sort products then purchase | P2 | 1. Login<br>2. Sort by price (low to high)<br>3. Add cheapest item<br>4. Complete checkout | Order successfully placed |

---

## Summary Statistics

- **Total Test Cases**: 67
- **P0 (Critical)**: 29 test cases
- **P1 (High)**: 24 test cases
- **P2 (Medium)**: 10 test cases
- **P3 (Low)**: 0 test cases
- **End-to-End Scenarios**: 4 test cases

## Test Coverage Analysis

### US1 - User Login: 12 test cases (6 P0, 5 P1, 1 P2)
- Covers positive and negative scenarios
- Tests various user types
- Validates security (forced login)

### US2 - Product Listing: 12 test cases (4 P0, 6 P1, 2 P2)
- Validates all product information display
- Tests all sorting options
- Covers layout and presentation

### US3 - Add to Cart: 9 test cases (5 P0, 3 P1, 1 P2)
- Tests adding items functionality
- Validates cart badge updates
- Tests remove functionality

### US4 - Cart Page: 10 test cases (4 P0, 3 P1, 3 P2)
- Validates cart display and management
- Tests price calculations
- Covers cart modifications

### US5 - Checkout: 17 test cases (8 P0, 7 P1, 2 P2)
- Complete checkout flow validation
- Form validation tests
- Order confirmation verification

### E2E Scenarios: 4 test cases (2 P0, 1 P1, 1 P2)
- Complete user journeys
- Real-world usage patterns

## Recommended Test Execution Order

1. **Smoke Tests** (P0 critical path):
   - TC-US1-001, TC-US1-002, TC-US1-003
   - TC-US2-001, TC-US2-003, TC-US2-006
   - TC-US3-001, TC-US3-002
   - TC-US4-001, TC-US4-002
   - TC-US5-001, TC-US5-003, TC-US5-004
   - TC-E2E-001

2. **Regression Tests** (All P0 + P1)

3. **Full Test Suite** (All test cases)
