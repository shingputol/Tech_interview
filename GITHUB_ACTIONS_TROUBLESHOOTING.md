# GitHub Actions Troubleshooting Guide

## ✅ What I Just Did

1. ✅ Pushed a small change to trigger the workflow
2. ✅ Commit: `c587de1 - Trigger GitHub Actions workflow`
3. ✅ Branch: `main`

**Check now:** https://github.com/shingputol/Tech_interview/actions

---

## 🔍 If Workflow Still Doesn't Appear

### **Step 1: Enable GitHub Actions**

1. Go to your repository: https://github.com/shingputol/Tech_interview
2. Click **Settings** (top right)
3. Click **Actions** → **General** (left sidebar)
4. Under **Actions permissions**, ensure:
   - ✅ **"Allow all actions and reusable workflows"** is selected
5. Click **Save**

### **Step 2: Check Workflow Permissions**

Still in **Settings** → **Actions** → **General**:

1. Scroll to **Workflow permissions**
2. Select **"Read and write permissions"**
3. Check ✅ **"Allow GitHub Actions to create and approve pull requests"**
4. Click **Save**

### **Step 3: Verify Workflow File**

Check the workflow file exists on GitHub:
https://github.com/shingputol/Tech_interview/blob/main/.github/workflows/playwright.yml

If you see the file, it's correctly pushed! ✅

### **Step 4: Manual Trigger**

You can manually run the workflow:

1. Go to **Actions** tab
2. Click **"Playwright Tests"** on the left
3. Click **"Run workflow"** button (right side)
4. Select branch: `main`
5. Click **"Run workflow"**

---

## 📊 Expected Workflow Behavior

### **Timeline:**

```
0:00 - Push commit to GitHub
0:30 - Workflow appears in Actions tab
0:45 - Jobs start (3 parallel jobs)
5:00 - Jobs complete (chromium, firefox, webkit)
6:00 - Artifacts uploaded
7:00 - Allure report generated
8:00 - Report deployed to GitHub Pages
```

### **What You'll See:**

#### **In Actions Tab:**

```
Playwright Tests
├── Run Playwright Tests (chromium) - Running ⏳
├── Run Playwright Tests (firefox)  - Running ⏳
└── Run Playwright Tests (webkit)   - Running ⏳

Generate Allure Report - Queued ⏸️
```

#### **After Completion:**

```
Playwright Tests
├── Run Playwright Tests (chromium) - ✅ (56 passed, 5 failed)
├── Run Playwright Tests (firefox)  - ✅ (56 passed, 5 failed)
└── Run Playwright Tests (webkit)   - ✅ (56 passed, 5 failed)

Generate Allure Report - ✅
```

---

## 🐛 Common Issues & Solutions

### **Issue 1: "Actions not enabled"**

**Symptom:** Actions tab shows "Get started with GitHub Actions"

**Solution:**
1. Settings → Actions → General
2. Enable "Allow all actions"
3. Save and refresh

### **Issue 2: "Workflow doesn't run on push"**

**Symptom:** Pushed code but no workflow appears

**Solution:**
1. Verify branch name is `main` (not `master`)
2. Check workflow file is at `.github/workflows/playwright.yml`
3. Verify workflow YAML syntax (no errors)
4. Try manual trigger

### **Issue 3: "Workflow runs but fails immediately"**

**Symptom:** Jobs start but fail within seconds

**Solution:**
1. Click on failed job to see error
2. Common issues:
   - Missing `package.json` dependencies
   - Invalid Docker container
   - Syntax errors in workflow file

### **Issue 4: "No artifacts uploaded"**

**Symptom:** Workflow completes but no reports

**Solution:**
1. Check job logs for upload errors
2. Verify paths in workflow match project structure
3. Ensure `playwright-report/` exists after tests run

### **Issue 5: "GitHub Pages not deploying"**

**Symptom:** Workflow completes but no Allure report

**Solution:**
1. Enable GitHub Pages:
   - Settings → Pages
   - Source: `gh-pages` branch
   - Folder: `/ (root)`
2. Wait for deployment (can take 2-5 minutes)
3. Check for `gh-pages` branch in repository

---

## 🎯 Quick Verification Checklist

- [ ] GitHub Actions enabled (Settings → Actions)
- [ ] Workflow permissions set to "Read and write"
- [ ] Workflow file exists at `.github/workflows/playwright.yml`
- [ ] Latest commit pushed to `main` branch
- [ ] Actions tab shows workflow run
- [ ] Jobs are running or completed
- [ ] Artifacts available for download
- [ ] GitHub Pages enabled for `gh-pages` branch

---

## 📞 If Still Not Working

### **Check Workflow Syntax:**

```bash
# In your terminal
cd d:\automation\saucedemo-automation
cat .github\workflows\playwright.yml
```

Verify:
- Proper YAML indentation (use spaces, not tabs)
- Branch names match (`main` not `master`)
- No syntax errors

### **Force Re-trigger:**

```bash
# Make any small change
git commit --allow-empty -m "Re-trigger workflow"
git push origin main
```

### **View Workflow Run Logs:**

1. Go to Actions tab
2. Click on workflow run
3. Click on a job (e.g., "chromium")
4. View step-by-step logs
5. Look for error messages

---

## ✨ Success Indicators

You'll know it's working when you see:

1. ✅ Actions tab shows "Playwright Tests" workflow
2. ✅ Three parallel jobs running (chromium, firefox, webkit)
3. ✅ Green checkmarks after ~5-7 minutes
4. ✅ Artifacts section shows downloadable reports
5. ✅ README badge turns green: ![Playwright Tests](https://github.com/shingputol/Tech_interview/actions/workflows/playwright.yml/badge.svg)

---

## 🔗 Quick Links

- **Repository:** https://github.com/shingputol/Tech_interview
- **Actions:** https://github.com/shingputol/Tech_interview/actions
- **Settings:** https://github.com/shingputol/Tech_interview/settings/actions
- **Workflow File:** https://github.com/shingputol/Tech_interview/blob/main/.github/workflows/playwright.yml
- **GitHub Pages:** https://github.com/shingputol/Tech_interview/settings/pages

---

## 💡 Pro Tips

1. **First run takes longer** - Subsequent runs use cached dependencies
2. **Matrix jobs run in parallel** - Saves time compared to sequential
3. **Check badge status** - README badge shows real-time workflow status
4. **Download artifacts** - Reports available for 30 days
5. **Scheduled runs** - Workflow runs daily at 2 AM UTC automatically

---

**Current Status:** Workflow triggered with commit `c587de1`

**Check now:** https://github.com/shingputol/Tech_interview/actions 🚀
