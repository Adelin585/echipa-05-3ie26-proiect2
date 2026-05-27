import { useState, useEffect } from 'react';
import { ArrowRight, Code, Layout, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProjects, getStrapiMedia } from '../services/api';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      // Luam doar primele 3 proiecte
      setFeaturedProjects(data.slice(0, 3));
    };
    loadProjects();
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] opacity-20 dark:opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-indigo-600 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Construim experiențe web <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-500">memorabile</span>.
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Suntem o echipă de developeri pasionați, creând interfețe moderne, rapide și responsive folosind cele mai noi tehnologii web.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link to="/projects" className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-medium transition-all shadow-lg shadow-primary-600/30 flex items-center justify-center gap-2 group">
                Vezi Proiectele
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-full font-medium transition-all flex items-center justify-center">
                Contactează-ne
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects extrase din Strapi */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proiecte Recente</h2>
            <p className="text-slate-600 dark:text-slate-400">Cele mai noi lucrări extrase din Strapi.</p>
          </div>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary-600 font-medium hover:underline">
            Toate proiectele <ArrowRight size={20} />
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
              <Link key={project.documentId} to={`/projects/${project.Slug}`} className="group block">
                <div className="bg-slate-100 dark:bg-slate-800/50 aspect-video rounded-3xl mb-4 overflow-hidden relative border border-slate-200 dark:border-slate-700">
                  <img src={coverUrl} alt={project.Title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-sm text-primary-600 dark:text-primary-400 mb-1">{project.category?.Name || 'Fără categorie'}</div>
                <h3 className="text-xl font-bold group-hover:text-primary-600 transition-colors">{project.Title}</h3>
              </Link>
            );
          })}
        </div>
        
        <div className="mt-8 flex md:hidden justify-center">
          <Link to="/projects" className="flex items-center gap-2 text-primary-600 font-medium hover:underline">
            Toate proiectele <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features/Categories */}
      <section className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce oferim</h2>
          <p className="text-slate-600 dark:text-slate-400">Ne specializăm pe următoarele arii de dezvoltare.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Layout, title: "UI/UX Design", desc: "Interfețe atractive și intuitive, centrate pe utilizator." },
            { icon: Code, title: "Web Development", desc: "Aplicații web rapide și sigure cu React & Tailwind." },
            { icon: Smartphone, title: "Mobile Responsive", desc: "Design adaptabil pe absolut orice dispozitiv." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon size={28} />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
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
