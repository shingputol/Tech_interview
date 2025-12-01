/**
 * Test data for checkout information
 */

export interface CheckoutInfo {
  firstName: string;
  lastName: string;
  postalCode: string;
}

/**
 * Valid checkout information for testing
 */
export const CHECKOUT_INFO = {
  VALID: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: 'SW1A 1AA'
  },
  VALID_ALT: {
    firstName: 'Jane',
    lastName: 'Smith',
    postalCode: 'M1 1AE'
  },
  UK_POSTCODE_1: {
    firstName: 'Test',
    lastName: 'User',
    postalCode: 'EC1A 1BB'
  },
  UK_POSTCODE_2: {
    firstName: 'QA',
    lastName: 'Engineer',
    postalCode: 'W1A 0AX'
  }
} as const;

/**
 * Invalid checkout information for negative testing
 */
export const INVALID_CHECKOUT_INFO = {
  EMPTY_FIRST_NAME: {
    firstName: '',
    lastName: 'Doe',
    postalCode: 'SW1A 1AA'
  },
  EMPTY_LAST_NAME: {
    firstName: 'John',
    lastName: '',
    postalCode: 'SW1A 1AA'
  },
  EMPTY_POSTAL_CODE: {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: ''
  },
  ALL_EMPTY: {
    firstName: '',
    lastName: '',
    postalCode: ''
  }
} as const;

/**
 * Payment and shipping information (expected values)
 */
export const PAYMENT_INFO = {
  CARD_TYPE: 'SauceCard'
};

export const SHIPPING_INFO = {
  DELIVERY_TYPE: 'Free Pony Express Delivery!'
};
