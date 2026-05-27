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

  // Daca nu am primit date din backend
  if (!aboutData) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-2xl font-bold mb-4">Datele nu au fost găsite</h2>
        <p className="text-slate-500">Asigură-te că ai publicat pagina About în Strapi și ai configurat permisiunile.</p>
      </div>
    );
  }

  const { Title, Biography } = aboutData;

  // Functie super simpla pentru a randa blocurile de Rich Text (Blocks) din Strapi 5
  // Intr-un proiect mare s-ar folosi o librarie precum @strapi/blocks-react-renderer
  const renderBlocks = (blocks) => {
    if (!Array.isArray(blocks)) return null;
    return blocks.map((block, index) => {
      if (block.type === 'paragraph') {
        return (
          <p key={index} className="mb-4">
            {block.children.map((child, i) => {
              let text = child.text;
              if (child.bold) text = <strong key={i}>{text}</strong>;
              if (child.italic) text = <em key={i}>{text}</em>;
              return <span key={i}>{text}</span>;
            })}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Placeholder Imagine Profil */}
        <div className="relative group">
          <div className="absolute inset-0 bg-primary-600 rounded-3xl rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-20 dark:opacity-40"></div>
          <div className="relative aspect-square md:aspect-[4/5] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-2xl">
             <img 
               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
               alt="Echipa React" 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
             />
          </div>
        </div>

        {/* Continut */}
        <div className="space-y-8">
          <div>
            <h2 className="text-primary-600 dark:text-primary-400 font-bold tracking-wider uppercase text-sm mb-2">Despre Noi</h2>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {Title || "Titlu Default"}
            </h1>
          </div>
          
          <div className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            {Biography ? renderBlocks(Biography) : (
              <p>Adaugă conținut în câmpul Biography din Strapi.</p>
            )}
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Tehnologii pe care le iubim:</h3>
            <div className="flex flex-wrap gap-3">
              {['React', 'TailwindCSS', 'Strapi', 'Vite', 'React Router'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-lg text-sm font-medium">
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
