import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, ArrowUpRight, Check } from 'lucide-react';

interface RollingButtonProps {
  initialText: React.ReactNode;
  activeText: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
  href?: string;
}

// A component that handles the "Rolling/Flipping" text animation
const RollingButton: React.FC<RollingButtonProps> = ({ initialText, activeText, isActive, onClick, href }) => {
  const content = (
    <div className="relative h-5 overflow-hidden">
      <motion.div
        initial={false}
        animate={{ y: isActive ? "-50%" : "0%" }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="flex flex-col items-center"
      >
        <div className="h-5 flex items-center justify-center gap-2 whitespace-nowrap w-full">
          {initialText}
        </div>
        <div className="h-5 flex items-center justify-center gap-2 whitespace-nowrap text-white w-full">
          {activeText}
        </div>
      </motion.div>
    </div>
  );

  const baseClasses = "group relative px-5 py-2 border border-neutral-800 rounded-full text-sm font-medium hover:bg-neutral-900 active:scale-95 transition-all text-neutral-300 hover:text-white cursor-crosshair overflow-hidden inline-flex items-center justify-center";

  if (href) {
    return (
      <a 
        href={href}
        target={href.startsWith('mailto') ? undefined : "_blank"}
        rel={href.startsWith('mailto') ? undefined : "noopener noreferrer"}
        className={baseClasses}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export const Info: React.FC = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('Sharonyibingni@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const mailtoLink = "mailto:Sharonyibingni@gmail.com?subject=Requesting Work Samples&body=Hi Sharon,%0D%0A%0D%0AI came across your portfolio and would love to request access to your work samples.%0D%0A%0D%0ABest,";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 pt-32 pb-20"
    >
      <div className="prose prose-invert prose-neutral">
        <h2 className="text-white font-medium mb-6">Background</h2>
        <p className="text-secondary mb-4 leading-relaxed">
          I have 6 years of experience working at the intersection of language and technology. My background in psycholinguistics shapes how I approach design, allowing me to see the structure behind the content.
        </p>
        <p className="text-secondary mb-8 leading-relaxed">
          Currently, I am exploring the linguistic patterns of AI. I am interested in how we talk to machines, and how they talk back to us.
        </p>

        <h2 className="text-white font-medium mb-6">Experience</h2>
        <ul className="list-none pl-0 space-y-6">
          <li className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-900 pb-4">
            <span className="text-white">Senior Content Designer</span>
            <span className="text-neutral-500 text-sm">Venmo, 2025 — Present</span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-900 pb-4">
            <span className="text-white">Content Designer</span>
            <span className="text-neutral-500 text-sm">Cisco, 2023 — 2024</span>
          </li>
        </ul>
        
        <h2 className="text-white font-medium mb-6 mt-12">Connect</h2>
        <div className="flex flex-wrap gap-4">
          
          <RollingButton 
            isActive={emailCopied}
            onClick={handleCopyEmail}
            initialText={<><span>Email</span><Copy className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" /></>}
            activeText={<><span>Copied</span><Check className="w-3 h-3" /></>}
          />

          <RollingButton 
            isActive={false} // Always false as it is a link
            href="https://www.linkedin.com/in/yibing-sharon-ni/"
            initialText={<><span>LinkedIn</span><ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" /></>}
            activeText={<><span>LinkedIn</span><ArrowUpRight className="w-3 h-3" /></>}
          />

          <RollingButton 
            isActive={false}
            href={mailtoLink}
            initialText={<><span>Request work sample</span><ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-white transition-colors" /></>}
            activeText={<><span>Request work sample</span><ArrowUpRight className="w-3 h-3" /></>}
          />
        </div>
      </div>
    </motion.div>
  );
};