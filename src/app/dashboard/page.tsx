// src/app/dashboard/page.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  User, LogOut, Send, X, Download, MessageSquare,
  CreditCard, Wallet, Building2
} from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/layout/Navbar';
import Footer from '@/components/Footer';
import { useAppStore } from '@/lib/store';
import { dictionary } from '@/lib/dictionary';

export default function ClientDashboard() {
  const { language } = useAppStore();
  const t = dictionary[language].dashboard;

  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState('');
  
  // Ticket Creation
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  
  // Ticket Chat
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [ticketMessages, setTicketMessages] = useState<any[]>([]);
  const [chatReply, setChatReply] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { getData(); }, []);
  
  // Scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticketMessages]);

  const getData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return router.push('/login');
    setUserEmail(user.email || '');

    // Fetch Orders
    const { data: o } = await supabase
      .from('orders')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false });

    // Fetch Tickets
    const { data: t } = await supabase
      .from('tickets')
      .select('*')
      .eq('user_email', user.email)
      .order('created_at', { ascending: false });
    
    if (o) setOrders(o);
    if (t) setTickets(t);
    setLoading(false);
  };

  const openTicketChat = async (ticket: any) => {
    setSelectedTicket(ticket);
    const { data } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticket.id)
      .order('created_at', { ascending: true });
    setTicketMessages(data || []);
  };

  const sendChatReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatReply.trim()) return;

    const { data: msg } = await supabase.from('ticket_messages').insert({
      ticket_id: selectedTicket.id,
      sender_email: userEmail,
      message: chatReply
    }).select().single();

    if (msg) setTicketMessages([...ticketMessages, msg]);
    setChatReply('');
  };

  const submitNewTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('tickets').insert({
      user_email: userEmail, 
      type: 'support', 
      subject: ticketSubject, 
      message: ticketMessage, 
      status: 'open'
    });
    setShowTicketForm(false); 
    setTicketSubject(''); 
    setTicketMessage('');
    getData(); // Refresh list
  };

  if (loading) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F9F9F9] pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-end mb-12">
            <div>
               <h1 className="text-4xl font-black tracking-tighter text-[#111]">{t.title}</h1>
               <p className="text-gray-500 font-mono text-sm mt-2">{userEmail}</p>
            </div>
            <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-sm font-bold border rounded-full px-4 py-2 hover:bg-gray-100 flex gap-2 transition">
              <LogOut size={16} /> {t.signOut}
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEFT COL: ORDERS */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.orders.title}</h2>
              
              {orders.length === 0 ? (
                 <div className="bg-white p-10 rounded-3xl border border-dashed border-gray-300 text-center">
                    <p className="text-gray-400 font-bold">{t.orders.empty}</p>
                    <Link href="/shop" className="text-brand-dark font-bold underline mt-2 inline-block">{t.orders.startShopping}</Link>
                 </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm transition hover:shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="font-mono font-bold text-lg">#{order.id.slice(0, 8)}</span>
                        <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</div>
                      </div>
                      <Link href={`/api/download-invoice?id=${order.id}`} target="_blank" className="text-xs bg-black text-white px-3 py-1 rounded-full flex gap-1 items-center hover:bg-brand-primary hover:text-black transition">
                        <Download size={12}/> {t.orders.invoice}
                      </Link>
                    </div>
                    
                    <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                       <span className="text-sm font-bold text-gray-700">{t.orders.total}: €{order.total_amount}</span>
                       
                       {/* Payment Method & Status Badge */}
                       <div className="flex items-center gap-3">
                          {order.payment_method === 'stripe' && (
                             <span title={t.orders.paidCard}><CreditCard size={18} className="text-gray-400" /></span>
                          )}
                          {order.payment_method === 'paypal' && (
                             <span title={t.orders.paidPaypal}><Wallet size={18} className="text-[#003087]" /></span>
                          )}
                          {order.payment_method === 'bank_transfer' && (
                             <span title={t.orders.bankTransfer}><Building2 size={18} className="text-purple-600" /></span>
                          )}

                          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${
                            order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 
                            order.payment_status === 'shipped' ? 'bg-blue-100 text-blue-700' : 
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {order.payment_status}
                          </span>
                       </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT COL: TICKETS */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.support.title}</h2>
                <button onClick={() => setShowTicketForm(!showTicketForm)} className="text-xs bg-black text-white px-3 py-1 rounded-full font-bold hover:bg-gray-800 transition">
                  {showTicketForm ? t.support.cancel : t.support.newTicket}
                </button>
              </div>

              {/* New Ticket Form */}
              {showTicketForm && (
                <form onSubmit={submitNewTicket} className="bg-white p-6 rounded-3xl border shadow-lg animate-in fade-in zoom-in duration-300">
                  <input required value={ticketSubject} onChange={e => setTicketSubject(e.target.value)} className="w-full bg-gray-50 border rounded-lg p-3 text-sm mb-3 outline-none focus:border-brand-dark" placeholder={t.support.subjectPh} />
                  <textarea required value={ticketMessage} onChange={e => setTicketMessage(e.target.value)} className="w-full bg-gray-50 border rounded-lg p-3 text-sm mb-3 h-24 outline-none focus:border-brand-dark" placeholder={t.support.messagePh} />
                  <button className="w-full bg-brand-primary font-bold py-3 rounded-xl text-sm hover:brightness-110 transition">{t.support.submit}</button>
                </form>
              )}

              {/* Ticket List */}
              <div className="space-y-3">
                {tickets.map((ti) => (
                  <div key={ti.id} onClick={() => openTicketChat(ti)} className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm cursor-pointer hover:border-brand-primary transition group">
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="font-bold text-sm group-hover:text-brand-dark">{ti.subject}</h4>
                       <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                         ti.status === 'resolved' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                       }`}>
                        {/* Map status to translated string if possible, or fallback to raw status */}
                        {t.support.status[ti.status as keyof typeof t.support.status] || ti.status}
                       </span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">"{ti.message}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CHAT MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md h-[500px] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-sm truncate w-64">{selectedTicket.subject}</h2>
              <button onClick={() => setSelectedTicket(null)}><X size={20} className="text-gray-400 hover:text-black"/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
               {/* Original Ticket Description */}
               <div className="flex justify-end">
                 <div className="bg-brand-primary text-black p-3 rounded-2xl rounded-tr-none max-w-[85%] text-sm shadow-sm">
                   {selectedTicket.message}
                 </div>
               </div>
               
               {/* Chat History */}
               {ticketMessages.map((msg) => {
                 const isMe = msg.sender_email === userEmail;
                 return (
                   <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                     <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                       isMe ? 'bg-brand-primary text-black rounded-tr-none' : 'bg-white border text-gray-700 rounded-tl-none'
                     }`}>
                       {msg.message}
                     </div>
                   </div>
                 );
               })}
               <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendChatReply} className="p-4 border-t bg-white flex gap-2">
              <input 
                value={chatReply} 
                onChange={e => setChatReply(e.target.value)} 
                placeholder={t.support.chatPh} 
                className="flex-1 bg-gray-100 rounded-full px-4 text-sm outline-none focus:ring-2 focus:ring-brand-dark" 
              />
              <button className="p-2 bg-black text-white rounded-full hover:bg-gray-800 transition"><Send size={16}/></button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}