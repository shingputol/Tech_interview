# Saucedemo E-commerce Test Automation

[![Playwright Tests](https://github.com/shingputol/Tech_interview/actions/workflows/playwright.yml/badge.svg)](https://github.com/shingputol/Tech_interview/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-1.40-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Node.js](https://img.shields.io/badge/Node.js-16+-brightgreen)
![Test Coverage](https://img.shields.io/badge/Coverage-100%25-success)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)

A comprehensive test automation framework for the Saucedemo e-commerce platform built with Playwright and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests](#running-tests)
- [Test Reports](#test-reports)
- [Documentation](#documentation)
- [Test Coverage](#test-coverage)
- [Contributing](#contributing)

## 🎯 Overview

This project is a complete test automation solution for https://www.saucedemo.com/, covering all user stories from login to checkout completion.

**Assignment Objectives:**
- ✅ Analyze user stories and acceptance criteria
- ✅ Decompose into test cases with priority assignment
- ✅ Automate tests using modern framework
- ✅ Report defects and findings

## ✨ Features

- **Page Object Model (POM)** - Maintainable and scalable architecture
- **TypeScript** - Type-safe test code with IntelliSense
- **Cross-Browser Testing** - Chromium, Firefox, WebKit support
- **Parallel Execution** - Fast test execution
- **Multiple Reporters** - HTML, JSON, JUnit, Allure
- **Screenshots & Videos** - Automatic capture on failure
- **CI/CD Ready** - Configured for continuous integration
- **Comprehensive Coverage** - 67+ test cases, 74+ automated tests

## 📁 Project Structure

```
saucedemo-automation/
├── config/                    # Configuration files
├── data/                      # Test data
│   ├── users.ts              # User credentials
│   ├── products.ts           # Product information
│   └── checkout.ts           # Checkout data
├── pages/                     # Page Object Models
│   ├── LoginPage.ts          # Login page POM
│   ├── ProductsPage.ts       # Products page POM
│   ├── CartPage.ts           # Cart page POM
│   └── CheckoutPage.ts       # Checkout pages POM
├── tests/                     # Test specifications
│   ├── us1-login.spec.ts     # US1: Login tests
│   ├── us2-product-listing.spec.ts
│   ├── us3-add-to-cart.spec.ts
│   ├── us4-cart-page.spec.ts
│   ├── us5-checkout.spec.ts
│   └── e2e-scenarios.spec.ts # End-to-end scenarios
├── utils/                     # Utility functions
│   └── helpers.ts            # Common helpers
├── playwright-report/         # HTML test reports
├── test-results/              # Test execution results
├── screenshots/               # Test screenshots
├── playwright.config.ts       # Playwright configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
├── TEST_CASES.md             # Test case documentation
├── DEFECT_REPORT.md          # Defect analysis
├── TEST_SUMMARY.md           # Test summary report
└── README.md                 # This file
```

## 📦 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**

## 🚀 Installation

1. **Clone the repository** (if applicable) or navigate to project directory:
   ```powershell
   cd d:\automation\saucedemo-automation
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Install Playwright browsers:**
   ```powershell
   npx playwright install
   ```

## 🧪 Running Tests

### Run All Tests
```powershell
npm test
```

### Run Tests by User Story
```powershell
npm run test:us1    # User Login tests
npm run test:us2    # Product Listing tests
npm run test:us3    # Add to Cart tests
npm run test:us4    # Cart Page tests
npm run test:us5    # Checkout tests
npm run test:e2e    # End-to-End scenarios
```

### Run Tests by Priority
```powershell
npm run test:smoke        # Smoke tests (@smoke tag)
npm run test:regression   # Regression tests (@regression tag)
```

### Run Tests by Browser
```powershell
npm run test:chrome   # Run on Chromium
npm run test:firefox  # Run on Firefox
npm run test:safari   # Run on WebKit
```

### Debug Tests
```powershell
npm run test:headed   # Run with browser visible
npm run test:debug    # Run in debug mode
npm run test:ui       # Run in UI mode (interactive)
```

## 📊 Test Reports

### View HTML Report
```powershell
npm run report
```

### Generate Allure Report
```powershell
npm run allure:generate
npm run allure:open
```

Reports are automatically generated after test execution in:
- `playwright-report/` - HTML reports
- `test-results/` - JSON and JUnit reports
- `allure-results/` - Allure results

## 📚 Documentation

### Test Documentation
- **[TEST_CASES.md](TEST_CASES.md)** - Complete test case documentation with priorities
- **[DEFECT_REPORT.md](DEFECT_REPORT.md)** - Detailed defect analysis and findings
- **[TEST_SUMMARY.md](TEST_SUMMARY.md)** - Comprehensive test summary report

### User Stories Covered
- **US1:** User Login - 12 test cases
- **US2:** Product Listing Page - 12 test cases
- **US3:** Add to Cart - 9 test cases
- **US4:** Cart Page - 10 test cases
- **US5:** Checkout - 17 test cases
- **E2E:** Complete Scenarios - 4 test cases

## 📈 Test Coverage

| User Story | Test Cases | Automated | Coverage |
|------------|-----------|-----------|----------|
| US1: Login | 12 | 13 | 100% |
| US2: Products | 12 | 13 | 100% |
| US3: Add to Cart | 9 | 11 | 100% |
| US4: Cart | 10 | 12 | 100% |
| US5: Checkout | 17 | 18 | 100% |
| E2E Scenarios | 4 | 7 | 100% |
| **Total** | **64** | **74** | **100%** |

### Priority Coverage
- **P0 (Critical):** 29 test cases - 100% automated
- **P1 (High):** 24 test cases - 100% automated
- **P2 (Medium):** 10 test cases - 100% automated

## 🐛 Known Issues

7 defects were identified during testing:
- **2 Critical** - Empty cart checkout, quantity limitation
- **3 High** - Currency mismatch, missing subtotal, labeling
- **2 Medium** - Cart icon location, quantity display

See [DEFECT_REPORT.md](DEFECT_REPORT.md) for detailed information.

## 🏗️ Framework Architecture

### Design Patterns
- **Page Object Model (POM)** - Separation of page elements and test logic
- **Data-Driven Testing** - Centralized test data management
- **Factory Pattern** - Reusable page object creation
- **Helper Utilities** - Common functions for all tests

### Best Practices
- ✅ TypeScript for type safety
- ✅ Async/await for handling promises
- ✅ Descriptive test names
- ✅ Independent tests (no dependencies)
- ✅ Proper test data management
- ✅ Comprehensive assertions
- ✅ Error handling
- ✅ Logging and reporting

## 🔧 Configuration

### Playwright Configuration
Edit `playwright.config.ts` to customize:
- Test directory
- Browser configurations
- Timeouts
- Retry logic
- Reporter options
- Base URL
- Screenshots/video settings

### TypeScript Configuration
Edit `tsconfig.json` for TypeScript settings:
- Compiler options
- Path aliases
- Module resolution

## 🌐 Cross-Browser Testing

Tests run on multiple browsers by default:
- ✅ Chromium (Desktop Chrome)
- ✅ Firefox (Desktop Firefox)
- ✅ WebKit (Desktop Safari)
- ✅ Mobile Chrome (Pixel 5)
- ✅ Mobile Safari (iPhone 12)

## 🔄 CI/CD Integration

The framework is CI/CD ready with:
- Environment-based configuration
- Multiple report formats
- Retry on failure (CI mode)
- Parallel execution
- Artifact generation

Example GitHub Actions workflow:
```yaml
- name: Install dependencies
  run: npm ci
  
- name: Install Playwright Browsers
  run: npx playwright install --with-deps
  
- name: Run tests
  run: npm test
  
- name: Upload artifacts
  uses: actions/upload-artifact@v3
  with:
    name: test-results
    path: test-results/
```

## 📝 Test Execution Commands Reference

```powershell
# Installation
npm install                    # Install dependencies
npx playwright install        # Install browsers

# Running Tests
npm test                      # Run all tests
npm run test:headed          # Run with browser visible
npm run test:debug           # Debug mode
npm run test:ui              # Interactive UI mode

# Specific Tests
npm run test:us1             # Login tests
npm run test:us2             # Product listing tests
npm run test:us3             # Add to cart tests
npm run test:us4             # Cart page tests
npm run test:us5             # Checkout tests
npm run test:e2e             # E2E scenarios

# By Tag
npm run test:smoke           # Smoke tests only
npm run test:regression      # Regression tests

# By Browser
npm run test:chrome          # Chromium only
npm run test:firefox         # Firefox only
npm run test:safari          # WebKit only

# Reports
npm run report               # Open HTML report
npm run allure:generate      # Generate Allure report
npm run allure:open          # Open Allure report
```

## 🤝 Contributing

This is a test automation assignment project. For improvements:
1. Follow existing code patterns
2. Use TypeScript with proper typing
3. Update documentation
4. Add tests for new functionality
5. Follow POM principles

## 📞 Contact

For questions or issues regarding this technical assignment, please contact:
- **Email:** hsnell@bfinance.com (8am-5pm GMT)

## 📄 License

This project is created as a technical assignment for QA evaluation purposes.

---

## 🎯 Assignment Summary

**Time Investment:** ~4 hours (within half-day timebox)  
**Test Cases:** 67 identified  
**Automated Tests:** 74 implemented  
**Defects Found:** 7  
**Framework Status:** Production-ready ✅  
**Documentation:** Complete ✅  

**Quality Score:** 65/100
- Excellent login functionality
- Good product browsing
- Needs improvement in cart management

For detailed findings, see:
- [TEST_CASES.md](TEST_CASES.md) - Test case documentation
- [DEFECT_REPORT.md](DEFECT_REPORT.md) - Defect analysis
- [TEST_SUMMARY.md](TEST_SUMMARY.md) - Comprehensive summary

---

**Built with ❤️ using Playwright and TypeScript**
