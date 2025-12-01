# Complete GitHub Setup Script
# Run this to initialize git and push to GitHub in one go

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Setup - Tech Interview Repo" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Initialize Git
Write-Host "[1/7] Initializing Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  Git already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "  Git initialized" -ForegroundColor Green
}

# Step 2: Configure Git (optional - update with your info)
Write-Host ""
Write-Host "[2/7] Configuring Git..." -ForegroundColor Yellow
Write-Host "  Skipping (use your global git config)" -ForegroundColor Gray

# Step 3: Add all files
Write-Host ""
Write-Host "[3/7] Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "  All files staged" -ForegroundColor Green

# Step 4: Show what will be committed
Write-Host ""
Write-Host "[4/7] Files to be committed:" -ForegroundColor Yellow
git status --short

# Step 5: Create commit
Write-Host ""
Write-Host "[5/7] Creating commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Complete Playwright automation framework

- 61 automated tests (54 US specs + 7 E2E scenarios)
- Page Object Model architecture  
- Docker containerization support
- GitHub Actions CI/CD pipeline
- Allure reporting integration
- Cross-browser testing (Chromium, Firefox, WebKit)
- Two-tier testing strategy (strict vs pragmatic)
- Comprehensive documentation
- 5 intentional test failures showing requirement violations"

Write-Host "  Commit created" -ForegroundColor Green

# Step 6: Add remote
Write-Host ""
Write-Host "[6/7] Adding GitHub remote..." -ForegroundColor Yellow
$remoteExists = git remote get-url origin 2>$null
if ($remoteExists) {
    Write-Host "  Remote already exists: $remoteExists" -ForegroundColor Green
} else {
    git remote add origin https://github.com/shingputol/Tech_interview.git
    Write-Host "  Remote added: https://github.com/shingputol/Tech_interview.git" -ForegroundColor Green
}

# Step 7: Rename branch and push
Write-Host ""
Write-Host "[7/7] Pushing to GitHub..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "About to push to: https://github.com/shingputol/Tech_interview.git" -ForegroundColor Cyan
Write-Host "Press ENTER to continue or Ctrl+C to cancel..." -ForegroundColor Yellow
Read-Host

git push -u origin main

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Visit: https://github.com/shingputol/Tech_interview" -ForegroundColor White
Write-Host "2. Check Actions tab to see tests running" -ForegroundColor White  
Write-Host "3. Enable GitHub Pages for Allure reports" -ForegroundColor White
Write-Host ""
Write-Host "See READY_TO_PUSH.md for detailed instructions" -ForegroundColor Yellow
Write-Host ""
