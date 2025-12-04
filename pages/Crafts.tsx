import React from 'react';
import { motion, Variants } from 'framer-motion';

// Visual for "Growing in Content" - Typographic Echo
// Uses the Serif font to highlight the "Content" aspect, with expanding echoes for "Growing"
const GrowingVisual = () => {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Main Character */}
      <span className="relative z-10 font-serif italic text-7xl text-white leading-none select-none">
        G
      </span>
      
      {/* Echoes symbolizing growth/expansion */}
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          className="absolute font-serif italic text-7xl text-neutral-600 leading-none select-none"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: [0, 0.3, 0], 
            scale: [1, 2, 2.2] 
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            delay: (i - 1) * 1.2,
            ease: "easeOut"
          }}
          aria-hidden="true"
        >
          G
        </motion.span>
      ))}
    </div>
  );
};

// Visual for "Content + AI podcast" - Sound Wave
const PodcastVisual = () => {
  return (
    <div className="flex items-center gap-1.5 h-16">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            height: [16, 48, 16],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut"
          }}
          className="w-1.5 bg-white rounded-full"
        />
      ))}
    </div>
  );
}

const GradientOrb = () => {
  return (
    <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 blur-xl opacity-50 animate-pulse" />
  );
}

const crafts = [
  { id: 'c1', title: 'Growing in Content 2024', component: <GrowingVisual />, date: '2024-02' },
  { id: 'c2', title: 'Content + AI podcast', component: <PodcastVisual />, date: '2024-07' },
  { id: 'c3', title: 'World Brand Design Award Jury', component: <GradientOrb />, date: '2025' },
];

export const Crafts: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto px-6 pt-32 pb-20"
    >
       <div className="mb-12">
        <h1 className="text-xl font-medium text-white mb-2">Stuff</h1>
        <p className="text-secondary text-sm">Speaking, writing and more stuffing.</p>
       </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {crafts.map((craft, i) => (
          <motion.div
            key={craft.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-neutral-900/40 border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-700 transition-colors"
            style={{ height: '200px' }}
          >
            {/* The Stage */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="scale-100 group-hover:scale-105 transition-transform duration-500 w-full h-full flex items-center justify-center">
                {craft.component}
              </div>
            </div>

            {/* The Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
              <span className="text-sm text-white font-medium">{craft.title}</span>
              <span className="text-xs text-neutral-500 font-mono">{craft.date}</span>
            </div>
          </motion.div>
        ))}
        
        {/* Poetic Manifesto */}
        <div className="flex items-center justify-center h-[200px] border border-dashed border-neutral-800 rounded-xl bg-neutral-900/10 p-6">
           <div className="text-center text-neutral-500 text-sm leading-loose">
              <p>Make it fast...</p>
              <p>Make it beautiful...</p>
              <p>Make it consistent...</p>
              <p>Make it carefully...</p>
              <p>Make it timeless...</p>
              <p>Make it soulful...</p>
              <p className="text-white mt-2 font-medium">Make it.</p>
           </div>
        </div>
      </div>
    </motion.div>
  );
};