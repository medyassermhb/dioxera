"use client";

import { useCart } from "@/lib/store";
import { useState } from "react";
import { 
  Truck, User, MapPin, Smartphone, ToggleLeft, ToggleRight, 
  Lock, Building2, CheckCircle2, Globe, Loader2, CreditCard, Wallet 
} from "lucide-react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutForm() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  
  // -- Local State --
  const [loading, setLoading] = useState(false);
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'bank_transfer' | 'paypal'>('stripe');

  // -- Form Data State --
  const [formData, setFormData] = useState({
    email: '', phone: '',
    firstName: '', lastName: '',
    address: '', city: '', postalCode: '', country: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // -- Calculations --
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingCost = subtotal > 150 ? 0 : 25; 
  const total = subtotal + shippingCost;

  // -- Main Submission Handler (Stripe & Bank) --
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      items,
      customer: formData,
      email: formData.email,
      shipping_cost: shippingCost,
      total: total, 
      method: paymentMethod
    };

    try {
      if (paymentMethod === 'stripe') {
        const response = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        
        const result = await response.json();
        if (result.url) window.location.href = result.url;
        else alert(`Payment Error: ${result.error || "Please try again."}`);

      } else if (paymentMethod === 'bank_transfer') {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        
        const result = await response.json();
        if (result.success) {
          clearCart(); 
          router.push(`/success?method=bank_transfer&id=${result.orderId}`);
        } else {
          alert("Could not place order. Please check your connection.");
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  // -- PayPal Success Handler --
  const handlePayPalApprove = async (data: any, actions: any) => {
    try {
      const details = await actions.order.capture();
      setLoading(true);

      const res = await fetch('/api/paypal/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          details: details,
          items: items,
          total: total,
          shipping_cost: shippingCost,
          email: formData.email,
          customer: formData
        }),
      });

      const result = await res.json();
      if (result.success) {
        clearCart();
        router.push(`/success?method=paypal&id=${result.orderId}`);
      } else {
        alert("Payment successful but failed to save order. Contact support.");
      }
    } catch (err) {
      console.error("PayPal Error", err);
      alert("PayPal transaction failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID! }}>
      <form onSubmit={handleSubmit} className="space-y-12">
        
        {/* --- SECTION 1: CUSTOMER INFO --- */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
             <div className="w-8 h-8 bg-brand-secondary/20 rounded-lg flex items-center justify-center text-brand-dark"><User size={18}/></div>
             <h3 className="font-bold uppercase tracking-widest text-sm text-gray-800">Contact Details</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
             <div className="md:col-span-2">
               <label className="input-label">Email Address</label>
               <input required name="email" type="email" className="input-field" placeholder="you@example.com" onChange={handleInputChange} />
             </div>
             <div className="relative md:col-span-2">
                <label className="input-label">Phone Number</label>
                <Smartphone size={18} className="absolute top-[38px] left-4 text-gray-400 z-10" />
                <input required name="phone" type="tel" className="input-field pl-12" placeholder="+1 (555) 000-0000" onChange={handleInputChange} />
             </div>
          </div>
        </section>

        {/* --- SECTION 2: SHIPPING ADDRESS --- */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
             <div className="w-8 h-8 bg-brand-secondary/20 rounded-lg flex items-center justify-center text-brand-dark"><Truck size={18}/></div>
             <h3 className="font-bold uppercase tracking-widest text-sm text-gray-800">Shipping Address</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
             <div>
               <label className="input-label">First Name</label>
               <input required name="firstName" className="input-field" placeholder="John" onChange={handleInputChange} />
             </div>
             <div>
               <label className="input-label">Last Name</label>
               <input required name="lastName" className="input-field" placeholder="Doe" onChange={handleInputChange} />
             </div>
             
             <div className="md:col-span-2">
               <label className="input-label">Street Address</label>
               <input required name="address" className="input-field" placeholder="123 Innovation Blvd" onChange={handleInputChange} />
             </div>
             
             <div>
               <label className="input-label">City</label>
               <input required name="city" className="input-field" placeholder="New York" onChange={handleInputChange} />
             </div>
             
             <div>
               <label className="input-label">ZIP / Postal Code</label>
               <input required name="postalCode" className="input-field" placeholder="10001" onChange={handleInputChange} />
             </div>
             
             <div className="md:col-span-2">
               <label className="input-label flex items-center gap-2"><Globe size={12}/> Country / Region</label>
               <div className="relative">
                 <select required name="country" defaultValue="" className="input-field bg-white appearance-none cursor-pointer" onChange={handleInputChange}>
                    <option value="" disabled>Select Country...</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="CH">Switzerland</option>
                    <option value="MA">Morocco</option>
                 </select>
                 <div className="absolute right-4 top-10 pointer-events-none text-gray-400">▼</div>
               </div>
             </div>
          </div>
        </section>

        {/* --- SECTION 3: BILLING ADDRESS TOGGLE --- */}
        <section className="bg-gray-50 p-6 rounded-3xl border border-gray-200 transition-all">
           <div className="flex items-center justify-between cursor-pointer group" onClick={() => setSameAsShipping(!sameAsShipping)}>
              <div className="flex items-center gap-4">
                 <div className="bg-white p-2 rounded-lg border border-gray-200"><MapPin size={20} className="text-gray-500"/></div>
                 <div>
                    <span className="font-bold text-sm text-gray-900 block">Billing address is same as shipping</span>
                    <span className="text-xs text-gray-400">Uncheck to enter a different billing address</span>
                 </div>
              </div>
              <div className="transform group-hover:scale-110 transition-transform">
                 {sameAsShipping ? <ToggleRight size={40} className="text-brand-primary" fill="#CBDA08" /> : <ToggleLeft size={40} className="text-gray-300" />}
              </div>
           </div>

           {!sameAsShipping && (
              <div className="mt-8 grid md:grid-cols-2 gap-5 border-t border-gray-200 pt-8 animate-in fade-in slide-in-from-top-4">
                 <div className="md:col-span-2"><h4 className="font-bold text-sm uppercase tracking-widest mb-4">Billing Details</h4></div>
                 <div><input required name="billingFirstName" className="input-field" placeholder="First Name" /></div>
                 <div><input required name="billingLastName" className="input-field" placeholder="Last Name" /></div>
                 <div className="md:col-span-2"><input required name="billingAddress" className="input-field" placeholder="Billing Address" /></div>
                 <div><input required name="billingCity" className="input-field" placeholder="City" /></div>
                 <div><input required name="billingZip" className="input-field" placeholder="ZIP Code" /></div>
              </div>
           )}
        </section>

        {/* --- SECTION 4: PAYMENT METHOD --- */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-2 border-b border-gray-100">
             <div className="w-8 h-8 bg-brand-secondary/20 rounded-lg flex items-center justify-center text-brand-dark"><Lock size={18}/></div>
             <h3 className="font-bold uppercase tracking-widest text-sm text-gray-800">Payment Method</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <PaymentOption 
              selected={paymentMethod === 'stripe'} 
              onClick={() => setPaymentMethod('stripe')}
              title="Credit Card"
              icon={<CreditCard className="text-gray-600"/>}
              badges={["VISA", "MC", "AMEX"]}
            />
            <PaymentOption 
              selected={paymentMethod === 'paypal'} 
              onClick={() => setPaymentMethod('paypal')}
              title="PayPal"
              icon={<Wallet className="text-[#003087]"/>}
              badges={["PayPal", "Card"]}
            />
            <PaymentOption 
              selected={paymentMethod === 'bank_transfer'} 
              onClick={() => setPaymentMethod('bank_transfer')}
              title="Bank Transfer"
              icon={<Building2 className="text-gray-600"/>}
              badges={["Wise", "SWIFT"]}
            />
          </div>

          {paymentMethod === 'bank_transfer' && (
             <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 text-sm flex gap-4 items-start mb-6 animate-in fade-in">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600 mt-1"><Building2 size={16}/></div>
                <div>
                  <p className="font-bold text-blue-900 mb-1">Bank Transfer Instructions</p>
                  <p className="text-blue-700/80 leading-relaxed">
                    You will receive our IBAN and invoice via email immediately. Your order ships once funds clear.
                  </p>
                </div>
             </div>
          )}
        </section>

        {/* --- SUBMIT BUTTONS --- */}
        <div className="mt-8">
          {paymentMethod === 'paypal' ? (
             <div className="relative z-0">
               <PayPalButtons 
                 style={{ layout: "vertical", shape: "pill", height: 55, color: 'gold' }}
                 forceReRender={[total]}
                 createOrder={(data, actions) => {
                   if (!formData.email || !formData.address || !formData.country) {
                      alert("Please fill in all contact and shipping details above first.");
                      return Promise.reject(new Error("Missing fields"));
                   }
                   return actions.order.create({
                     intent: "CAPTURE", // <--- FIX IS HERE
                     purchase_units: [{
                       amount: { 
                         currency_code: "EUR", 
                         value: total.toFixed(2) 
                       },
                       description: "Dioxera Order"
                     }]
                   });
                 }}
                 onApprove={handlePayPalApprove}
               />
             </div>
          ) : (
             <button 
               type="submit"
               disabled={loading || items.length === 0}
               className="w-full py-6 bg-brand-dark text-white rounded-full font-black text-xl flex items-center justify-center gap-3 hover:bg-brand-primary hover:text-brand-dark transition-all disabled:opacity-50 shadow-xl hover:shadow-2xl hover:shadow-brand-dark/20 active:scale-[0.99] duration-300"
             >
               {loading ? (
                 <><Loader2 className="animate-spin" /> PROCESSING...</>
               ) : (
                 <>
                   {paymentMethod === 'stripe' ? `PAY €${total.toFixed(2)}` : "PLACE ORDER"} 
                   {paymentMethod === 'stripe' ? <Lock size={20}/> : <CheckCircle2 size={20}/>}
                 </>
               )}
             </button>
          )}
        </div>

        <style jsx>{`
          .input-label { font-size: 0.65rem; font-weight: 800; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em; margin-left: 0.25rem; margin-bottom: 0.5rem; display: block; }
          .input-field { width: 100%; padding: 1rem 1.25rem; background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 1rem; outline: none; transition: all 0.2s; font-weight: 500; color: #1F2937; }
          .input-field:focus { background-color: #FFFFFF; border-color: #CBDA08; box-shadow: 0 0 0 4px rgba(203, 218, 8, 0.15); }
        `}</style>
      </form>
    </PayPalScriptProvider>
  );
}

function PaymentOption({ selected, onClick, title, icon, badges }: any) {
  return (
    <div 
      onClick={onClick}
      className={`relative p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col justify-between h-32 group ${
        selected 
          ? 'border-brand-primary bg-brand-primary/5 shadow-lg shadow-brand-primary/10' 
          : 'border-gray-100 bg-white hover:border-gray-300'
      }`}
    >
      <div className="flex justify-between items-start">
        <span className={`font-bold text-sm ${selected ? 'text-brand-dark' : 'text-gray-500'}`}>{title}</span>
        {selected ? <CheckCircle2 className="text-brand-primary" fill="currentColor" size={20}/> : icon}
      </div>
      <div className="flex gap-1 mt-auto">
         {badges.map((b: string) => (
           <div key={b} className="bg-gray-100 px-2 py-1 rounded text-[9px] font-bold text-gray-500 uppercase">{b}</div>
         ))}
      </div>
    </div>
  );
}