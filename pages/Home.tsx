import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  { id: '1', title: 'Venmo Debit Card', description: 'Designing the value props for card products.', date: '2025', link: 'https://newsroom.paypal-corp.com/2025-06-04-Venmo-Unleashes-Next-Phase-of-Commerce-with-the-Venmo-Debit-Card-and-Venmo-Checkout', tags: ['Next.js', 'Design'] },
  { id: '2', title: 'Venmo for Business', description: 'Helping small businesses get paid and discovered.', date: '2025', link: 'https://venmo.com/business/profiles/', tags: ['React Native'] },
  { id: '3', title: 'Cisco AI Assistant', description: 'Automating security workflows with Gen AI.', date: '2024', link: 'https://www.cisco.com/site/us/en/solutions/artificial-intelligence/ai-assistant/index.html', tags: ['Node', 'API'] },
  { id: '4', title: 'Duo Passkeys', description: 'Building a unified design language for passkeys.', date: '2023', link: 'https://duo.com/docs/passwordless', tags: ['Systems'] },
  { id: '5', title: '百度 Baidu Terabox', description: 'Driving consistency with content framework.', date: '2023', link: 'https://www.terabox.com/', tags: ['Systems'] },
  { id: '6', title: '猿辅导 Yuanfudao', description: 'Defining strategy for product localization.', date: '2023', link: 'https://www.cretaclass.com/', tags: ['Systems'] },
  { id: '7', title: 'Universal Beijing Resort', description: 'Adapting experiences for local audiences.', date: '2021', link: 'https://www.universalbeijingresort.com/en/news/339.html', tags: ['Systems'] },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};

export const Home: React.FC = () => {
  return (
    <motion.main 
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-2xl mx-auto px-6 pt-32 pb-20"
    >
      <motion.section variants={item} className="mb-16">
        <h1 className="font-serif text-3xl md:text-4xl text-neutral-100 leading-tight mb-6">
          Sharon is a content designer focused on helping <span className="italic text-neutral-400">brands</span> connect with people through plain language.
        </h1>
        <p className="text-secondary text-lg leading-relaxed max-w-lg">
          Currently crafting the future of payments at <span className="text-white">Venmo</span>. 
          Previously helped build AI for security at Cisco.
        </p>
      </motion.section>

      <motion.section variants={item}>
        <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-8">Selected Work</h2>
        <div className="flex flex-col gap-1">
          {projects.map((project) => (
            <a 
              key={project.id} 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-between py-4 px-2 -mx-2 rounded-lg transition-colors hover:bg-white/5"
            >
              <div className="flex flex-col gap-1 z-10">
                <span className="text-neutral-200 font-medium group-hover:text-white transition-colors flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300 text-neutral-400" />
                </span>
                <span className="text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">
                  {project.description}
                </span>
              </div>
              <span className="text-sm text-neutral-600 font-mono z-10">{project.date}</span>
            </a>
          ))}
        </div>
      </motion.section>
      
      <motion.div variants={item} className="mt-12 pt-12 border-t border-neutral-900">
         <div className="flex items-center gap-2 text-sm text-neutral-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Available for new projects in Q4
         </div>
      </motion.div>
    </motion.main>
  );
};