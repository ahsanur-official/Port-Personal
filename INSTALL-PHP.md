# 📦 PHP Installation Guide for Windows

## ✅ Method 1: XAMPP (RECOMMENDED - সবচেয়ে সহজ)

### Step 1: Download XAMPP
1. Visit: https://www.apachefriends.org/download.html
2. Download করুন: **XAMPP for Windows** (latest version)
3. File size: ~150MB

### Step 2: Install XAMPP
1. Downloaded file এ double-click করুন
2. "Next" click করতে থাকুন
3. Install location: `C:\xampp` (default রাখুন)
4. Install complete হতে 5-10 minutes লাগবে

### Step 3: Add PHP to System PATH
1. Windows Search এ type করুন: **Environment Variables**
2. "Edit the system environment variables" open করুন
3. "Environment Variables" button এ click করুন
4. "System variables" section এ "Path" select করুন
5. "Edit" button এ click করুন
6. "New" click করে add করুন: `C:\xampp\php`
7. "OK" → "OK" → "OK" click করুন
8. **সব terminal/cmd close করে আবার open করুন**

### Step 4: Verify Installation
```bash
php --version
```
যদি PHP version দেখায়, তাহলে সফল! ✅

### Step 5: Run Your Portfolio
```bash
run-server.bat
```
অথবা:
```bash
cd "C:\Users\msi\OneDrive\Desktop\Portfolio for me"
php -S localhost:8000
```

এরপর browser এ: `http://localhost:8000`

---

## ✅ Method 2: Standalone PHP (Advanced Users)

### Step 1: Download PHP
1. Visit: https://windows.php.net/download/
2. Download: **VS16 x64 Thread Safe** (Zip file)
3. Latest version: PHP 8.3.x recommended

### Step 2: Extract & Setup
1. Extract zip file to `C:\php`
2. Folder structure হবে: `C:\php\php.exe`

### Step 3: Add to PATH
1. Same steps as XAMPP (Step 3 above)
2. Add path: `C:\php`

### Step 4: Configure PHP
1. Copy `C:\php\php.ini-development` to `C:\php\php.ini`
2. এখন use করতে পারবেন

### Step 5: Test
```bash
php --version
cd "C:\Users\msi\OneDrive\Desktop\Portfolio for me"
php -S localhost:8000
```

---

## ⚡ Quick Start (After PHP Installation):

### Option A: Use run-server.bat
1. Double-click `run-server.bat`
2. Browser এ: `http://localhost:8000`
3. Done! ✅

### Option B: Manual Command
```bash
cd "C:\Users\msi\OneDrive\Desktop\Portfolio for me"
php -S localhost:8000
```

---

## 🌐 Using XAMPP Apache Server (Alternative):

### If you prefer Apache over PHP built-in server:

1. **Copy Portfolio to htdocs:**
   - Copy entire "Portfolio for me" folder
   - Paste to: `C:\xampp\htdocs\`

2. **Start Apache:**
   - Open XAMPP Control Panel
   - Click "Start" next to Apache

3. **Access Portfolio:**
   - Browser: `http://localhost/Portfolio for me/`
   - Admin: `http://localhost/Portfolio for me/admin-messages.html`

---

## 🆘 Troubleshooting:

### "php is not recognized" error persists?
**Solution:**
1. Close ALL terminal/cmd windows
2. Restart VS Code
3. Open new terminal
4. Try again: `php --version`

### Port 8000 already in use?
**Solution:**
```bash
php -S localhost:3000
```
Then visit: `http://localhost:3000`

### Permission denied?
**Solution:**
- Run cmd as Administrator
- Or check antivirus/firewall settings

---

## 📧 Without PHP Installation:

Your portfolio ALREADY works without PHP!

**How?**
1. Open `index.html` directly in browser
2. Fill contact form
3. Submit
4. Email client will open with pre-filled message
5. Click Send

**Or Deploy Online:**
- Push to GitHub
- Deploy to Netlify (free)
- Forms work automatically via Netlify Forms
- No PHP needed!

---

## 🎯 Recommended Approach:

### For Local Development:
✅ **Install XAMPP** (easiest, includes everything)

### For Production:
✅ **Deploy to Netlify** (free, no PHP needed, automatic forms)

---

## 📊 Comparison:

| Method | Difficulty | Setup Time | Best For |
|--------|-----------|------------|----------|
| XAMPP | ⭐ Easy | 10 min | Beginners |
| Standalone PHP | ⭐⭐ Medium | 5 min | Advanced |
| Email Fallback | ⭐ Easiest | 0 min | No installation |
| Netlify Deploy | ⭐ Easy | 15 min | Production |

---

## ✅ Next Steps After Installation:

1. Run: `check-php.bat` (to verify)
2. Run: `run-server.bat` (to start server)
3. Visit: `http://localhost:8000`
4. Test contact form
5. Check admin panel: `http://localhost:8000/admin-messages.html`

---

## 🚀 Quick Command Reference:

```bash
# Check PHP installation
php --version

# Start server
php -S localhost:8000

# Stop server
Ctrl + C

# Check if port is free
netstat -ano | findstr :8000
```

---

Need help? এখন `check-php.bat` run করুন!
