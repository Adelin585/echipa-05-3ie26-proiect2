/**
 * Designed & Implemented by Deatc Claudiu Aurel
 * UI/UX Design & Homepage Features:
 * - Premium interactive grid for featured projects with scale transitions
 * - Dynamic cards with hover effects for services/capabilities
 * - Stunning gradient mesh background in the hero section
 * - Interactive action buttons with scale transitions and shadow effects
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Code, Layout, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProjects, getStrapiMedia } from '../services/api';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      // Take only the first 3 projects
      setFeaturedProjects(data.slice(0, 3));
    };
    loadProjects();
  }, []);

  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="relative pt-28 pb-36 overflow-hidden">
        {/* Background gradient mesh styled by Claudiu */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] opacity-20 dark:opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-400 to-indigo-600 blur-[130px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tight text-slate-900 dark:text-white">
              Construim experiențe web <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">memorabile</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Suntem o echipă de developeri pasionați, creând interfețe moderne, rapide și responsive folosind cele mai noi tehnologii web.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-5 pt-4">
              <Link 
                to="/projects" 
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-xl shadow-primary-600/20 hover:shadow-primary-600/35 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                Vezi Proiectele
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-800/80 rounded-2xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section styled by Claudiu */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Proiecte Recente</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
              Cele mai noi lucrări extrase din Strapi, construite cu o atenție sporită la detalii și performanță.
            </p>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold hover:gap-3 transition-all group">
            Toate proiectele <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project) => {
            const defaultImages = {
              'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
              'dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
              'fitness': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
              'arhitect': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
            };
            const coverUrl = project.Cover?.url ? getStrapiMedia(project.Cover.url) : (defaultImages[project.Slug] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80');

            return (
              <Link 
                key={project.documentId} 
                to={`/projects/${project.Slug}`} 
                className="group block bg-white dark:bg-slate-900/30 p-4 rounded-3xl border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video rounded-2xl mb-5 overflow-hidden relative bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-850">
                  <img src={coverUrl} alt={project.Title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                </div>
                <div className="px-1">
                  <div className="text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-1">
                    {project.category?.Name || 'Fără categorie'}
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                    {project.Title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-10 flex md:hidden justify-center">
          <Link to="/projects" className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-bold">
            Toate proiectele <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Services Section styled by Claudiu */}
      <section className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Ce oferim</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
            Suntem specializați pe livrarea de soluții digitale de înaltă performanță.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Layout, title: "UI/UX Design", desc: "Interfețe atractive și intuitive, centrate pe utilizator." },
            { icon: Code, title: "Web Development", desc: "Aplicații web rapide și sigure cu React & Tailwind." },
            { icon: Smartphone, title: "Mobile Responsive", desc: "Design adaptabil pe absolut orice dispozitiv." }
          ].map((feature, i) => (
            <div 
              key={i} 
              className="p-8 rounded-[32px] bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/5 hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-primary-100/80 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                <feature.icon size={26} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-slate-800 dark:text-slate-100">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

