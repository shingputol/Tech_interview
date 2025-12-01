# Step-by-Step Commands to Push to GitHub

## ✅ Run these commands in your PowerShell terminal

### Step 1: Verify you're in the correct directory
```powershell
cd d:\automation\saucedemo-automation
pwd
```

### Step 2: Check Git status (see what will be committed)
```powershell
git status
```

### Step 3: Add all files to Git
```powershell
git add .
```

### Step 4: Verify what's staged (should NOT include node_modules, test-results, etc.)
```powershell
git status
```
**Expected:** Should show .github/, pages/, tests/, config/, etc.
**Should NOT show:** node_modules/, playwright-report/, test-results/

### Step 5: Create initial commit
```powershell
git commit -m "Initial commit: Complete Playwright automation framework with Docker and CI/CD

- 61 automated tests (54 US specs + 7 E2E scenarios)
- Page Object Model architecture
- Docker containerization support
- GitHub Actions CI/CD pipeline
- Allure reporting integration
- Cross-browser testing (Chromium, Firefox, WebKit)
- Two-tier testing strategy (strict vs pragmatic)
- Comprehensive documentation"
```

### Step 6: Add GitHub remote
```powershell
git remote add origin https://github.com/shingputol/Tech_interview.git
```

### Step 7: Verify remote is added
```powershell
git remote -v
```
**Expected output:**
```
origin  https://github.com/shingputol/Tech_interview.git (fetch)
origin  https://github.com/shingputol/Tech_interview.git (push)
```

### Step 8: Rename branch to main (if needed)
```powershell
git branch -M main
```

### Step 9: Push to GitHub
```powershell
git push -u origin main
```

**Note:** You may be prompted for GitHub credentials. Use a Personal Access Token (PAT) if prompted for password.

### Step 10: Verify on GitHub
1. Open browser: https://github.com/shingputol/Tech_interview
2. Refresh the page
3. You should see all your files

### Step 11: Check GitHub Actions
1. Click the **Actions** tab
2. You should see "Playwright Tests" workflow running
3. Wait for it to complete (5-10 minutes)

### Step 12: Enable GitHub Pages (for Allure Reports)
1. Go to **Settings** → **Pages**
2. Under **Source**:
   - Branch: `gh-pages`
   - Folder: `/ (root)`
3. Click **Save**
4. After the workflow completes, visit: https://shingputol.github.io/Tech_interview/

---

## 🔧 If You Need to Make Changes After Pushing

```powershell
# Make your changes to files
# Then:

git add .
git commit -m "Description of changes"
git push
```

---

## ⚠️ Common Issues & Solutions

### Issue: "Repository not found"
**Solution:** Verify the repository exists at https://github.com/shingputol/Tech_interview
If not, create it on GitHub first (without initializing with README)

### Issue: "Permission denied"
**Solution:** 
1. Generate Personal Access Token:
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Generate new token with `repo` permissions
2. Use token as password when prompted

### Issue: "Remote already exists"
**Solution:**
```powershell
git remote remove origin
git remote add origin https://github.com/shingputol/Tech_interview.git
```

### Issue: "Branch diverged"
**Solution:**
```powershell
git pull origin main --rebase
git push -u origin main
```

---

## 📊 What Happens After Push?

1. **GitHub Actions triggers automatically**
2. **3 parallel jobs start** (one per browser)
3. **Tests run in Docker containers**
4. **Reports generated and uploaded as artifacts**
5. **Allure report deployed to GitHub Pages**

**Total time:** ~5-10 minutes for full execution

---

## ✅ Success Checklist

- [ ] Code pushed to GitHub
- [ ] Repository visible at https://github.com/shingputol/Tech_interview
- [ ] GitHub Actions workflow running (green check or in progress)
- [ ] All files present (check file tree on GitHub)
- [ ] No sensitive data committed (.env files excluded)
- [ ] No node_modules uploaded (should be in .gitignore)
- [ ] README.md displays correctly on repository home
- [ ] GitHub Actions badge appears in README

---

## 🎯 For Your Interview

**Share this link:** https://github.com/shingputol/Tech_interview

**Highlights to mention:**
- "Complete automation framework on GitHub"
- "CI/CD pipeline runs on every push"
- "Docker containerized for consistency"
- "Live reports available on GitHub Pages"
- "61 tests with 92% pass rate (5 intentional failures showing defects)"
