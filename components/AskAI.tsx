import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

// Custom colorful pixel-art illustration of Sharon holding coffee
// Designed on a 16x16 grid for a chunkier, more "pixelated" look
const SharonIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ imageRendering: 'pixelated' }} // Enforces nearest-neighbor scaling
    shapeRendering="crispEdges" // Ensures sharp edges on vector rects
  >
    {/* Hair (Back/Sides - Dark Brown) */}
    <rect x="4" y="2" width="8" height="3" fill="#3E2723" />
    <rect x="3" y="4" width="2" height="9" fill="#3E2723" />
    <rect x="11" y="4" width="2" height="9" fill="#3E2723" />

    {/* Face (Skin Tone) */}
    <rect x="5" y="5" width="6" height="5" fill="#FFCCBC" />

    {/* Eyes (Black) */}
    <rect x="6" y="7" width="1" height="1" fill="#1A1A1A" />
    <rect x="9" y="7" width="1" height="1" fill="#1A1A1A" />
    
    {/* Blush (Pinkish) */}
    <rect x="5" y="8" width="1" height="1" fill="#EF9A9A" opacity="0.6" />
    <rect x="10" y="8" width="1" height="1" fill="#EF9A9A" opacity="0.6" />

    {/* Shirt (White) */}
    <rect x="5" y="10" width="6" height="4" fill="#EEEEEE" />
    
    {/* Coffee Cup (Orange) */}
    <rect x="7" y="11" width="2" height="2" fill="#F97316" />
    <rect x="9" y="12" width="1" height="1" fill="#F97316" /> {/* Handle */}
    
    {/* Hand holding cup */}
    <rect x="6" y="12" width="1" height="1" fill="#FFCCBC" />
  </svg>
);

export const AskAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: query, timestamp: Date.now() };
    setChatHistory(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    const response = await sendMessageToGemini(query);
    const modelMsg: ChatMessage = { role: 'model', text: response, timestamp: Date.now() };
    
    setChatHistory(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 sm:w-96 bg-surface border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '500px' }}
          >
            <div className="p-3 border-b border-white/5 bg-white/5 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-medium text-neutral-300">Ask Sharon</span>
            </div>
            
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[300px]"
            >
              {chatHistory.length === 0 && (
                <div className="text-center text-neutral-500 text-sm mt-8">
                  <p>Ask me about my work, stack,<br/>or what I'm working on.</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`
                    max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-neutral-800 text-white rounded-br-none' 
                      : 'bg-neutral-900 text-neutral-300 border border-white/5 rounded-bl-none'}
                  `}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                   <div className="bg-neutral-900 border border-white/5 rounded-2xl rounded-bl-none px-3 py-2">
                     <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
                   </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="p-3 border-t border-white/5 bg-neutral-900/50">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question..."
                  className="w-full bg-black border border-neutral-800 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-neutral-600 transition-colors placeholder:text-neutral-600"
                />
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-1 top-1 p-1.5 bg-neutral-800 rounded-full hover:bg-neutral-700 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-3 h-3 text-white" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="group relative flex flex-col items-center justify-center w-14 h-14 bg-transparent outline-none focus:outline-none hover:scale-105 active:scale-95 transition-transform duration-200"
        aria-label="Ask Sharon AI"
      >
        {/* Pixelated Circle Shape Construction using a single SVG Path to ensure solid fill with no gaps */}
        <svg 
          className="absolute inset-0 w-full h-full drop-shadow-lg text-white" 
          viewBox="0 0 56 56" 
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 0H44V4H52V8H56V48H52V52H44V56H12V52H4V48H0V8H4V4H12V0Z" />
        </svg>

        {/* Icon positioned on top */}
        <div className="relative z-10">
          <SharonIcon className="w-10 h-10 transition-transform group-hover:rotate-6" />
        </div>
      </button>
    </div>
  );
};
