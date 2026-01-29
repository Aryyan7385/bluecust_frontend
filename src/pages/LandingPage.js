import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Droplet, ShieldCheck, Zap, Banknote, ArrowRight, CheckCircle2, TrendingUp, Users, Award, Package, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAuth } from '../App';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const statsRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });

  // Create water ripple effect
  useEffect(() => {
    const createRipple = () => {
      const ripple = document.createElement('div');
      ripple.className = 'water-ripple';
      ripple.style.width = `${Math.random() * 300 + 100}px`;
      ripple.style.height = ripple.style.width;
      ripple.style.left = `${Math.random() * 100}%`;
      ripple.style.top = `${Math.random() * 100}%`;
      document.querySelector('.hero-section')?.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 3000);
    };

    const interval = setInterval(createRipple, 2000);
    return () => clearInterval(interval);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 overflow-hidden">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Droplet className="w-9 h-9 text-primary-500" />
              <div className="absolute inset-0 blur-lg bg-primary-500/30 animate-pulse" />
            </div>
            <div>
              <span className="text-2xl font-syne font-bold text-primary-900">BlueCust</span>
              <p className="text-xs text-slate-500 font-medium">Brand Endorsement Platform</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            {user ? (
              <Button 
                onClick={() => navigate('/dashboard')} 
                className="rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold px-8 py-2.5 shadow-lg hover:shadow-primary-500/50 transition-all duration-300"
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                onClick={() => navigate('/login')} 
                variant="ghost" 
                className="text-primary-900 font-semibold hover:bg-primary-50"
              >
                Login
              </Button>
            )}
            <Button 
              onClick={() => navigate('/register')} 
              className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-bold px-8 py-2.5 shadow-xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section with Enhanced Visuals */}
      <section className="hero-section pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-cyan-400/10 backdrop-blur-sm border border-primary-200/50 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold text-primary-700">Revolutionizing Brand Visibility</span>
            </motion.div>

            <h1 className="text-5xl lg:text-7xl font-syne font-bold text-primary-900 leading-[1.1] mb-6">
              Build Your Brand{' '}
              <span className="block bg-gradient-to-r from-secondary-900 via-primary-500 to-cyan-400 bg-clip-text text-transparent">
                One Bottle at a Time
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Stop promoting other brands. Transform every water bottle into a powerful marketing asset for your hotel, café, or restaurant with custom-branded hydration solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                onClick={() => navigate('/register')} 
                className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
              >
                Start Branding Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="rounded-full border-2 border-primary-500 text-primary-700 font-bold px-10 py-6 text-lg hover:bg-primary-50 transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">Transparent Pricing</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="font-medium">Fast Delivery</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?auto=format&fit=crop&q=80&w=800" 
                alt="Custom Branded Water Bottles" 
                className="w-full rounded-3xl shadow-2xl animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-transparent rounded-3xl" />
              
              {/* Floating stat cards */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-6 top-1/4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-900">₹16</p>
                    <p className="text-xs text-slate-500">Per Bottle</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-6 bottom-1/4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-white/50"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary-900">100%</p>
                    <p className="text-xs text-slate-500">Your Brand</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-6 bg-white/40 backdrop-blur-sm border-y border-slate-200/50">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isStatsInView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "500+", label: "Ventures Served", icon: Users },
            { number: "₹16", label: "Standard Rate", icon: Banknote },
            { number: "100K+", label: "Bottles Delivered", icon: Package },
            { number: "24/7", label: "Support Available", icon: ShieldCheck }
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeInUp} className="text-center">
              <stat.icon className="w-10 h-10 text-primary-500 mx-auto mb-3" />
              <h3 className="text-4xl font-syne font-bold text-primary-900 mb-2">{stat.number}</h3>
              <p className="text-slate-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our USP Section - Redesigned */}
      <section className="py-24 px-6 bg-gradient-to-br from-white via-blue-50/30 to-primary-50/20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-cyan-400/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-primary-500/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-500/10 to-cyan-400/10 backdrop-blur-sm border border-primary-200/50 rounded-full px-5 py-2 mb-4"
            >
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-semibold text-primary-700">Why Choose BlueCust</span>
            </motion.div>
            
            <h2 className="text-5xl lg:text-6xl font-syne font-bold text-primary-900 mb-4">
              Our Unique Value Proposition
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We revolutionize how ventures build brand visibility through custom hydration solutions
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {[
              { 
                icon: ShieldCheck, 
                title: "Brand Endorsement", 
                desc: "Transform every water bottle into a powerful marketing asset. Your customers see your brand name with every sip, building direct loyalty and recognition that lasts beyond their visit.",
                gradient: "from-blue-500 to-cyan-400",
                features: ["Custom branding", "Logo integration", "Color matching", "Professional design"]
              },
              { 
                icon: Banknote, 
                title: "Standardized Pricing", 
                desc: "Premium branding at a transparent, standard rate of ₹16 per bottle. No hidden fees, no surprise charges. What you see is what you pay—exceptional value for exceptional quality.",
                gradient: "from-green-500 to-emerald-400",
                features: ["₹16 per bottle", "No setup fees", "Volume discounts", "Transparent costs"]
              },
              { 
                icon: Zap, 
                title: "Dynamic Supply Integration", 
                desc: "Seamlessly connect with verified water suppliers and bottle manufacturers through our integrated dashboard. Real-time tracking, automated fulfillment, and quality assurance built in.",
                gradient: "from-purple-500 to-pink-400",
                features: ["Real-time tracking", "Quality assurance", "Automated fulfillment", "Verified suppliers"]
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-cyan-400/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative p-8 bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Icon with gradient background */}
                  <div className="relative mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                  </div>

                  <h3 className="text-2xl font-syne font-bold text-primary-900 mb-4 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  {/* Feature list */}
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Decorative element */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-5 rounded-full -mr-16 -mt-16`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-12 mb-16"
          >
            <h3 className="text-3xl font-syne font-bold text-primary-900 text-center mb-12">How BlueCust Works</h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Register", desc: "Create your venture account in under 2 minutes" },
                { step: "02", title: "Customize", desc: "Design your bottle with brand name and preferences" },
                { step: "03", title: "Order", desc: "Place order with transparent ₹16/bottle pricing" },
                { step: "04", title: "Receive", desc: "Get delivered branded bottles ready to serve" }
              ].map((item, i) => (
                <div key={i} className="relative text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-cyan-400 text-white font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-primary-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                  {i < 3 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary-500 to-cyan-400 opacity-30" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Founder Credit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center border-t border-primary-200/50 pt-12"
          >
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary-500/5 to-cyan-400/5 backdrop-blur-sm border border-primary-200/30 rounded-full px-6 py-3">
              <Award className="w-5 h-5 text-primary-500" />
              <p className="text-lg font-syne font-semibold text-primary-700">
                Aryan Singh — Founder | Director, NextGenTech
              </p>
            </div>
            <p className="text-sm text-slate-500 mt-3">Established October 2025</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-primary-900 via-primary-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl lg:text-5xl font-syne font-bold text-white mb-6">
            Ready to Transform Your Brand Visibility?
          </h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Join hundreds of ventures already building stronger brand recognition with every bottle served
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/register')}
              className="rounded-full bg-white text-primary-700 font-bold px-10 py-6 text-lg shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300"
            >
              Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              variant="outline"
              className="rounded-full border-2 border-white text-white font-bold px-10 py-6 text-lg hover:bg-white/10 transition-all duration-300"
            >
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary-900 border-t border-primary-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <Droplet className="w-8 h-8 text-primary-400" />
              <div>
                <span className="text-xl font-syne font-bold text-white">BlueCust</span>
                <p className="text-xs text-blue-200">Brand Endorsement Platform</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-blue-200 text-sm">© 2025 BlueCust. All rights reserved.</p>
              <p className="text-blue-300/60 text-xs mt-1">Powered by NextGenTech</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
