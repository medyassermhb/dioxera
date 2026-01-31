export const emailStyles = {
  container: `font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #333333;`,
  header: `background-color: #000000; padding: 30px 20px; text-align: center;`,
  logo: `color: #ffffff; font-size: 24px; font-weight: 900; letter-spacing: 2px; text-decoration: none;`,
  body: `padding: 40px 20px; line-height: 1.6;`,
  h1: `color: #000000; font-size: 24px; font-weight: 800; margin-bottom: 20px;`,
  accent: `color: #CBDA08;`, // Your Brand Green
  box: `background-color: #f9f9f9; border-left: 4px solid #CBDA08; padding: 20px; margin: 20px 0; border-radius: 4px;`,
  button: `display: inline-block; background-color: #000000; color: #CBDA08; padding: 15px 30px; text-decoration: none; font-weight: bold; border-radius: 50px; margin-top: 20px;`,
  footer: `background-color: #f1f1f1; padding: 20px; text-align: center; font-size: 12px; color: #888888; margin-top: 40px;`
};

// 1. BANK TRANSFER (Action Required)
export const getBankTransferEmail = (name: string, orderId: string, total: number) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <a href="https://dioxera.com" style="${emailStyles.logo}">DIOXERA.</a>
    </div>
    <div style="${emailStyles.body}">
      <h1 style="${emailStyles.h1}">Order Received</h1>
      <p>Dear ${name},</p>
      <p>Thank you for choosing Dioxera. Your order <strong>#${orderId}</strong> has been reserved.</p>
      
      <div style="${emailStyles.box}">
        <h3 style="margin-top:0;">Payment Required</h3>
        <p>Please transfer <strong>€${total.toFixed(2)}</strong> to finalize your order.</p>
        <p><strong>Bank:</strong> Wise Business<br/>
        <strong>IBAN:</strong> BE89 1234 5678 9012<br/>
        <strong>BIC:</strong> WISEBEBB<br/>
        <strong>Reference:</strong> ${orderId}</p>
      </div>

      <p>Your official invoice is attached to this email as a PDF.</p>
      <p>Once we receive your payment, we will dispatch your order immediately.</p>
    </div>
    <div style="${emailStyles.footer}">
      <p>&copy; ${new Date().getFullYear()} Dioxera Technology. Zug, Switzerland.</p>
    </div>
  </div>
`;

// 2. STRIPE SUCCESS (Payment Confirmed)
export const getStripeSuccessEmail = (name: string, orderId: string, total: number) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <a href="https://dioxera.com" style="${emailStyles.logo}">DIOXERA.</a>
    </div>
    <div style="${emailStyles.body}">
      <h1 style="${emailStyles.h1}">Payment Confirmed</h1>
      <p>Dear ${name},</p>
      <p>We have successfully received your payment of <strong>€${total.toFixed(2)}</strong>.</p>
      <p>Your order <strong>#${orderId}</strong> is now being prepared for shipment.</p>
      
      <div style="${emailStyles.box}">
        <strong>What happens next?</strong><br/>
        You will receive a separate email with your tracking number within 24-48 hours.
      </div>

      <p>Your official tax invoice is attached to this email.</p>
      
      <a href="https://dioxera.com/account" style="${emailStyles.button}">View Order Status</a>
    </div>
    <div style="${emailStyles.footer}">
      <p>&copy; ${new Date().getFullYear()} Dioxera Technology. Zug, Switzerland.</p>
    </div>
  </div>
`;

// 3. ADMIN NOTIFICATION (New Sale)
export const getAdminOrderEmail = (orderId: string, total: number, method: string, customerEmail: string) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <span style="${emailStyles.logo}">NEW ORDER</span>
    </div>
    <div style="${emailStyles.body}">
      <h1 style="${emailStyles.h1}">€${total.toFixed(2)}</h1>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Customer:</strong> ${customerEmail}</p>
      <p><strong>Method:</strong> ${method.toUpperCase()}</p>
      
      <div style="${emailStyles.box}">
        ${method === 'bank_transfer' ? '⚠️ Check Wise account for payment.' : '✅ Paid via Stripe.'}
      </div>
    </div>
  </div>
`;

// 4. CONTACT FORM CONFIRMATION
export const getContactEmail = (name: string) => `
  <div style="${emailStyles.container}">
    <div style="${emailStyles.header}">
      <a href="https://dioxera.com" style="${emailStyles.logo}">DIOXERA.</a>
    </div>
    <div style="${emailStyles.body}">
      <h1 style="${emailStyles.h1}">Message Received</h1>
      <p>Hello ${name},</p>
      <p>Thank you for contacting Dioxera Support. We have received your inquiry and our team is reviewing it.</p>
      <p>You can expect a response within 24 hours.</p>
      <br/>
      <p>Best regards,<br/>The Dioxera Team</p>
    </div>
    <div style="${emailStyles.footer}">
      <p>Zug, Switzerland.</p>
    </div>
  </div>
`;