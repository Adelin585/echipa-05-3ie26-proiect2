/**
 * Designed & Implemented by Deatc Claudiu Aurel
 * UI/UX Design & About Page Features:
 * - Premium interactive floating profile image card with rotating gradients
 * - Stylish custom technology badges with scale and color transition hover effects
 * - Harmonious layout structure and typography improvements
 */

import { useState, useEffect } from 'react';
import { fetchAbout, getStrapiMedia } from '../services/api';

export default function About() {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAbout();
      setAboutData(data);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // If no data received from backend
  if (!aboutData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Datele nu au fost găsite</h2>
        <p className="text-slate-500">Asigură-te că ai publicat pagina About în Strapi și ai configurat permisiunile.</p>
      </div>
    );
  }

  const { Title, Biography } = aboutData;

  const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-6 leading-relaxed text-slate-700 dark:text-slate-350">
            {block.children.map((child, i) => {
              let text = child.text;
              if (child.bold) text = <strong key={i} className="font-bold text-slate-900 dark:text-white">{text}</strong>;
              if (child.italic) text = <em key={i} className="italic">{text}</em>;
              return <span key={i}>{text}</span>;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Interactive profile image layout styled by Claudiu */}
        <div className="relative group max-w-md mx-auto lg:max-w-none w-full">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-[32px] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20 dark:opacity-40 blur-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-[32px] -rotate-2 group-hover:-rotate-3 transition-transform duration-500 opacity-10 dark:opacity-20"></div>
          <div className="relative aspect-square md:aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-[32px] overflow-hidden border border-slate-200/50 dark:border-slate-800 shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
               alt="Echipa React" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
             />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
              Despre Noi
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-800 dark:text-white">
              {Title || "Titlu Default"}
            </h1>
          </div>
          
          <div className="text-lg leading-relaxed text-slate-650 dark:text-slate-300">
            {Biography ? renderBlocks(Biography) : (
              <p>Adaugă conținut în câmpul Biography din Strapi.</p>
            )}
          </div>

          {/* Interactive Technology badging styled by Claudiu */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-850">
            <h3 className="text-xl font-bold mb-5 text-slate-800 dark:text-slate-100">Tehnologii pe care le iubim:</h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'TailwindCSS', 'Strapi', 'Vite', 'React Router'].map(tech => (
                <span 
                  key={tech} 
                  className="px-5 py-2.5 bg-slate-55 dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800 text-slate-800 dark:text-slate-250 rounded-2xl text-sm font-semibold tracking-wide hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white dark:hover:text-white hover:border-primary-500/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

