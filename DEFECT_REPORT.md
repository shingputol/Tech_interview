# Defect Report - Saucedemo E-commerce Platform

**Test Execution Date:** December 1, 2025  
**Tested By:** QA Team  
**Application:** https://www.saucedemo.com/  
**Test Environment:** Production

---

## Executive Summary

During the test automation development and analysis phase, several defects and discrepancies were identified between the requirements specified in the user stories and the actual implementation of the Saucedemo e-commerce platform.

**Total Defects Found:** 7  
- **Critical (P0):** 2
- **High (P1):** 3
- **Medium (P2):** 2
- **Low (P3):** 0

---

## Defect Details

### DEFECT-001: Currency Symbol Mismatch - £ vs $
**Severity:** High (P1)  
**Priority:** High  
**Status:** Open  
**User Story:** US2, US4, US5

**Description:**  
The requirements specify that all prices should be displayed in British Pounds (£), however, the application displays all prices in US Dollars ($).

**Steps to Reproduce:**
1. Login to the application
2. Navigate to product listing page
3. Observe product prices
4. Proceed through cart and checkout
5. Observe all price displays

**Expected Result:**  
All prices should be displayed with £ symbol (e.g., £29.99)

**Actual Result:**  
All prices are displayed with $ symbol (e.g., $29.99)

**Impact:**  
- Affects all price displays across the application
- May cause confusion for UK-based customers
- Business requirement not met

**Affected Areas:**
- Product listing page (US2)
- Cart page (US4)
- Checkout overview page (US5)

**Test Cases Affected:**
- TC-US2-006
- TC-US4-004
- TC-US5-011

**Recommendation:**  
Implement currency localization or update requirements to match implementation.

---

### DEFECT-002: Cart Icon Location Incorrect
**Severity:** Low (P2)  
**Priority:** Low  
**Status:** Open  
**User Story:** US3

**Description:**  
The requirement states "The cart icon in the top left should show the number of products in the cart", however, the cart icon is actually located in the top right of the page.

**Steps to Reproduce:**
1. Login to the application
2. Navigate to product listing page
3. Observe cart icon location

**Expected Result:**  
Cart icon should be in the top left corner

**Actual Result:**  
Cart icon is in the top right corner

**Impact:**  
- Minor discrepancy between spec and implementation
- Does not affect functionality
- Cosmetic/documentation issue

**Affected Areas:**
- Header/Navigation (all pages)

**Test Cases Affected:**
- TC-US3-006

**Recommendation:**  
Update requirements documentation to reflect actual implementation, or relocate cart icon if design requires it in top left.

---

### DEFECT-003: No Subtotal Display on Cart Page
**Severity:** High (P1)  
**Priority:** High  
**Status:** Open  
**User Story:** US4

**Description:**  
The requirement US4 states "The cart should show the products that are in a user's basket and the total price in £", however, the cart page does not display a subtotal or total price. The total is only shown later in the checkout overview page.

**Steps to Reproduce:**
1. Login and add products to cart
2. Navigate to cart page
3. Look for total price display

**Expected Result:**  
Cart page should display subtotal/total of all items in cart

**Actual Result:**  
Cart page shows individual item prices but no total calculation

**Impact:**  
- Users cannot see total cost before proceeding to checkout
- Poor user experience
- Business requirement not met

**Affected Areas:**
- Cart page (US4)

**Test Cases Affected:**
- TC-US4-004
- TC-US4-005

**Recommendation:**  
Add subtotal display to cart page showing sum of all cart items.

---

### DEFECT-004: Empty Cart Checkout Allowed
**Severity:** Critical (P0)  
**Priority:** High  
**Status:** Open  
**User Story:** US5

**Description:**  
The requirement states "If the user has at least one product in the cart, the user should be able to continue to the checkout", implying that checkout should be prevented if cart is empty. However, the application allows users to proceed to checkout with an empty cart.

**Steps to Reproduce:**
1. Login to application
2. Navigate to cart without adding any products
3. Verify cart is empty
4. Click "Checkout" button
5. Observe that checkout process begins

**Expected Result:**  
Checkout button should be disabled or clicking it should show an error when cart is empty

**Actual Result:**  
User can proceed through entire checkout flow with empty cart

**Impact:**  
- Invalid orders can be created
- Waste of system resources
- Poor user experience
- Business logic violation

**Affected Areas:**
- Cart page (US4)
- Checkout flow (US5)

**Test Cases Affected:**
- TC-US5-002

**Recommendation:**  
Implement validation to prevent checkout when cart is empty. Disable checkout button or show error message.

---

### DEFECT-005: Cannot Add Same Product Multiple Times
**Severity:** Critical (P0)  
**Priority:** High  
**Status:** Open  
**User Story:** US3

**Description:**  
The requirement US3 states "It should be possible to add the same product to the cart more than once", however, the current implementation does not support this. Once a product is added, the "Add to Cart" button changes to "Remove", preventing the same product from being added again.

**Steps to Reproduce:**
1. Login and navigate to products page
2. Click "Add to Cart" on any product
3. Observe button changes to "Remove"
4. Try to add the same product again - not possible from this screen

**Expected Result:**  
User should be able to add the same product multiple times, increasing quantity

**Actual Result:**  
Product can only be added once; button changes to "Remove"

**Impact:**  
- Core functionality requirement not met
- Users cannot purchase multiple quantities of same item
- Significant business limitation

**Affected Areas:**
- Product listing page (US2/US3)
- Cart functionality (US4)

**Test Cases Affected:**
- TC-US3-004
- TC-US4-010

**Recommendation:**  
Implement quantity selector or allow multiple additions of same product with quantity aggregation in cart.

---

### DEFECT-006: Cart Quantity Display Limitation
**Severity:** Medium (P2)  
**Priority:** Medium  
**Status:** Open  
**User Story:** US4

**Description:**  
Related to DEFECT-005, the cart page shows quantity as "1" for each item with no ability to modify quantity. This limits users to purchasing only one of each product.

**Steps to Reproduce:**
1. Add products to cart
2. Navigate to cart page
3. Observe quantity field shows "1" with no option to modify

**Expected Result:**  
User should be able to modify quantity in cart or have quantity reflect multiple additions

**Actual Result:**  
Quantity is fixed at "1" per product

**Impact:**  
- Limited cart management functionality
- Cannot purchase multiple of same item
- Related to DEFECT-005

**Affected Areas:**
- Cart page (US4)

**Test Cases Affected:**
- TC-US4-010

**Recommendation:**  
Add quantity selector in cart with + / - buttons or input field. Update cart total when quantity changes.

---

### DEFECT-007: Product Sorting Labels Don't Match Requirement
**Severity:** Low (P1)  
**Priority:** Low  
**Status:** Open  
**User Story:** US2

**Description:**  
Minor observation: The requirement specifies sorting options as "Name (A>Z)" using > symbol, but actual implementation uses correct spelling "Name (A to Z)".

**Steps to Reproduce:**
1. Login and navigate to products page
2. Click on sort dropdown
3. Observe sort option labels

**Expected Result:**  
Labels match specification exactly

**Actual Result:**  
Labels use "to" instead of ">" symbol

**Impact:**  
- Cosmetic/documentation issue only
- Actual implementation is clearer and more user-friendly
- No functional impact

**Affected Areas:**
- Product listing page sort dropdown

**Test Cases Affected:**
- None (tests written to match actual implementation)

**Recommendation:**  
Update requirements documentation to match implementation. Current implementation is preferred as it's more readable.

---

## Defect Summary by User Story

| User Story | Defects | Critical | High | Medium | Low |
|------------|---------|----------|------|--------|-----|
| US1 | 0 | 0 | 0 | 0 | 0 |
| US2 | 2 | 0 | 1 | 0 | 1 |
| US3 | 3 | 1 | 0 | 1 | 1 |
| US4 | 3 | 0 | 1 | 1 | 0 |
| US5 | 2 | 1 | 1 | 0 | 0 |

---

## Defect Summary by Severity

| Severity | Count | Percentage | Defects |
|----------|-------|------------|---------|
| Critical (P0) | 2 | 28.6% | DEFECT-004, DEFECT-005 |
| High (P1) | 3 | 42.8% | DEFECT-001, DEFECT-003, DEFECT-007 |
| Medium (P2) | 2 | 28.6% | DEFECT-002, DEFECT-006 |
| Low (P3) | 0 | 0% | - |

---

## Critical Path Blockers

The following defects block critical business requirements:

1. **DEFECT-005** - Cannot add same product multiple times
   - **Impact:** Core e-commerce functionality missing
   - **Recommendation:** Must fix before production release

2. **DEFECT-004** - Empty cart checkout allowed
   - **Impact:** Invalid transactions possible
   - **Recommendation:** High priority fix for data integrity

---

## Recommendations

### Immediate Actions Required
1. Fix DEFECT-004 and DEFECT-005 (Critical priority)
2. Implement cart subtotal display (DEFECT-003)
3. Decide on currency standardization (DEFECT-001)

### Nice-to-Have Improvements
1. Add quantity management in cart (DEFECT-006)
2. Update documentation to match implementation (DEFECT-002, DEFECT-007)

### Process Improvements
1. Ensure requirements match actual implementation or flag discrepancies early
2. Implement acceptance criteria validation before test creation
3. Add business logic validation (e.g., empty cart prevention)
4. Consider implementing quantity selectors for better UX

---

## Conclusion

While the core login and product browsing functionality works as expected (US1, US2), there are significant gaps in cart and checkout functionality (US3, US4, US5) that prevent the application from meeting business requirements. The most critical issues relate to quantity management and empty cart validation.

**Overall Quality Assessment:** **65/100**
- Login functionality: 100% (Excellent)
- Product listing: 90% (Very Good - minor currency issue)
- Add to Cart: 60% (Fair - quantity limitation)
- Cart Management: 50% (Poor - missing features)
- Checkout: 70% (Good - except empty cart issue)

The application is functional for basic single-quantity purchases but requires significant enhancements to support real e-commerce use cases.
