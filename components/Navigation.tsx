import React from 'react';
import { Magnetic } from './Magnetic';
import { Link, useLocation } from 'react-router-dom'; // Will use HashRouter in App
import clsx from 'clsx';

const NavItem = ({ to, label, isActive }: { to: string; label: string; isActive: boolean }) => (
  <Magnetic>
    <Link 
      to={to} 
      className={clsx(
        "relative px-4 py-2 text-sm transition-colors duration-300",
        isActive ? "text-white" : "text-secondary hover:text-white"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute left-1/2 -bottom-1 w-1 h-1 bg-white rounded-full -translate-x-1/2" />
      )}
    </Link>
  </Magnetic>
);

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center gap-1 px-2 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
        <NavItem to="/" label="Work" isActive={location.pathname === '/'} />
        <NavItem to="/stuff" label="Stuff" isActive={location.pathname === '/stuff'} />
        <NavItem to="/about" label="About" isActive={location.pathname === '/about'} />
      </div>
    </nav>
  );
};