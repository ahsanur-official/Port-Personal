const functions = require("firebase-functions");
const admin = require("firebase-admin");
const twilio = require("twilio");

// Initialize Firebase Admin SDK
admin.initializeApp();

// Twilio credentials (set these in Firebase Cloud Functions config)
// firebase functions:config:set twilio.account_sid="your_account_sid" twilio.auth_token="your_auth_token" twilio.phone_number="+1234567890" twilio.admin_phone="+1234567890"
const twilioClient = twilio(
  functions.config().twilio.account_sid,
  functions.config().twilio.auth_token
);

/**
 * Cloud Function: Send SMS to admin when a new message is submitted
 * Triggered on: /messages/{messageId} (onCreate)
 */
exports.sendSmsNotification = functions.database
  .ref("messages/{messageId}")
  .onCreate(async (snapshot) => {
    const message = snapshot.val();

    if (!message) {
      console.log("No message data");
      return;
    }

    try {
      const adminPhone = functions.config().twilio.admin_phone;
      const twilioPhone = functions.config().twilio.phone_number;

      // Format SMS content
      const smsBody = `
New Portfolio Message:
From: ${message.name}
Email: ${message.email}
Type: ${message.type}
Timeline: ${message.timeline}
Message: ${message.message.substring(0, 100)}${message.message.length > 100 ? "..." : ""}

Check admin panel: http://localhost:8000/admin-messages.html
      `.trim();

      // Send SMS via Twilio
      const result = await twilioClient.messages.create({
        body: smsBody,
        from: twilioPhone,
        to: adminPhone,
      });

      console.log(`SMS sent successfully: ${result.sid}`);
      return result;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
    }
  });

/**
 * Cloud Function: Send SMS confirmation to user (optional)
 * Triggered on: /messages/{messageId} (onCreate)
 */
exports.sendUserConfirmationSms = functions.database
  .ref("messages/{messageId}")
  .onCreate(async (snapshot) => {
    const message = snapshot.val();

    if (!message || !message.userPhone) {
      console.log("No message data or user phone number");
      return;
    }

    try {
      const twilioPhone = functions.config().twilio.phone_number;

      const smsBody = `Hi ${message.name}! We received your message. I'll get back to you soon. Thank you for reaching out!`;

      const result = await twilioClient.messages.create({
        body: smsBody,
        from: twilioPhone,
        to: message.userPhone,
      });

      console.log(`Confirmation SMS sent: ${result.sid}`);
      return result;
    } catch (error) {
      console.error("Error sending confirmation SMS:", error);
      // Don't throw - this is optional
      return null;
    }
  });
