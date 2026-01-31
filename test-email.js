require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587, // HARDCODED FIX FOR TEST
  secure: false, // HARDCODED FIX FOR TEST
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function main() {
  try {
    console.log(`Connecting to ${process.env.SMTP_HOST} on Port 587...`);
    
    const info = await transporter.sendMail({
      from: `"Dioxera Test" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email via Port 587",
      text: "If you read this, Port 587 is working perfectly!",
    });

    console.log("SUCCESS! Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();