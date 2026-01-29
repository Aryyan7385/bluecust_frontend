import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Droplet, ShieldCheck, Zap, Banknote, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../App';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Droplet className="w-8 h-8 text-primary-500" />
          <span className="text-2xl font-syne font-bold text-primary-900">BlueCust</span>
        </div>
        <div className="flex items-center space-x-4">
          {user ? (
            <Button onClick={() => navigate('/dashboard')} className="rounded-full bg-primary text-white font-bold px-8">Dashboard</Button>
          ) : (
            <Button onClick={() => navigate('/login')} variant="ghost" className="text-primary-900 font-bold">Login</Button>
          )}
          <Button onClick={() => navigate('/register')} className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-bold px-8 shadow-lg">Get Started</Button>
        </div>
      </nav>

      {/* Restore Original Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden text-center md:text-left">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <h1 className="text-5xl lg:text-7xl font-syne font-bold text-primary-900 leading-tight mb-6">
              Build Your Brand <span className="block bg-gradient-to-r from-secondary-900 to-primary-500 bg-clip-text text-transparent">One Bottle at a Time</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">Stop promoting other brands. Claim your identity with custom hydration solutions for your hotel or restaurant.</p>
            <Button onClick={() => navigate('/register')} className="rounded-full bg-primary text-white font-bold px-8 py-6 text-lg shadow-xl">Start Branding Now <ArrowRight className="ml-2"/></Button>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <img src="https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?auto=format&fit=crop&q=80&w=800" alt="Mockup" className="w-full rounded-3xl shadow-2xl animate-float" />
          </motion.div>
        </div>
      </section>

      {/* NEW: Our USP Section (Discarded Founder Section) */}
      <section className="py-24 px-6 bg-white/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-syne font-bold text-primary-900">Our USP</h2>
            <p className="text-slate-500 mt-2">Why ventures choose BlueCust for their brand endorsements</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Pure Brand Ownership", desc: "Every bottle serves your brand image, ensuring 100% endorsement visibility." },
              { icon: Banknote, title: "Standardized Pricing", desc: "Standard rate of ₹16 per bottle. Competitive, transparent, and high-value." },
              { icon: Zap, title: "Dynamic Supply", desc: "Connected directly to manufacturers to ensure your stock never runs dry." }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-white rounded-3xl shadow-xl border border-blue-50 text-center hover:scale-105 transition-all">
                <item.icon className="w-16 h-16 text-primary-500 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-20 text-center border-t border-blue-100 pt-10">
             <p className="text-xl font-syne font-bold text-primary-600">Aryan Singh — Founder | Director NextGenTech</p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default LandingPage;
