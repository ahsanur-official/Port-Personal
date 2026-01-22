# Portfolio Contact Form Backend

## Files Created:

### 1. Database Folder
- `database/messages.json` - Stores all contact form submissions
- `database/.htaccess` - Protects database from direct access

### 2. API Files
- `api/submit-contact.php` - Receives form submissions
- `api/get-messages.php` - Retrieves messages for admin
- `api/update-status.php` - Updates message status

### 3. Admin Panel
- `admin-messages.html` - View and manage messages

## Setup Instructions:

### For Local Testing (XAMPP/WAMP):
1. Install XAMPP or WAMP server
2. Copy portfolio folder to `htdocs` (XAMPP) or `www` (WAMP)
3. Start Apache server
4. Visit: `http://localhost/Portfolio for me/index.html`
5. Admin panel: `http://localhost/Portfolio for me/admin-messages.html`

### For Netlify Deployment:
Since Netlify doesn't support PHP, you have two options:

**Option A: Use Netlify Forms (Simplest)**
1. In your `index.html` form tag, add:
   ```html
   <form name="contact" netlify netlify-honeypot="bot-field" hidden>
   ```
2. Messages will appear in Netlify dashboard under Forms

**Option B: Use External Backend (Recommended for full control)**
1. Deploy PHP backend to services like:
   - InfinityFree (Free PHP hosting)
   - 000webhost (Free)
   - Heroku (Free tier)
   - Railway.app
2. Update `js/app.js` fetch URL to your PHP hosting URL

## Admin Panel Access:

**Default Password**: `admin123`

**To Change Password**:
1. Open `api/get-messages.php`
2. Change line 5: `$ADMIN_PASSWORD = 'your-new-password';`
3. Also update in `api/update-status.php` line 4

## Features:

✅ Saves all form submissions to JSON database
✅ Email notifications (uncomment in submit-contact.php)
✅ Admin dashboard to view messages
✅ Filter by status (unread, read, replied)
✅ Mark as read
✅ Reply via email
✅ Auto-refresh every 30 seconds
✅ Secure authentication
✅ Fallback to mailto if backend unavailable

## Database Structure:
Each message contains:
- Unique ID
- Timestamp
- Name, Email, Message
- Project Type, Timeline
- IP Address, User Agent
- Status (unread/read/replied)

## Security Features:
- Input sanitization
- Email validation
- Password-protected admin panel
- Database folder protected by .htaccess
- CORS headers configured
