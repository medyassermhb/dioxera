"use client";

import { useState } from 'react';
import { CheckCircle2, Copy, ShieldCheck, Download, ExternalLink, ArrowRight, Building2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function SuccessContent({ id, isBankTransfer }: { id: string, isBankTransfer: boolean }) {
  const [confirmed, setConfirmed] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const IBAN = "CH93 0000 0000 0000 0000 0";
  const BIC = "WISECHZZ";

  return (
    <div className="max-w-2xl mx-auto text-center animate-in fade-in duration-500">
      
      {/* Success Icon */}
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-100">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>

      <h1 className="text-4xl font-black tracking-tighter mb-4 text-brand-dark">
        {isBankTransfer ? 'Order Placed!' : 'Payment Successful!'}
      </h1>
      
      <p className="text-gray-500 text-lg mb-8">
        Order <span className="font-mono font-bold text-brand-dark bg-gray-100 px-2 py-1 rounded">#{id !== "UNKNOWN" ? id.slice(0, 8).toUpperCase() : "..."}</span> has been recorded.
      </p>

      {/* --- SCENARIO A: STRIPE (Instant Download) --- */}
      {!isBankTransfer && id !== "UNKNOWN" && (
        <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl mb-10 animate-in slide-in-from-bottom-4">
           <h3 className="text-xl font-bold mb-2">Thank you for your purchase.</h3>
           <p className="text-gray-500 mb-8">A confirmation email has been sent to you.</p>
           
           <a 
             href={`/api/download-invoice?id=${id}`} 
             className="w-full py-4 bg-brand-dark text-white rounded-xl font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center justify-center gap-2 shadow-lg"
           >
             <Download size={20} /> Download Official Invoice
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
                <h3 className="font-bold text-lg">Bank Transfer Details</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">
                  {confirmed ? "Payment Reported" : "Payment Pending"}
                </p>
              </div>
            </div>
            {confirmed && <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Confirmed</div>}
          </div>
          
          <div className="p-8 space-y-6">
            {!confirmed ? (
              <>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Please copy the details below or use the Wise link. <br/>
                  <strong className="text-red-500">Crucial:</strong> Use <span className="font-mono bg-gray-100 px-1 rounded text-black">#{id.slice(0, 8)}</span> as reference.
                </p>

                <div className="space-y-3 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <CopyRow label="IBAN" value={IBAN} onCopy={() => handleCopy(IBAN, 'iban')} isCopied={copiedField === 'iban'} />
                  <CopyRow label="BIC / SWIFT" value={BIC} onCopy={() => handleCopy(BIC, 'bic')} isCopied={copiedField === 'bic'} />
                  <CopyRow label="Reference" value={`Order #${id.slice(0, 8)}`} onCopy={() => handleCopy(id.slice(0,8), 'ref')} isCopied={copiedField === 'ref'} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <a 
                    href="#" 
                    className="flex items-center justify-center gap-2 py-4 rounded-xl border-2 border-brand-dark font-bold text-brand-dark hover:bg-gray-50 transition"
                  >
                    <ExternalLink size={18}/> Pay with Wise
                  </a>
                  <button 
                    onClick={() => setConfirmed(true)}
                    className="flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-dark text-white font-bold hover:bg-brand-primary hover:text-brand-dark transition shadow-lg"
                  >
                    <CheckCircle2 size={18}/> I Have Paid
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-8 animate-in zoom-in duration-300">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck size={32} className="text-green-600"/>
                 </div>
                 <h3 className="text-2xl font-black text-brand-dark mb-2">Thank you!</h3>
                 <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                   We have notified our team to look for your transfer. Your order will ship as soon as funds clear.
                 </p>
                 
                 <a 
                   href={`/api/download-invoice?id=${id}`} 
                   className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark rounded-full font-bold text-lg hover:bg-white border border-brand-primary hover:border-gray-200 transition shadow-xl"
                 >
                   <FileText size={20} /> Download Invoice PDF
                 </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer Links */}
      <div className="flex justify-center gap-4">
        <Link href="/" className="px-8 py-4 bg-gray-100 rounded-full font-bold text-gray-600 hover:bg-gray-200 transition">
          Return Home
        </Link>
        <Link href="/products" className="px-8 py-4 bg-white border border-gray-200 rounded-full font-bold hover:border-brand-dark transition flex items-center gap-2">
          Continue Shopping <ArrowRight size={18} />
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