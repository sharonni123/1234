import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full max-w-2xl mx-auto px-6 py-12 mt-20 flex justify-between items-end text-xs text-neutral-600">
      <div className="flex flex-col gap-2">
        <span className="text-neutral-400">© 2025 Sharon.</span>
        <span>San Francisco, CA</span>
      </div>
      <div className="flex gap-4">
        <a href="https://www.linkedin.com/in/yibing-sharon-ni/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
        <a href="mailto:Sharonyibingni@gmail.com" className="hover:text-white transition-colors">Email</a>
      </div>
    </footer>
  );
};