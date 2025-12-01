# Pre-Push Verification Script
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pre-Push Verification Checklist" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check 1: Verify package.json exists
Write-Host "Checking package.json..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    Write-Host "  PASS: package.json found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: package.json not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 2: Verify GitHub Actions workflow exists
Write-Host "Checking GitHub Actions workflow..." -ForegroundColor Yellow
if (Test-Path ".github\workflows\playwright.yml") {
    Write-Host "  PASS: GitHub Actions workflow found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: GitHub Actions workflow not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 3: Verify Dockerfile exists
Write-Host "Checking Docker configuration..." -ForegroundColor Yellow
if (Test-Path "Dockerfile") {
    Write-Host "  PASS: Dockerfile found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Dockerfile not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 4: Verify .gitignore exists
Write-Host "Checking .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "  PASS: .gitignore found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: .gitignore not found!" -ForegroundColor Red
    $allGood = $false
}

# Check 5: Check documentation files
Write-Host "Checking documentation..." -ForegroundColor Yellow
$docCount = 0
if (Test-Path "README.md") { $docCount++ }
if (Test-Path "DEFECT_REPORT.md") { $docCount++ }
if (Test-Path "DOCKER.md") { $docCount++ }
if (Test-Path "GITHUB_SETUP.md") { $docCount++ }
Write-Host "  PASS: Found $docCount documentation files" -ForegroundColor Green

# Check 6: Verify test files exist
Write-Host "Checking test files..." -ForegroundColor Yellow
$testFiles = Get-ChildItem -Path "tests" -Filter "*.spec.ts" -ErrorAction SilentlyContinue
if ($testFiles.Count -gt 0) {
    Write-Host "  PASS: Found $($testFiles.Count) test files" -ForegroundColor Green
} else {
    Write-Host "  FAIL: No test files found!" -ForegroundColor Red
    $allGood = $false
}

# Final Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "  ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host "  Ready to push to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Next steps:" -ForegroundColor Cyan
    Write-Host "  1. git add ." -ForegroundColor White
    Write-Host "  2. git commit -m 'Initial commit'" -ForegroundColor White
    Write-Host "  3. git push -u origin main" -ForegroundColor White
} else {
    Write-Host "  SOME CHECKS FAILED!" -ForegroundColor Red
    Write-Host "  Please fix issues above" -ForegroundColor Red
}
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
