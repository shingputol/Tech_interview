# GitHub Setup Guide

This guide will help you push this automation framework to GitHub and configure GitHub Actions for containerized test execution.

## 🚀 Quick Setup

### 1. **Initialize Git Repository (if not already done)**

```powershell
# Navigate to your project directory
cd d:\automation\saucedemo-automation

# Initialize git (if not already initialized)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Playwright automation framework with Docker and CI/CD"
```

### 2. **Connect to GitHub Repository**

```powershell
# Add remote repository
git remote add origin https://github.com/shingputol/Tech_interview.git

# Verify remote
git remote -v

# Push to GitHub (first time)
git branch -M main
git push -u origin main
```

### 3. **Enable GitHub Actions**

GitHub Actions will automatically run when you push code. No additional setup required!

The workflow file is already configured at: `.github/workflows/playwright.yml`

### 4. **Enable GitHub Pages (for Allure Reports)**

1. Go to your repository on GitHub: `https://github.com/shingputol/Tech_interview`
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
4. Click **Save**
5. After first test run, your Allure report will be available at:
   `https://shingputol.github.io/Tech_interview/`

## ✅ Verification Steps

### **Step 1: Check GitHub Actions**

1. Push your code to GitHub
2. Go to **Actions** tab in your repository
3. You should see the workflow running
4. Wait for completion (usually 5-10 minutes for all 3 browsers)

### **Step 2: View Test Results**

After the workflow completes:

1. Click on the completed workflow run
2. Scroll to **Artifacts** section
3. Download reports:
   - `playwright-report-chromium`
   - `playwright-report-firefox`
   - `playwright-report-webkit`
   - `allure-results-*`

### **Step 3: View Allure Report (Online)**

1. Wait for the `report` job to complete
2. Navigate to: `https://shingputol.github.io/Tech_interview/`
3. View comprehensive test results with trends and history

## 🐳 Containerized Execution

The GitHub Actions workflow uses Docker containers for consistent test execution:

```yaml
container:
  image: mcr.microsoft.com/playwright:v1.40.0-focal
```

**Benefits:**
- ✅ Consistent environment across all runs
- ✅ Pre-installed browsers (Chromium, Firefox, WebKit)
- ✅ No manual browser setup required
- ✅ Faster execution (no installation overhead)
- ✅ Isolated execution environment

## 🔧 Workflow Configuration

### **Triggers**

The workflow runs on:

1. **Push** to `main` or `develop` branches
2. **Pull Requests** to `main` or `develop`
3. **Scheduled** runs (daily at 2 AM UTC)
4. **Manual** trigger (workflow_dispatch)

### **Manual Trigger**

To run tests manually:

1. Go to **Actions** tab
2. Click **Playwright Tests** workflow
3. Click **Run workflow** button
4. Select branch and click **Run workflow**

### **Matrix Strategy**

Tests run in parallel across 3 browsers:
- Chromium
- Firefox
- WebKit

Each browser runs independently, so failures in one don't affect others.

## 📊 Understanding Test Results

### **Expected Behavior**

The framework uses a **two-tier testing strategy**:

#### **Tier 1: User Story Specs (54 tests)**
- ✅ **49 tests PASS** - Requirements met
- ❌ **5 tests FAIL** - Requirement violations (intentional)
  - DEFECT-001: Currency display ($ vs £) - 3 tests
  - DEFECT-004: Empty cart checkout - 1 test
  - DEFECT-005: Duplicate product purchase - 1 test

#### **Tier 2: E2E Scenarios (7 tests)**
- ✅ **7 tests PASS** - All user flows work
- Validates actual behavior (pragmatic approach)

### **Total: 61 tests → 56 pass, 5 fail (92% pass rate)**

This is **INTENTIONAL** - the 5 failing tests demonstrate requirement violations found during testing.

## 🛠️ Customization

### **Change Branch Names**

Edit `.github/workflows/playwright.yml`:

```yaml
on:
  push:
    branches: [ main, develop ]  # Change these
  pull_request:
    branches: [ main, develop ]  # Change these
```

### **Change Test Schedule**

```yaml
schedule:
  - cron: '0 2 * * *'  # Daily at 2 AM UTC
  # Examples:
  # - '0 */6 * * *'   # Every 6 hours
  # - '0 0 * * 1'     # Every Monday at midnight
  # - '0 9 * * 1-5'   # Weekdays at 9 AM
```

### **Run Specific Test Suites**

Modify the test command in workflow:

```yaml
- name: Run Playwright tests
  run: npm run test:smoke -- --project=${{ matrix.browser }}
  # Or: npm run test:e2e -- --project=${{ matrix.browser }}
  # Or: npm run test:us1 -- --project=${{ matrix.browser }}
```

### **Disable Browsers**

Remove browsers from matrix:

```yaml
strategy:
  matrix:
    browser: [chromium]  # Only Chromium
    # browser: [chromium, firefox]  # Chromium and Firefox only
```

## 🐛 Troubleshooting

### **Issue: Workflow not running**

**Solution:**
1. Check GitHub Actions is enabled: Settings → Actions → Allow all actions
2. Verify workflow file exists at: `.github/workflows/playwright.yml`
3. Check branch name matches workflow triggers

### **Issue: Tests failing in CI but passing locally**

**Solution:**
1. Check Docker container differences
2. Run locally with Docker: `docker-compose up --build`
3. Review environment variables in workflow
4. Check for timing issues (add waits if needed)

### **Issue: Allure report not deploying**

**Solution:**
1. Verify GitHub Pages is enabled
2. Check `gh-pages` branch exists after first run
3. Ensure GITHUB_TOKEN has proper permissions
4. Go to Settings → Actions → General → Workflow permissions → Read and write permissions

### **Issue: Artifacts not uploading**

**Solution:**
1. Verify paths in workflow match your project structure
2. Check disk space in runner
3. Review upload action version (using v3)

## 📝 Best Practices

### **Before Pushing**

```powershell
# Run tests locally first
npm test

# Run with Docker to match CI environment
docker-compose up --build

# Verify no sensitive data in code
git diff --cached

# Check .gitignore is working
git status
```

### **Commit Messages**

Use conventional commits:
```
feat: Add new test for checkout flow
fix: Correct selector for product sort dropdown
docs: Update README with Docker instructions
ci: Update GitHub Actions workflow
test: Add test for empty cart scenario
```

### **Branch Strategy**

```
main (production)
  ↑
develop (integration)
  ↑
feature/new-test-suite (feature branches)
```

## 🔒 Security

### **Secrets Management**

If you need to add secrets (API keys, passwords):

1. Go to Settings → Secrets and variables → Actions
2. Click **New repository secret**
3. Add secret (e.g., `TEST_PASSWORD`)
4. Use in workflow:

```yaml
env:
  PASSWORD: ${{ secrets.TEST_PASSWORD }}
```

### **Important:** Never commit sensitive data to the repository!

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright CI Guide](https://playwright.dev/docs/ci)
- [Docker in GitHub Actions](https://docs.github.com/en/actions/using-containerized-services)
- [GitHub Pages Setup](https://docs.github.com/en/pages)

## 🎯 Next Steps After Setup

1. ✅ Push code to GitHub
2. ✅ Verify workflow runs successfully
3. ✅ Enable GitHub Pages for Allure reports
4. ✅ Review test results and artifacts
5. ✅ Share repository link in your interview
6. ✅ Show live CI/CD pipeline during presentation

## 💡 Interview Talking Points

**Demonstrate your work:**
1. "Here's my repository with 61 automated tests"
2. "GitHub Actions runs tests automatically on every push"
3. "Tests run in Docker containers for consistency"
4. "Matrix strategy tests across 3 browsers in parallel"
5. "Allure reports deployed to GitHub Pages for easy access"
6. "Two-tier testing strategy catches requirement violations"
7. "5 failing tests intentionally show defects found"
8. "Complete CI/CD pipeline with artifacts and reporting"

This shows **production-level expertise** beyond basic automation! 🚀
