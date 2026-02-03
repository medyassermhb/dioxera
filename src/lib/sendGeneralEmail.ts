import nodemailer from 'nodemailer';

// Configuration
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const adminEmail = process.env.ADMIN_EMAIL;
const LOGO_URL = "https://losdmrjfozfpvhuejdsp.supabase.co/storage/v1/object/public/dioxera/logo%20dioxera.png";
const BRAND_COLOR = "#CBDA08";
const DARK_COLOR = "#111111";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "mail.infomaniak.com",
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: { user, pass },
});

// Helper: Basic Email HTML Template
const wrapHtml = (title: string, content: string) => `
  <!DOCTYPE html>
  <html>
  <body style="margin: 0; padding: 0; background-color: #F4F4F4; font-family: Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
      <div style="background-color: ${DARK_COLOR}; padding: 30px; text-align: center;">
        <img src="${LOGO_URL}" alt="Dioxera" width="140" style="border: 0;">
      </div>
      
      <div style="padding: 40px 30px; color: #444444; line-height: 1.6;">
        <h1 style="margin-top: 0; color: #111; font-size: 24px;">${title}</h1>
        ${content}
      </div>

      <div style="background-color: #333; color: #777; padding: 20px; text-align: center; font-size: 11px;">
        <p>&copy; ${new Date().getFullYear()} Dioxera Technology. Zug, Switzerland.</p>
      </div>
    </div>
  </body>
  </html>
`;

// 1. Send Newsletter Welcome Email
export async function sendNewsletterWelcome(email: string) {
  if (!user || !pass) return false;
  
  const content = `
    <p>Welcome to the inner circle.</p>
    <p>You have successfully subscribed to the Dioxera specialized newsletter. You will be the first to receive updates on:</p>
    <ul>
      <li>Gen-2 Automated Systems</li>
      <li>Protocol Updates & Research</li>
      <li>Exclusive Pre-order Opportunities</li>
    </ul>
    <p>Thank you for trusting us.</p>
  `;

  try {
    await transporter.sendMail({
      from: `"Dioxera Updates" <${user}>`,
      to: email,
      subject: "Welcome to Dioxera",
      html: wrapHtml("Subscription Confirmed", content),
    });
    return true;
  } catch (error) {
    console.error("Newsletter Email Failed:", error);
    return false;
  }
}

// 2. Handle Contact Form (User Receipt + Admin Alert)
interface ContactEmailData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  subject?: string;
}

export async function sendContactEmails(data: ContactEmailData) {
  if (!user || !pass) return false;

  const subjectLine = data.subject || "New Inquiry";

  try {
    // A. Send Receipt to User
    const userContent = `
      <p>Dear ${data.name},</p>
      <p>We have received your message regarding "<strong>${subjectLine}</strong>". Our team is reviewing your inquiry and will respond shortly.</p>
      <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid ${BRAND_COLOR}; margin: 20px 0;">
        <strong>Your Message:</strong><br/>
        <em style="color: #666;">"${data.message}"</em>
      </div>
    `;
    
    await transporter.sendMail({
      from: `"Dioxera Support" <${user}>`,
      to: data.email,
      subject: "We received your message",
      html: wrapHtml("Message Received", userContent),
    });

    // B. Send Alert to Admin
    if (adminEmail) {
      const adminContent = `
        <p><strong>From:</strong> ${data.name} (<a href="mailto:${data.email}">${data.email}</a>)</p>
        <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subjectLine}</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="font-size: 16px;">${data.message.replace(/\n/g, '<br>')}</p>
      `;

      await transporter.sendMail({
        from: `"Contact Form" <${user}>`,
        to: adminEmail,
        replyTo: data.email, 
        subject: `[CONTACT] ${subjectLine} - ${data.name}`,
        html: wrapHtml("New Inquiry", adminContent),
      });
    }

    return true;
  } catch (error) {
    console.error("Contact Emails Failed:", error);
    return false;
  }
}