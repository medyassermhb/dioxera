import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'mail.infomaniak.com',
  port: 587,
  secure: false, 
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS,
  },
  tls: { rejectUnauthorized: false }
});

// Update the Type Definition here to include attachments
interface MailOptions {
  to: string;
  subject: string;
  html: string;
  attachments?: any[]; // Allow attachments
}

export const sendMail = async ({ to, subject, html, attachments }: MailOptions) => {
  try {
    console.log(`[Mail] Sending to: ${to} (Has attachments: ${!!attachments})`);
    
    const info = await transporter.sendMail({
      from: `"Dioxera System" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      attachments, // Pass it to nodemailer
    });
    
    console.log('[Mail] Sent ID:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('[Mail] FAILED:', error);
    return { success: false, error };
  }
};