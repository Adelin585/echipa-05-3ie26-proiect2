/**
 * Designed & Implemented by Deatc Claudiu Aurel
 * UI/UX Design & Portfolio View Features:
 * - Interactive Search bar with real-time portfolio filtering
 * - Category filter pills for premium interaction
 * - Micro-animations & hover effects on cards (glowing borders, smooth zoom, custom overlays)
 * - Harmonious grid arrangement and empty state messaging
 */

import { ArrowUpRight, Search, SlidersHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProjects, getStrapiMedia } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setFilteredProjects(data);
      
      // Extract unique categories for filter buttons
      const uniqueCats = ['All', ...new Set(data.map(p => p.category?.Name).filter(Boolean))];
      setCategories(uniqueCats);
      setLoading(false);
    };
    loadProjects();
  }, []);

  // Handle live filtering by search query & category pill
  useEffect(() => {
    let result = projects;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category?.Name === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        (p.Title && p.Title.toLowerCase().includes(query)) ||
        (p.category?.Name && p.category?.Name.toLowerCase().includes(query)) ||
        (p.Slug && p.Slug.toLowerCase().includes(query))
      );
    }

    setFilteredProjects(result);
  }, [searchQuery, selectedCategory, projects]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-24">
      {/* Header section with styling designed by Claudiu */}
      <div className="mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
          Proiectele noastre
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          O colecție curată de proiecte inovatoare, extrase dinamic direct din Strapi și filtrate în timp real.
        </p>
      </div>

      {/* Search & Filter Controls designed by Claudiu */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm">
        
        {/* Real-time search bar */}
        <div className="relative w-full md:max-w-md group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Caută un proiect sau o tehnologie..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl outline-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 transition-all text-sm font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2.5 w-full md:w-auto justify-start md:justify-end">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-2xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/20 scale-105'
                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary-500/30'
              }`}
            >
              {category === 'All' ? 'Toate' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Portfolio Cards styled by Claudiu */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/20 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-lg text-slate-500 font-medium">Nu a fost găsit niciun proiect care să corespundă căutării.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.map((project) => {
            const { Title, Slug, Cover } = project;
            const catName = project.category?.Name || 'Fără categorie';
            
            const defaultImages = {
              'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
              'dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
              'fitness': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
              'arhitect': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80'
            };

            const coverUrl = Cover?.url 
              ? getStrapiMedia(Cover.url) 
              : (defaultImages[Slug] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80');

            return (
              <Link 
                key={project.documentId} 
                to={`/projects/${Slug}`} 
                className="group flex flex-col justify-between h-full bg-white dark:bg-slate-900/30 p-4 rounded-[32px] border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/5 hover:-translate-y-1.5 transition-all duration-500"
              >
                <div>
                  <div className="relative aspect-video rounded-2xl mb-6 overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/50">
                    <img 
                      src={coverUrl} 
                      alt={Title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    
                    {/* Hover Overlay featuring custom styles by Claudiu */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-semibold flex items-center gap-2 bg-primary-600 px-6 py-3 rounded-full shadow-xl translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        Vezi detalii <ArrowUpRight size={18} />
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
                      {catName}
                    </span>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                      {Title}
                    </h2>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

