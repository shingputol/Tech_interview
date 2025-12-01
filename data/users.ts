/**
 * Test data for user credentials
 * Based on Saucedemo available users
 */

export interface UserCredentials {
  username: string;
  password: string;
  description: string;
}

export const USERS = {
  STANDARD: {
    username: 'standard_user',
    password: 'secret_sauce',
    description: 'Standard user with full access'
  },
  LOCKED_OUT: {
    username: 'locked_out_user',
    password: 'secret_sauce',
    description: 'User that has been locked out'
  },
  PROBLEM: {
    username: 'problem_user',
    password: 'secret_sauce',
    description: 'User with problematic behavior'
  },
  PERFORMANCE_GLITCH: {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    description: 'User with performance issues'
  },
  ERROR: {
    username: 'error_user',
    password: 'secret_sauce',
    description: 'User that encounters errors'
  },
  VISUAL: {
    username: 'visual_user',
    password: 'secret_sauce',
    description: 'User with visual glitches'
  },
  INVALID: {
    username: 'invalid_user',
    password: 'wrong_password',
    description: 'Invalid credentials for negative testing'
  }
} as const;

/**
 * Valid password for all users
 */
export const VALID_PASSWORD = 'secret_sauce';

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  LOCKED_OUT: 'Epic sadface: Sorry, this user has been locked out.',
  INVALID_CREDENTIALS: 'Epic sadface: Username and password do not match any user in this service',
  USERNAME_REQUIRED: 'Epic sadface: Username is required',
  PASSWORD_REQUIRED: 'Epic sadface: Password is required',
  FIRST_NAME_REQUIRED: 'Error: First Name is required',
  LAST_NAME_REQUIRED: 'Error: Last Name is required',
  POSTAL_CODE_REQUIRED: 'Error: Postal Code is required'
} as const;
