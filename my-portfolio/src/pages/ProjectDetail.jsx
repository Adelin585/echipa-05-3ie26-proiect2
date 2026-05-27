import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getStrapiMedia } from '../services/api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSingleProject = async () => {
      try {
        // Căutăm proiectul după slug (folosind numele exact al campului din Strapi: Slug)
        const STRAPI_URL = 'http://localhost:1337/api';
        const response = await fetch(`${STRAPI_URL}/projects?filters[Slug][$eq]=${slug}&populate=*`);
        if (!response.ok) throw new Error('Network error');
        
        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setProject(data.data[0]);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleProject();
  }, [slug]);

  const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-6">
            {block.children.map((child, i) => {
              let text = child.text;
              if (child.bold) text = <strong key={i}>{text}</strong>;
              if (child.italic) text = <em key={i}>{text}</em>;
              return <span key={i}>{text}</span>;
            })}
          </p>
        );
      }
      if (block.type === 'heading') {
        const H = `h${block.level}`;
        return <H key={index} className="text-2xl font-bold mt-8 mb-4">{block.children[0]?.text}</H>;
      }
      return null;
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Proiectul nu a fost găsit</h1>
        <Link to="/projects" className="text-primary-600 hover:underline">Întoarce-te la proiecte</Link>
      </div>
    );
  }

  const catName = project.category?.Name || 'Fără categorie';
  
  const defaultImages = {
    'ecommerce': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=80',
    'dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    'fitness': 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80',
    'arhitect': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'
  };
  const coverUrl = project.Cover?.url ? getStrapiMedia(project.Cover.url) : (defaultImages[project.Slug] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80');

  return (
    <article className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
      <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors mb-8">
        <ArrowLeft size={20} /> Înapoi la proiecte
      </Link>

      <header className="mb-12">
        <div className="inline-block px-4 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium text-sm mb-6">
          {catName}
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{project.Title}</h1>
      </header>

      {coverUrl && (
        <div className="aspect-video rounded-3xl overflow-hidden mb-12 shadow-xl border border-slate-200 dark:border-slate-800">
          <img src={coverUrl} alt={project.Title} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
        {project.Content ? renderBlocks(project.Content) : 'Fără conținut adăugat.'}
      </div>
    </article>
  );
}
