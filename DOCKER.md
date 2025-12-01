# Docker Setup for Saucedemo Automation

This guide explains how to run the Playwright test automation framework using Docker.

## 🐳 Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## 📦 Quick Start

### **Option 1: Docker Compose (Recommended)**

```bash
# Build and run tests
docker-compose up --build

# Run specific test suite
docker-compose run playwright-tests npm run test:smoke
docker-compose run playwright-tests npm run test:e2e
docker-compose run playwright-tests npm run test:us1

# Run with Allure reporting server
docker-compose --profile reporting up
```

### **Option 2: Docker CLI**

```bash
# Build the image
docker build -t saucedemo-automation .

# Run all tests
docker run --rm saucedemo-automation

# Run specific test suite
docker run --rm saucedemo-automation npm run test:smoke

# Run with volume mounts to access reports
docker run --rm \
  -v $(pwd)/playwright-report:/app/playwright-report \
  -v $(pwd)/test-results:/app/test-results \
  saucedemo-automation
```

## 🎯 Common Commands

### **Run Tests**

```bash
# All tests
docker-compose run playwright-tests npm test

# Smoke tests only
docker-compose run playwright-tests npm run test:smoke

# Specific user story
docker-compose run playwright-tests npm run test:us1
docker-compose run playwright-tests npm run test:us2
docker-compose run playwright-tests npm run test:us3
docker-compose run playwright-tests npm run test:us4
docker-compose run playwright-tests npm run test:us5

# E2E scenarios
docker-compose run playwright-tests npm run test:e2e

# Specific browser
docker-compose run playwright-tests npm test -- --project=chromium
docker-compose run playwright-tests npm test -- --project=firefox
docker-compose run playwright-tests npm test -- --project=webkit
```

### **View Reports**

```bash
# Access HTML report (after tests run with volume mount)
# Open: ./playwright-report/index.html

# Start Allure server
docker-compose --profile reporting up allure-report
# Access at: http://localhost:5050
```

### **Clean Up**

```bash
# Stop containers
docker-compose down

# Remove volumes
docker-compose down -v

# Remove images
docker rmi saucedemo-automation:latest
```

## 🔧 Advanced Usage

### **Run with Custom Configuration**

```bash
# Override environment variables
docker run --rm \
  -e CI=true \
  -e BASE_URL=https://www.saucedemo.com \
  saucedemo-automation
```

### **Debug Mode**

```bash
# Run in interactive mode
docker run -it --rm saucedemo-automation /bin/bash

# Then inside container:
npm run test:ui
```

### **Run Specific Test File**

```bash
docker-compose run playwright-tests \
  npx playwright test tests/us1-login.spec.ts
```

### **Run with Tags**

```bash
# Run only @smoke tests
docker-compose run playwright-tests \
  npx playwright test --grep "@smoke"

# Run only P0 tests
docker-compose run playwright-tests \
  npx playwright test --grep "@P0"
```

## 📊 CI/CD Integration

### **GitHub Actions**

The `.github/workflows/playwright.yml` file is already configured for CI/CD.

To use:
1. Push code to GitHub
2. Tests run automatically on push/PR
3. Reports uploaded as artifacts
4. Allure report deployed to GitHub Pages

### **Jenkins**

```groovy
pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.40.0-focal'
        }
    }
    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
```

### **GitLab CI**

```yaml
image: mcr.microsoft.com/playwright:v1.40.0-focal

stages:
  - test

test:
  stage: test
  script:
    - npm ci
    - npm test
  artifacts:
    when: always
    paths:
      - playwright-report/
      - test-results/
    expire_in: 1 week
```

## 🐛 Troubleshooting

### **Issue: Tests timeout**
```bash
# Increase timeout in playwright.config.ts or use:
docker-compose run playwright-tests \
  npx playwright test --timeout=60000
```

### **Issue: Reports not accessible**
```bash
# Ensure volume mounts are correct
docker-compose run --rm \
  -v $(pwd)/playwright-report:/app/playwright-report \
  playwright-tests npm test
```

### **Issue: Out of memory**
```bash
# Increase Docker memory allocation in Docker Desktop settings
# Or run with fewer workers:
docker-compose run playwright-tests \
  npx playwright test --workers=2
```

## 📝 Notes

- **Base Image**: Uses official Microsoft Playwright image (includes all browsers)
- **Browser Path**: Browsers pre-installed at `/ms-playwright`
- **Reports**: Mounted as volumes for easy access from host
- **CI Mode**: Automatically enabled in container (retries enabled)
- **Parallel Execution**: Defaults to number of CPU cores in container

## 🚀 Best Practices

1. **Always use volume mounts** to access reports
2. **Run cleanup** after tests to save disk space
3. **Use tags** (@smoke, @P0) to run specific test subsets
4. **Cache npm modules** in CI/CD for faster builds
5. **Keep images updated** - rebuild regularly for security patches

## 📚 Additional Resources

- [Playwright Docker Guide](https://playwright.dev/docs/docker)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions with Docker](https://docs.github.com/en/actions/using-containerized-services)
