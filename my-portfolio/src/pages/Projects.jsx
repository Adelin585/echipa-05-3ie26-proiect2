import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchProjects, getStrapiMedia } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
      setLoading(false);
    };
    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Proiectele noastre</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl">
          Aici vei regăsi cele mai recente lucrări ale noastre, extrase direct din Strapi.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="text-lg text-slate-500">Nu a fost găsit niciun proiect. Adaugă proiecte în Strapi!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => {
            // Strapi 5 format
            const { Title, Slug, category, Cover } = project;
            
            // Extragem numele categoriei daca exista relatia
            const catName = project.category?.Name || 'Fără categorie';
            
            // Imagini implicite premium daca nu s-a incarcat nimic in Strapi
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
              <Link key={project.documentId} to={`/projects/${Slug}`} className="group">
                <div className="bg-slate-100 dark:bg-slate-800/50 aspect-video rounded-3xl mb-6 overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 relative">
                  {coverUrl ? (
                    <img src={coverUrl} alt={Title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <span className="text-slate-400 font-mono text-sm">[Fără Imagine]</span>
                  )}
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium flex items-center gap-2 bg-primary-600/90 px-6 py-3 rounded-full backdrop-blur-sm">
                      Vezi detalii <ArrowUpRight size={20} />
                    </span>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2">
                    {catName}
                  </div>
                  <h2 className="text-2xl font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {Title}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
