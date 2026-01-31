"use client";

import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Package, Users, MessageSquare, Download, X, Send,
  CheckCircle, Clock, Truck, RefreshCw, LogOut, FileText,
  CreditCard, Wallet, Building2 
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'orders' | 'tickets' | 'subscribers'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  
  // Detail Views State
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [ticketMessages, setTicketMessages] = useState<any[]>([]);
  const [replyText, setReplyText] = useState('');
  
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // --- INITIAL LOAD ---
  useEffect(() => {
    checkUser();
    fetchData();
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ticketMessages]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== "m.mymaouhoubi@mam-nature.com") {
      router.push('/login');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const { data: o } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    const { data: t } = await supabase.from('tickets').select('*').order('created_at', { ascending: false });
    const { data: s } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
    
    if (o) setOrders(o);
    if (t) setTickets(t);
    if (s) setSubscribers(s);
    setLoading(false);
  };

  // --- ORDER LOGIC ---
  const updateOrderStatus = async (id: string, newStatus: string) => {
    // 1. Optimistic UI Update (Change it on screen immediately)
    const updatedOrders = orders.map(o => o.id === id ? { ...o, payment_status: newStatus } : o);
    setOrders(updatedOrders);
    
    // Also update the modal view if it's open
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, payment_status: newStatus });
    }

    try {
      // 2. Call API to update DB and Send Email
      const res = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: id,
          newStatus: newStatus,
          adminEmail: "m.mymaouhoubi@mam-nature.com" // Must match your .env ADMIN_EMAIL
        })
      });

      if (!res.ok) throw new Error("Failed to update");
      console.log("✅ Status updated & Email sent");

    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update status. Check console.");
      // Revert UI on error
      fetchData(); 
    }
  };

  // --- TICKET LOGIC ---
  const openTicket = async (ticket: any) => {
    setSelectedTicket(ticket);
    // Fetch messages
    const { data } = await supabase
      .from('ticket_messages')
      .select('*')
      .eq('ticket_id', ticket.id)
      .order('created_at', { ascending: true });
    setTicketMessages(data || []);
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    // 1. Insert Message
    const { data: msg } = await supabase.from('ticket_messages').insert({
      ticket_id: selectedTicket.id,
      sender_email: "m.mymaouhoubi@mam-nature.com",
      message: replyText
    }).select().single();

    if (msg) setTicketMessages([...ticketMessages, msg]);
    setReplyText('');

    // 2. Update Ticket Status to "In Progress" if it was Open
    if (selectedTicket.status === 'open') {
      updateTicketStatus(selectedTicket.id, 'in_progress');
    }
  };

  const updateTicketStatus = async (id: string, newStatus: string) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
    if (selectedTicket) setSelectedTicket({ ...selectedTicket, status: newStatus });
    await supabase.from('tickets').update({ status: newStatus }).eq('id', id);
  };

  if (loading) return <div className="min-h-screen bg-[#111] flex items-center justify-center"><RefreshCw className="text-brand-primary animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans relative">
      
      {/* Header */}
      <header className="bg-[#111] text-white sticky top-0 z-20 shadow-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-black font-bold">D</div>
            <span className="font-bold tracking-tight">ADMIN <span className="text-gray-500">PANEL</span></span>
          </div>
          <button onClick={() => supabase.auth.signOut().then(() => router.push('/'))} className="text-xs font-bold uppercase hover:text-brand-primary flex items-center gap-2">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-8">
        
        {/* TABS */}
        <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-sm border border-gray-200 w-fit">
          <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} icon={<Package size={16}/>} label="Orders" count={orders.length} />
          <TabButton active={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} icon={<MessageSquare size={16}/>} label="Tickets" count={tickets.filter(t => t.status === 'open').length} />
          <TabButton active={activeTab === 'subscribers'} onClick={() => setActiveTab('subscribers')} icon={<Users size={16}/>} label="Users" count={subscribers.length} />
        </div>

        {/* === TAB 1: ORDERS === */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                    <td className="p-4 font-mono text-xs">#{order.id.slice(0, 8)}</td>
                    <td className="p-4 font-bold">
                      {order.customer_email}
                      {/* Payment Method Icons */}
                      <div className="flex items-center gap-1 mt-1">
                        {order.payment_method === 'stripe' && <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded flex items-center gap-1 text-gray-500"><CreditCard size={10}/> Stripe</span>}
                        {order.payment_method === 'paypal' && <span className="text-[10px] bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 text-blue-600"><Wallet size={10}/> PayPal</span>}
                        {order.payment_method === 'bank_transfer' && <span className="text-[10px] bg-purple-50 px-2 py-0.5 rounded flex items-center gap-1 text-purple-600"><Building2 size={10}/> Wire</span>}
                      </div>
                    </td>
                    <td className="p-4 font-mono">€{order.total_amount}</td>
                    <td className="p-4">
                       <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold ${
                         order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 
                         order.payment_status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                       }`}>{order.payment_status}</span>
                    </td>
                    <td className="p-4 text-right">
                       <button className="text-brand-dark font-bold text-xs hover:underline">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* === TAB 2: TICKETS === */}
        {activeTab === 'tickets' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {tickets.map((ticket) => (
                <div key={ticket.id} onClick={() => openTicket(ticket)} className="p-6 hover:bg-gray-50 transition cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full ${ticket.status === 'open' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                      <h3 className="font-bold text-gray-900 group-hover:text-brand-dark">{ticket.subject}</h3>
                    </div>
                    <span className="text-xs text-gray-400">{new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-1">{ticket.message}</p>
                  <p className="text-xs text-gray-400 mt-2">From: {ticket.user_email}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === TAB 3: SUBSCRIBERS === */}
        {activeTab === 'subscribers' && (
           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
             <div className="grid md:grid-cols-3 gap-4">
                {subscribers.map((sub) => (
                  <div key={sub.id} className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm font-mono text-gray-600">
                    {sub.email}
                  </div>
                ))}
             </div>
           </div>
        )}
      </main>

      {/* === ORDER DETAIL MODAL === */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-0 md:p-6 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h2 className="font-black text-xl">Order #{selectedOrder.id.slice(0, 8)}</h2>
              <button onClick={() => setSelectedOrder(null)}><X size={24} className="text-gray-400 hover:text-black"/></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-8">
              {/* Status Control */}
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-200">
                <span className="text-xs font-bold uppercase text-gray-400">Current Status</span>
                <select 
                  value={selectedOrder.payment_status}
                  onChange={(e) => updateOrderStatus(selectedOrder.id, e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-bold uppercase outline-none focus:border-brand-dark cursor-pointer"
                >
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Items */}
              <div>
                <h3 className="font-bold mb-3 flex items-center gap-2"><Package size={16}/> Items</h3>
                <div className="border border-gray-100 rounded-xl overflow-hidden">
                  {selectedOrder.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between p-3 border-b last:border-0 hover:bg-gray-50">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-mono">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between p-3 bg-gray-50 font-bold">
                    <span>Total</span>
                    <span>€{selectedOrder.total_amount}</span>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2"><Users size={16}/> Customer</h3>
                  <div className="text-sm text-gray-600">
                    <p>{selectedOrder.customer_email}</p>
                    <p>{selectedOrder.customer_details?.firstName} {selectedOrder.customer_details?.lastName}</p>
                    <p className="mt-2 text-xs text-gray-400 uppercase font-bold">Paid via {selectedOrder.payment_method}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold mb-3 flex items-center gap-2"><Truck size={16}/> Shipping</h3>
                  <div className="text-sm text-gray-600">
                    <p>{selectedOrder.customer_details?.address}</p>
                    <p>{selectedOrder.customer_details?.city}, {selectedOrder.customer_details?.postalCode}</p>
                    <p>{selectedOrder.customer_details?.country}</p>
                  </div>
                </div>
              </div>

              <a 
                href={`/api/download-invoice?id=${selectedOrder.id}`} 
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white py-4 rounded-xl font-bold hover:bg-black transition"
              >
                <Download size={18} /> Download Official Invoice PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* === TICKET CHAT MODAL === */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end p-0 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="font-bold text-sm truncate w-48">{selectedTicket.subject}</h2>
                <div className="flex items-center gap-2 mt-1">
                   <span className="text-xs text-gray-500">{selectedTicket.user_email}</span>
                   <select 
                     value={selectedTicket.status}
                     onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                     className="text-[10px] uppercase font-bold bg-white border rounded px-1"
                   >
                     <option value="open">Open</option>
                     <option value="resolved">Resolved</option>
                   </select>
                </div>
              </div>
              <button onClick={() => setSelectedTicket(null)}><X size={24} className="text-gray-400"/></button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
              {/* Initial Ticket Message */}
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm shadow-sm">
                  <p className="font-bold text-xs text-brand-dark mb-1">Customer</p>
                  {selectedTicket.message}
                </div>
              </div>

              {/* Thread */}
              {ticketMessages.map((msg) => {
                const isAdmin = msg.sender_email === "m.mymaouhoubi@mam-nature.com";
                return (
                  <div key={msg.id} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                      isAdmin ? 'bg-brand-dark text-white rounded-tr-none' : 'bg-white border border-gray-200 rounded-tl-none'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={sendReply} className="p-4 border-t bg-white">
              <div className="flex gap-2">
                <input 
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type a reply..."
                  className="flex-1 bg-gray-100 border-0 rounded-full px-4 text-sm focus:ring-2 focus:ring-brand-dark outline-none"
                />
                <button type="submit" className="p-3 bg-brand-primary text-brand-dark rounded-full hover:brightness-110">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

function TabButton({ active, onClick, icon, label, count }: any) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all ${active ? 'bg-[#111] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
      {icon} {label}
      {count !== undefined && <span className={`text-[10px] px-2 py-0.5 rounded-full ${active ? 'bg-brand-primary text-black' : 'bg-gray-200'}`}>{count}</span>}
    </button>
  );
}