import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Droplet, Award, TrendingUp, Users, Phone, Mail, ArrowRight, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { useAuth } from '../App';
import { toast } from 'sonner';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [queryForm, setQueryForm] = useState({ name: '', email: '', message: '' });

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    toast.success("Query sent successfully! Aryan's team will contact you soon.");
    setQueryForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplet className="w-8 h-8 text-primary" />
            <span className="text-2xl font-syne font-bold text-primary-900">BlueCust</span>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button onClick={() => navigate(user.is_admin ? '/admin' : '/dashboard')} className="rounded-full bg-primary text-white font-bold px-8">Dashboard</Button>
            ) : (
              <Button onClick={() => navigate('/login')} variant="ghost" className="text-primary-900 font-bold">Login</Button>
            )}
            <Button onClick={() => navigate('/register')} className="rounded-full bg-secondary-accent text-white font-bold px-8 shadow-lg shadow-orange-200">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero & Dynamic Bottle Section */}
      <section className="pt-32 pb-24 px-6 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl lg:text-7xl font-syne font-black text-primary-900 leading-[1.1] mb-6">
              Build Your Brand <br/>
              <span className="text-primary italic">One Bottle </span> 
              at a Time
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Stop promoting generic brands. We help ventures claim their identity through custom branding and premium hydration.
            </p>
            <div className="flex items-center space-x-4">
               <div className="p-4 bg-white rounded-2xl shadow-xl border border-blue-50">
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">Starting From</p>
                  <p className="text-4xl font-black text-secondary-accent">₹16.00</p>
               </div>
               <Button onClick={() => navigate('/register')} className="h-16 px-10 rounded-2xl bg-primary text-white text-lg font-bold shadow-2xl shadow-blue-200">Start Branding <ArrowRight className="ml-2"/></Button>
            </div>
          </motion.div>

          {/* DYNAMIC BOTTLE MOCKUP */}
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity }} className="relative flex justify-center">
             <div className="w-56 h-96 bg-gradient-to-b from-blue-100/40 to-primary/20 rounded-[4rem] border-8 border-white shadow-[0_32px_64px_-12px_rgba(0,163,255,0.3)] relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-1/2 left-0 w-full bg-white/95 py-6 shadow-xl border-y-2 border-blue-50 flex items-center justify-center">
                   <span className="text-primary-900 font-syne font-black text-sm uppercase tracking-[0.2em] text-center px-4">
                      {user?.business_name || "YOUR VENTURE NAME"}
                   </span>
                </div>
                <div className="absolute bottom-0 w-full h-1/2 bg-primary/10 animate-pulse" />
             </div>
          </motion.div>
        </div>
      </section>

      {/* USP Section (Replacing Meet Founder) */}
      <section className="py-24 px-6 bg-primary-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-syne font-bold text-white mb-4">How We Empower Your Venture</h2>
              <div className="space-y-6">
                {[
                  { title: "Brand Endorsement", desc: "Turn a commodity into a powerful marketing tool. Your customers carry YOUR name, not ours." },
                  { title: "Transparent Pricing", desc: "Standardized rate of ₹16 per bottle. We finalize high-volume discounts during the checkout process." },
                  { title: "Supply Chain Excellence", desc: "We bridge the gap between manufacturers and suppliers to ensure your stock is never empty." }
                ].map((usp, i) => (
                  <div key={i} className="flex space-x-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                    <CheckCircle className="w-8 h-8 text-secondary-accent shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{usp.title}</h3>
                      <p className="text-blue-100/70">{usp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-8 border-t border-white/10">
                <p className="text-2xl font-syne text-white italic">"Driving identity through hydration."</p>
                <p className="mt-2 text-primary font-bold">Aryan Singh — Founder, Director NextGenTech</p>
              </div>
            </div>
            <div className="bg-white/5 rounded-[3rem] p-4 border border-white/10">
              <img src="https://images.unsplash.com/photo-1602143302326-19220c2a742b?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] shadow-2xl" alt="Branding" />
            </div>
          </div>
        </div>
      </section>

      {/* Connect With Us Form */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-[3rem] p-12 border border-blue-100 shadow-2xl grid md:grid-cols-2 gap-12">
            <div>
              <MessageSquare className="w-16 h-16 text-primary mb-6" />
              <h2 className="text-4xl font-syne font-bold text-primary-900 mb-4">Let's Talk Business</h2>
              <p className="text-lg text-slate-600 mb-8">Have questions about bulk orders or custom stickers? Drop us a query and we'll reach out within 24 hours.</p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-primary-900 font-bold"><Phone className="w-5 h-5"/> <span>+91 7385751471</span></div>
                <div className="flex items-center space-x-3 text-primary-900 font-bold"><Mail className="w-5 h-5"/> <span>aryanrajput7385@gmail.com</span></div>
              </div>
            </div>
            <form onSubmit={handleQuerySubmit} className="space-y-4">
              <Input placeholder="Full Name" value={queryForm.name} onChange={(e)=>setQueryForm({...queryForm, name: e.target.value})} required className="h-14 rounded-2xl bg-white border-blue-100" />
              <Input type="email" placeholder="Business Email" value={queryForm.email} onChange={(e)=>setQueryForm({...queryForm, email: e.target.value})} required className="h-14 rounded-2xl bg-white border-blue-100" />
              <Textarea placeholder="How can we help your brand?" value={queryForm.message} onChange={(e)=>setQueryForm({...queryForm, message: e.target.value})} required className="rounded-2xl bg-white border-blue-100" rows={5} />
              <Button type="submit" className="w-full h-16 rounded-2xl bg-primary text-white font-bold text-lg shadow-xl shadow-blue-100">Send Query</Button>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-12 bg-slate-900 text-white text-center">
         <p className="font-syne font-bold text-2xl mb-2 text-primary">BlueCust</p>
         <p className="text-slate-400">© 2026 BlueCust. Aryan Singh Enterprises.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
