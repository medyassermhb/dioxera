"use client";

import { useState, useEffect, useRef } from 'react'; // Added useEffect, useRef
import { CheckCircle2, Copy, ShieldCheck, Download, ExternalLink, ArrowRight, Building2, FileText } from 'lucide-react';
import Link from 'next/link';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function SuccessContent({ id, isBankTransfer }: { id: string, isBankTransfer: boolean }) {
  const { language, clearCart } = useAppStore(); // Added clearCart
  // Safe dictionary access
  const t = (dictionary[language as keyof typeof dictionary] || dictionary.en).success;

  const [confirmed, setConfirmed] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Ref to prevent double-firing in strict mode
  const emailSentRef = useRef(false);

  // --- TRIGGER EMAIL & CLEAR CART ON MOUNT ---
  useEffect(() => {
    if (id && id !== "UNKNOWN" && !emailSentRef.current) {
      emailSentRef.current = true;
      
      // 1. Clear the cart (Order is done)
      clearCart();

      // 2. Call the API to send the email
      console.log("🚀 Triggering confirmation email...");
      fetch('/api/orders/trigger-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId: id }),
      })
      .then(res => res.json())
      .then(data => console.log("📧 Email Status:", data))
      .catch(err => console.error("❌ Email Failed:", err));
    }
  }, [id, clearCart]);
  // -------------------------------------------

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const IBAN = "CH93 0000 0000 0000 0000 0";
  const BIC = "WISECHZZ";
  const displayId = id !== "UNKNOWN" ? id.slice(0, 8).toUpperCase() : "...";

  return (
    <div className="max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      
      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>

      <h1 className="text-4xl font-black tracking-tighter mb-4 text-brand-dark">
        {isBankTransfer ? t.titleBank : t.titleCard}
      </h1>
      
      <p className="text-gray-500 text-lg mb-8">
        {t.orderRecorded.replace('#{id}', '')} <span className="font-mono font-bold text-brand-dark bg-gray-100 px-2 py-1 rounded">#{displayId}</span>
      </p>

      {/* --- SCENARIO A: STRIPE (Instant Download) --- */}
      {!isBankTransfer && id !== "UNKNOWN" && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl mb-10 animate-in slide-in-from-bottom-4">
           <h3 className="text-xl font-bold mb-2">{t.cardMessage}</h3>
           <p className="text-gray-500 mb-8 text-sm">A copy has been sent to your email.</p>
           
           <a 
             href={`/api/download-invoice?id=${id}`} 
             className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center justify-center gap-2 shadow-lg"
           >
             <Download size={20} /> {t.downloadBtn}
           </a>
        </div>
      )}

      {/* --- SCENARIO B: BANK TRANSFER --- */}
      {isBankTransfer && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl mb-10 text-left transition-all duration-500">
          
          {/* Header */}
          <div className="bg-brand-dark text-white p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Building2 size={24} className="text-brand-primary" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t.bankTitle}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  {confirmed ? t.reported : t.pending}
                </p>
              </div>
            </div>
            {confirmed && <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">{t.confirmedBadge}</div>}
          </div>
          
          <div className="p-8 space-y-6">
            {!confirmed ? (
              <>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t.bankInstructions} <br/>
                  <strong className="text-red-500">{t.crucial}:</strong> {t.useRef.split('#{ref}')[0]} <span className="font-mono bg-gray-100 px-1 rounded text-black">#{displayId}</span> {t.useRef.split('#{ref}')[1]}
                </p>

                <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <CopyRow label={t.copy.iban} value={IBAN} onCopy={() => handleCopy(IBAN, 'iban')} isCopied={copiedField === 'iban'} />
                  <CopyRow label={t.copy.bic} value={BIC} onCopy={() => handleCopy(BIC, 'bic')} isCopied={copiedField === 'bic'} />
                  <CopyRow label={t.copy.ref} value={`Order #${displayId}`} onCopy={() => handleCopy(displayId, 'ref')} isCopied={copiedField === 'ref'} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <a 
                    href="#" 
                    className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-brand-dark font-bold text-brand-dark hover:bg-gray-50 transition"
                  >
                    <ExternalLink size={18}/> {t.payWise}
                  </a>
                  <button 
                    onClick={() => setConfirmed(true)}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-dark text-white font-bold hover:bg-brand-primary hover:text-brand-dark transition shadow-lg"
                  >
                    <CheckCircle2 size={18}/> {t.iHavePaid}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 animate-in zoom-in duration-300">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} className="text-green-600"/>
                 </div>
                 <h3 className="text-2xl font-black text-brand-dark mb-2">{t.thankYou}</h3>
                 <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                   {t.notifyMessage}
                 </p>
                 
                 <a 
                   href={`/api/download-invoice?id=${id}`} 
                   className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark rounded-full font-bold text-lg hover:bg-white border border-brand-primary hover:border-gray-200 transition shadow-xl"
                 >
                   <FileText size={20} /> {t.downloadPdf}
                 </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Links */}
      <div className="flex justify-center gap-4">
        <Link href="/" className="px-8 py-4 bg-gray-100 rounded-full font-bold text-gray-600 hover:bg-gray-200 transition">
          {t.returnHome}
        </Link>
        <Link href="/shop" className="px-8 py-4 bg-white border border-gray-200 rounded-full font-bold hover:border-brand-dark transition flex items-center gap-2">
          {t.continueShopping} <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

function CopyRow({ label, value, onCopy, isCopied }: any) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 pb-3 last:border-0 last:pb-0">
      <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-3">
        <span className="font-mono font-bold text-gray-800">{value}</span>
        <button onClick={onCopy} className="text-gray-400 hover:text-brand-dark transition">
          {isCopied ? <CheckCircle2 size={16} className="text-green-500"/> : <Copy size={16}/>}
        </button>
      </div>
    </div>
  );
}