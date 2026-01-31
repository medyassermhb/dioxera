"use client";
import { useState } from 'react';
import Header from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Send, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Unable to send message.');
      }

      setStatus('success'); // Triggers the success UI view
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      console.error(error);
      setStatus('error');
      setErrorMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main className="bg-white pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            
            {/* Left: Contact Info */}
            <div>
              <h1 className="text-6xl font-black tracking-tighter mb-8">Get in <span className="text-brand-primary">Touch.</span></h1>
              <p className="text-gray-500 text-lg mb-12">Our global support team is available to assist with technical specs, shipping, and maintenance inquiries.</p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center text-brand-dark"><Mail size={20}/></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">Email</p><p className="font-bold">support@dioxera.com</p></div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center text-brand-dark"><MapPin size={20}/></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">Headquarters</p><p className="font-bold">Zug, Switzerland</p></div>
                </div>
              </div>
            </div>

            {/* Right: The Form or Success Message */}
            <div className="bg-gray-50 p-10 rounded-[2.5rem] border border-gray-100 relative min-h-[500px] flex flex-col justify-center">
              
              {status === 'success' ? (
                // SUCCESS STATE UI
                <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center text-brand-dark shadow-2xl shadow-brand-primary/30">
                    <CheckCircle size={48} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black tracking-tight mb-2">Message Received</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">Thank you for contacting Dioxera. Our support team will respond to your inquiry within 24 hours.</p>
                  </div>
                  <button 
                    onClick={() => setStatus('idle')} 
                    className="mt-4 text-sm font-bold text-brand-dark underline decoration-brand-primary decoration-2 underline-offset-4 hover:text-brand-primary transition"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                // FORM STATE UI
                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                  {status === 'error' && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold border border-red-100 animate-in slide-in-from-top-2">
                      <AlertCircle size={18} /> {errorMessage}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                      <input name="name" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                      <input name="email" type="email" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold" placeholder="john@example.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Subject</label>
                    <input name="subject" required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-bold" placeholder="How can we help?" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">Message</label>
                    <textarea name="message" rows={5} required className="w-full bg-white border border-gray-200 p-4 rounded-xl focus:outline-none focus:border-brand-primary transition font-medium resize-none" placeholder="Your message..."></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-5 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-brand-primary hover:text-brand-dark transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-brand-dark/20"
                  >
                    {loading ? <><Loader2 className="animate-spin" /> SENDING...</> : <>SEND MESSAGE <Send size={18}/></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}