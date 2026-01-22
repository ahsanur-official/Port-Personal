# Quick Start Guide

## 🚀 Option 1: PHP Built-in Server (Recommended for Testing)

### Windows:
1. Make sure PHP is installed
2. Double-click `run-server.bat`
3. Open browser: `http://localhost:8000`

### Mac/Linux:
1. Open terminal in portfolio folder
2. Run: `bash run-server.sh`
3. Open browser: `http://localhost:8000`

---

## 🖥️ Option 2: XAMPP (Full Server Setup)

### Step 1: Install XAMPP
- Download from https://www.apachefriends.org/
- Install on your computer

### Step 2: Copy Portfolio
- Copy "Portfolio for me" folder to:
  - **Windows**: `C:\xampp\htdocs\`
  - **Mac**: `/Applications/XAMPP/htdocs/`
  - **Linux**: `/opt/lampp/htdocs/`

### Step 3: Start Apache
- Open XAMPP Control Panel
- Click "Start" next to Apache

### Step 4: Access Portfolio
- Portfolio: `http://localhost/Portfolio for me/index.html`
- Admin Panel: `http://localhost/Portfolio for me/admin-messages.html`

---

## 🔐 Admin Panel Login

**Default Password**: `admin123`

### Change Password:
1. Open `api/get-messages.php`
2. Find line 5: `$ADMIN_PASSWORD = 'admin123';`
3. Replace with your password: `$ADMIN_PASSWORD = 'your-new-password';`
4. Also change in `api/update-status.php` line 4

---

## 📊 Admin Panel Features

✅ View all contact form submissions
✅ Filter by status (Unread, Read, Replied)
✅ View statistics (total, unread, read, replied)
✅ Mark messages as read
✅ Reply via email
✅ Auto-refresh every 30 seconds

---

## 🌐 Deploy to Netlify (Production)

### Since Netlify doesn't support PHP:

**Option A: Use Netlify Forms (Easiest)**
```html
<form name="contact" netlify>
  <!-- Your form fields -->
</form>
```

**Option B: Use External PHP Host**
1. Sign up at:
   - InfinityFree.net (Free)
   - 000webhost.com (Free)
   - Railway.app (Free tier)
2. Upload `api/` folder to PHP host
3. Update `js/app.js` line ~415:
   ```javascript
   const response = await fetch('YOUR_PHP_HOST_URL/api/submit-contact.php', {
   ```

---

## 🛠️ Troubleshooting

### "PHP not found" error:
- Add PHP to your system PATH
- Or use XAMPP instead

### "Cannot write to database":
- Check `database/` folder permissions
- Make folder writable (right-click → Properties → Security)

### "Fetch failed":
- Make sure server is running
- Check browser console for errors
- Try http:// instead of https:// on localhost

---

## 📱 Testing Contact Form

1. Open portfolio
2. Scroll to Contact section
3. Click "Get in Touch" button
4. Fill form and submit
5. Go to Admin Panel: `http://localhost:8000/admin-messages.html`
6. Login with password
7. See your message in dashboard!

---

## 💾 Database Location

All messages stored in: `database/messages.json`

You can also manually view this file as it's plain JSON text.

---

## 🔒 Security Notes

- Always change default admin password
- Don't share admin password
- `.htaccess` protects `database/` folder
- All inputs are sanitized
- Email validation included
