# Playwright Test Automation - Docker Image
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Install Playwright browsers (already in base image, but ensure latest)
RUN npx playwright install --with-deps

# Set environment variables
ENV CI=true
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Create directories for reports and results
RUN mkdir -p playwright-report test-results allure-results screenshots

# Default command - run all tests
CMD ["npm", "test"]

# Alternative commands you can use:
# docker run <image> npm run test:smoke      # Run smoke tests only
# docker run <image> npm run test:ui         # Run in UI mode (requires display)
# docker run <image> npm run test:headed     # Run headed mode
# docker run <image> npm run test:chromium   # Run on Chromium only
