import { motion } from 'framer-motion';

export const BrandedBottle = ({ ventureName = "Your Venture Name" }) => (
  <div className="relative flex justify-center items-center py-10">
    {/* Floating Animation for the entire bottle */}
    <motion.div 
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-52 h-80 bg-gradient-to-b from-blue-100/40 to-primary/30 rounded-[3rem] border-4 border-white shadow-2xl backdrop-blur-md overflow-hidden"
    >
      {/* Liquid Wave Effect */}
      <div className="absolute bottom-0 w-full h-3/4 bg-primary/20 animate-pulse" />
      
      {/* Branding Label - This is what makes it 'attractive' */}
      <div className="absolute top-1/2 left-0 w-full bg-white/95 py-5 shadow-xl flex items-center justify-center border-y-2 border-blue-50">
        <span className="text-primary-900 font-syne font-black text-sm tracking-widest uppercase px-4 text-center">
          {ventureName}
        </span>
      </div>
    </motion.div>
  </div>
);
