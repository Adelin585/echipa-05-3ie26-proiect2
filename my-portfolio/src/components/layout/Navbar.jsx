/**
 * Designed & Implemented by Deatc Claudiu Aurel
 * UI/UX Design & Interactive Visual Features:
 * - Premium Dark/Light mode toggle switch with rotation transitions
 * - Custom animated hamburger menu (transforming spans into an 'X')
 * - Backdrop blur styling and scrolling navbar transitions
 */

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-100/10 dark:shadow-none border-b border-slate-100 dark:border-slate-800/50 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-heading font-black tracking-tight text-primary-600 dark:text-primary-400 group">
            Portfolio<span className="text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors duration-300">.</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink 
                key={link.path} 
                to={link.path}
                className={({isActive}) => `text-sm font-semibold transition-all duration-300 relative py-1 hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive 
                    ? 'text-primary-600 dark:text-primary-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-600 dark:after:bg-primary-400' 
                    : 'text-slate-600 dark:text-slate-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-600 dark:after:bg-primary-400 hover:after:w-full after:transition-all after:duration-300'
                }`}
              >
                {link.name}
              </NavLink>
            ))}
            
            {/* Custom Interactive Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="relative p-2.5 rounded-full overflow-hidden bg-slate-100/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/80 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
              aria-label="Toggle Dark Mode"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                <span className={`absolute transition-all duration-500 transform ${theme === 'dark' ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
                  <Moon size={20} className="fill-slate-700 text-slate-700" />
                </span>
                <span className={`absolute transition-all duration-500 transform ${theme === 'light' ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
                  <Sun size={20} className="fill-amber-400 text-amber-400" />
                </span>
              </div>
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Dark Mode Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/80"
              aria-label="Toggle Dark Mode Mobile"
            >
              {theme === 'light' ? <Moon size={18} className="fill-slate-700 text-slate-700" /> : <Sun size={18} className="fill-amber-400 text-amber-400" />}
            </button>

            {/* Custom Animated Hamburger Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-10 h-10 flex flex-col items-center justify-center rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 focus:outline-none z-55"
              aria-label="Toggle Menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between relative">
                <span className={`w-full h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 transform origin-left ${isOpen ? 'rotate-45 translate-x-[2px] translate-y-[-1px]' : ''}`} />
                <span className={`w-full h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-200 ${isOpen ? 'opacity-0 scale-0' : 'opacity-100'}`} />
                <span className={`w-full h-0.5 bg-slate-800 dark:bg-white rounded-full transition-all duration-300 transform origin-left ${isOpen ? '-rotate-45 translate-x-[2px] translate-y-[1px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop & Offcanvas Menu */}
      <div 
        className={`fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
        onClick={() => setIsOpen(false)} 
      />
      
      <div 
        className={`fixed top-0 right-0 h-full w-72 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl z-45 transform transition-all duration-500 ease-out border-l border-slate-100 dark:border-slate-800/80 ${
          isOpen ? 'translate-x-0 shadow-2xl opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <nav className="flex flex-col gap-6 px-10 pt-28">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({isActive}) => `text-2xl font-heading font-bold transition-all duration-300 hover:text-primary-600 dark:hover:text-primary-400 ${
                isActive ? 'text-primary-600 dark:text-primary-400 translate-x-2' : 'text-slate-800 dark:text-slate-200 hover:translate-x-1'
              }`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

