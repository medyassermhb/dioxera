import nodemailer from 'nodemailer';

// 1. Load Credentials
const host = process.env.SMTP_HOST || "mail.infomaniak.com";
const port = Number(process.env.SMTP_PORT) || 587;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;
const adminEmail = process.env.ADMIN_EMAIL;

// --- FIX: DEFINE SITE URL ---
// This prioritizes the Vercel Env Var, then falls back to your domain, then localhost
const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "https://dioxera.com";

const LOGO_URL = "https://losdmrjfozfpvhuejdsp.supabase.co/storage/v1/object/public/dioxera/logo%20dioxera.png";
const BRAND_COLOR = "#CBDA08"; // Dioxera Neon/Yellow
const DARK_COLOR = "#111111";
const GRAY_BG = "#F4F4F4";

const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: port === 465, 
  auth: { user, pass },
});

// ==========================================
// FUNCTION 1: NEW ORDER CONFIRMATION
// ==========================================
export async function sendOrderConfirmation(order: any) {
  if (!user || !pass) return false;

  const orderIdShort = order.id.slice(0, 8).toUpperCase();
  const total = Number(order.total_amount).toFixed(2);
  const subtotal = (Number(order.total_amount) - Number(order.shipping_cost)).toFixed(2);
  const shipping = Number(order.shipping_cost).toFixed(2);
  const date = new Date(order.created_at).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
  
  // Format Payment Method (e.g., "bank_transfer" -> "Bank Transfer")
  const methodDisplay = order.payment_method === 'stripe' ? 'Credit Card (Stripe)' 
    : order.payment_method === 'paypal' ? 'PayPal' 
    : 'Bank Transfer (Wise)';

  // 1. Build Product Rows
  const itemsHtml = order.items.map((item: any) => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
        <span style="display: block; font-weight: bold; color: #333;">${item.name}</span>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; text-align: center; color: #666;">
        ${item.quantity}
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; text-align: right; font-family: monospace; font-size: 14px;">
        €${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  `).join('');

  // 2. Common Styles
  const containerStyle = `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;`;
  const headerStyle = `background-color: ${DARK_COLOR}; padding: 30px; text-align: center;`;
  const bodyStyle = `padding: 40px 30px; color: #444444; line-height: 1.6;`;
  const buttonStyle = `display: inline-block; background-color: ${BRAND_COLOR}; color: ${DARK_COLOR}; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;`;

  try {
    // ------------------------------------------
    // EMAIL A: CLIENT RECEIPT
    // ------------------------------------------
    const isBankTransfer = order.payment_method === 'bank_transfer';
    const clientHtml = `
      <!DOCTYPE html>
      <html>
      <body style="margin: 0; padding: 0; background-color: ${GRAY_BG};">
        <div style="${containerStyle}">
          <div style="${headerStyle}">
            <img src="${LOGO_URL}" alt="Dioxera" width="140" style="display: block; margin: 0 auto; border: 0;">
          </div>

          <div style="${bodyStyle}">
            <h1 style="margin: 0 0 10px; font-size: 24px; color: #111;">Order Confirmation</h1>
            <p style="margin: 0 0 30px; color: #888;">Order #${orderIdShort} &bull; ${date}</p>

            <p>Dear Customer,</p>
            <p>Thank you for choosing Dioxera. We have received your order and are preparing it for shipment.</p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px; margin-bottom: 30px;">
              <thead>
                <tr>
                  <th align="left" style="padding-bottom: 10px; border-bottom: 2px solid #111; color: #111; font-size: 12px; text-transform: uppercase;">Item</th>
                  <th align="center" style="padding-bottom: 10px; border-bottom: 2px solid #111; color: #111; font-size: 12px; text-transform: uppercase;">Qty</th>
                  <th align="right" style="padding-bottom: 10px; border-bottom: 2px solid #111; color: #111; font-size: 12px; text-transform: uppercase;">Total</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="2" style="padding-top: 15px; text-align: right; color: #666;">Subtotal:</td>
                  <td style="padding-top: 15px; text-align: right; font-family: monospace;">€${subtotal}</td>
                </tr>
                <tr>
                  <td colspan="2" style="text-align: right; color: #666;">Shipping:</td>
                  <td style="text-align: right; font-family: monospace;">${Number(shipping) === 0 ? 'FREE' : '€' + shipping}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 10px; text-align: right; font-weight: bold; color: #111;">TOTAL:</td>
                  <td style="padding-top: 10px; text-align: right; font-weight: bold; font-family: monospace; font-size: 18px;">€${total}</td>
                </tr>
              </tfoot>
            </table>
            
            <p style="font-size: 12px; color: #888; margin-top: -20px; text-align: right;">Paid via: ${methodDisplay}</p>

            ${isBankTransfer ? `
              <div style="background-color: #F8F9FA; border: 1px solid #E9ECEF; border-left: 4px solid ${BRAND_COLOR}; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin-top: 0; color: #111; font-size: 16px;">Payment Required (Bank Transfer)</h3>
                <p style="font-size: 13px; margin-bottom: 15px;">Please transfer the <strong>Total Amount</strong> to the account below using Wise or your bank. Your order will ship once funds clear.</p>
                
                <table width="100%" style="font-size: 13px; color: #555;">
                  <tr><td width="100" style="padding: 4px 0;"><strong>Bank:</strong></td><td>Wise (TransferWise)</td></tr>
                  <tr><td style="padding: 4px 0;"><strong>IBAN:</strong></td><td style="font-family: monospace; color: #111;">CH93 0000 0000 0000 0000 0</td></tr>
                  <tr><td style="padding: 4px 0;"><strong>BIC/SWIFT:</strong></td><td style="font-family: monospace; color: #111;">WISECHZZ</td></tr>
                  <tr><td style="padding: 4px 0;"><strong>Reference:</strong></td><td style="font-weight: bold; color: #000;">Order #${orderIdShort}</td></tr>
                </table>
              </div>
            ` : ''}

            <div style="text-align: center; margin-top: 40px;">
              <a href="${SITE_URL}/api/download-invoice?id=${order.id}" style="${buttonStyle}">Download Official Invoice</a>
              <p style="margin-top: 20px; font-size: 12px; color: #999;">
                Need help? Reply to this email or contact support@dioxera.com
              </p>
            </div>
          </div>

          <div style="background-color: #333; color: #777; padding: 20px; text-align: center; font-size: 11px;">
            <p>&copy; ${new Date().getFullYear()} Dioxera Technology. All rights reserved.</p>
            <p>Zug, Switzerland</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `"Dioxera Orders" <${user}>`,
      to: order.customer_email,
      subject: `Order Confirmation #${orderIdShort}`,
      html: clientHtml,
    });
    console.log(`✅ Client email sent to ${order.customer_email}`);

    // ------------------------------------------
    // EMAIL B: ADMIN NOTIFICATION
    // ------------------------------------------
    if (adminEmail) {
      const adminHtml = `
        <!DOCTYPE html>
        <html>
        <body style="background-color: #f0f0f0; padding: 20px; font-family: sans-serif;">
          <div style="max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            
            <div style="border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 20px;">
              <span style="background: ${isBankTransfer ? '#FF9800' : '#4CAF50'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
                ${isBankTransfer ? 'Awaiting Payment' : 'Paid'}
              </span>
              <h2 style="margin: 10px 0 0; color: #111;">New Order: #${orderIdShort}</h2>
              <p style="margin: 5px 0 0; color: #666;">${date}</p>
            </div>

            <table width="100%" style="margin-bottom: 20px;">
              <tr>
                <td style="color: #888; font-size: 12px;">CUSTOMER</td>
                <td style="text-align: right; font-weight: bold;">${order.customer_details.firstName} ${order.customer_details.lastName}</td>
              </tr>
              <tr>
                <td style="color: #888; font-size: 12px;">EMAIL</td>
                <td style="text-align: right;"><a href="mailto:${order.customer_email}" style="color: #111;">${order.customer_email}</a></td>
              </tr>
              <tr>
                <td style="color: #888; font-size: 12px; padding-top: 5px;">PAYMENT METHOD</td>
                <td style="text-align: right; font-weight: bold; padding-top: 5px; color: #000;">${methodDisplay}</td>
              </tr>
              <tr>
                <td style="color: #888; font-size: 12px; padding-top: 15px;">TOTAL VALUE</td>
                <td style="text-align: right; font-weight: bold; font-size: 18px; color: ${DARK_COLOR}; padding-top: 15px;">€${total}</td>
              </tr>
            </table>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; font-size: 13px; color: #555;">
              <strong>Shipping Address:</strong><br>
              ${order.customer_details.address}<br>
              ${order.customer_details.city}, ${order.customer_details.postalCode}<br>
              ${order.customer_details.country}
            </div>

            <div style="margin-top: 25px;">
              <h4 style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Items Ordered</h4>
              <ul style="padding-left: 20px; margin: 0; color: #444;">
                ${order.items.map((i: any) => `<li><strong>${i.quantity}x</strong> ${i.name}</li>`).join('')}
              </ul>
            </div>

            <p style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
              End of Report
            </p>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"Dioxera System" <${user}>`,
        to: adminEmail,
        subject: `[${orderIdShort}] New Order €${total} - ${order.customer_details.lastName}`,
        html: adminHtml,
      });
      console.log(`✅ Admin notification sent to ${adminEmail}`);
    }

    return true;

  } catch (error) {
    console.error("❌ EMAIL FAILED:", error);
    return false;
  }
}

// ==========================================
// FUNCTION 2: STATUS UPDATE NOTIFICATION
// ==========================================
export async function sendStatusUpdateEmail(order: any, newStatus: string) {
  if (!user || !pass) return false;

  const orderIdShort = order.id.slice(0, 8).toUpperCase();
  let subject = `Update on Order #${orderIdShort}`;
  let message = "";
  let color = "#333";

  // Customize message based on status
  switch (newStatus) {
    case 'paid':
      subject = `Payment Received: Order #${orderIdShort}`;
      message = "We have confirmed your payment. Your order is now being processed and prepared for shipment.";
      color = "#4CAF50"; // Green
      break;
    case 'shipped':
      subject = `Order Shipped! #${orderIdShort}`;
      message = "Great news! Your order has left our facility and is on its way to you.";
      color = "#2196F3"; // Blue
      break;
    case 'cancelled':
      subject = `Order Cancelled: #${orderIdShort}`;
      message = "Your order has been cancelled as requested or due to an issue. If a refund is due, it will be processed shortly.";
      color = "#F44336"; // Red
      break;
    default:
      return; // Don't send emails for 'pending'
  }

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; background: #fff;">
      <div style="background: #111; padding: 20px; text-align: center;">
         <img src="${LOGO_URL}" alt="Dioxera" width="120" style="display: block; margin: 0 auto;">
      </div>
      
      <div style="padding: 30px; border: 1px solid #eee;">
        <p>Dear Customer,</p>
        
        <div style="background-color: ${color}10; border-left: 5px solid ${color}; padding: 15px; margin: 20px 0;">
          <h2 style="color: ${color}; margin-top: 0; text-transform: uppercase;">${newStatus}</h2>
          <p style="margin-bottom: 0;">${message}</p>
        </div>

        <p><strong>Order ID:</strong> #${orderIdShort}</p>
        <p><strong>Total Amount:</strong> €${Number(order.total_amount).toFixed(2)}</p>
        
        <p style="margin-top: 30px;">
          <a href="${SITE_URL}/api/download-invoice?id=${order.id}" style="background: #111; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Order & Invoice</a>
        </p>
      </div>

      <div style="text-align: center; padding: 20px; font-size: 11px; color: #999; background: #F4F4F4;">
        &copy; ${new Date().getFullYear()} Dioxera Technology. Zug, Switzerland.
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Dioxera Updates" <${user}>`,
      to: order.customer_email,
      subject: subject,
      html: htmlContent,
    });
    console.log(`✅ Status email (${newStatus}) sent to ${order.customer_email}`);
    return true;
  } catch (error) {
    console.error("❌ Status Email Failed:", error);
    return false;
  }
}