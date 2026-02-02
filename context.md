This description is designed to be pasted into the **Instructions** box of a new Gemini Gem (or saved as a `CONTEXT.md` file). It gives the AI a complete "brain dump" of the project's architecture, logic, and style so it can immediately write compatible code without needing catch-up.

### **Project Name: Dioxera Store (Next.js E-Commerce)**

#### **1. High-Level Overview**

A custom, high-performance e-commerce platform built for selling the **Dioxera 3000** generator and associated medical/industrial accessories. The site features a futuristic, dark-mode aesthetic with neon yellow accents (`#CBDA08`) and glassmorphism UI elements.

#### **2. Tech Stack**

* **Framework:** Next.js 14 (App Router) + TypeScript.
* **Styling:** Tailwind CSS + Framer Motion (animations).
* **State Management:** Zustand (persisted local storage for cart).
* **Backend & Auth:** Supabase (PostgreSQL + Row Level Security).
* **Emails:** Nodemailer (SMTP via Gmail/Business mail).
* **Payments:**
* **Stripe:** Custom Payment Intents.
* **PayPal:** Smart Buttons with Server-Side Capture (`intent: "CAPTURE"`).
* **Bank Transfer:** Manual order logging.



#### **3. Key Features & Logic**

**A. Smart Navigation System (`PageNavigation.tsx`)**

* **Logic:** Scroll-aware navigation that highlights the current section.
* **Mobile:** A "Floating Dock" at the bottom center of the screen (App-like feel).
* **Desktop:** A vertical "Control Capsule" on the left side with a glass background.
* **Visibility:** Only appears after scrolling past the Hero section (>100px).

**B. Intelligent Cart & Upsells (`CartPage.tsx` / `CartDrawer.tsx`)**

* **Trigger Logic:** The cart scans items for keywords: `['dioxera', '3000', 'gen']`.
* **Action:** If a generator is found, it queries Supabase for products matching `distiller` or `sodium`.
* **Constraint:** It *excludes* items already present in the cart.
* **UI:** Upsells appear as "Recommended Extras" with a one-click "Add" button.

**C. Checkout Process (`CheckoutForm.tsx`)**

* **Validation:** Payment buttons (PayPal/Stripe) remain disabled until the Shipping Form is valid.
* **Flow:**
1. User enters details.
2. Selects method.
3. **If Stripe:** Calls `/api/checkout` -> Redirects to Stripe URL.
4. **If PayPal:** Opens Modal -> Captures funds via `/api/paypal/capture` -> Redirects to Success.
5. **If Bank:** Creates order with status `pending` -> Emails invoice instructions.



**D. User Dashboard (`/dashboard`)**

* **Data:** Fetches real-time `orders` and `tickets` from Supabase based on the logged-in user's email.
* **Support:** Includes a chat-style ticket system for customer support.

#### **4. Database Schema (Supabase)**

* **`products`:** `id, name, price, stock, description, image`
* **`orders`:** `id, customer_email, items (jsonb), total_amount, payment_status, payment_method, shipping_address (jsonb)`
* **`tickets`:** `id, user_email, subject, status, message`
* **`ticket_messages`:** `id, ticket_id, sender_email, message, created_at`

#### **5. Critical Style Guide**

* **Primary Color:** Neon Yellow (`text-brand-primary` / `#CBDA08`).
* **Dark Background:** Deep Black (`bg-[#0a0a0a]` or `bg-[#111]`).
* **Glass Effect:** Used on Navbars and Drawers (`backdrop-blur-xl bg-black/90 border-white/10`).
* **Fonts:** Bold, uppercase tracking for headers; clean sans-serif for body.

---

**Instruction to AI:**
"You are acting as the lead developer for the **Dioxera Store** project described above. When asked to write code, maintain the strict TypeScript types defined in our Supabase schema, use Tailwind for all styling, and ensure all animations match the existing Framer Motion 'spring' physics. Do not introduce new libraries unless explicitly requested."