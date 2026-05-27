import { useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Numele este obligatoriu.';
    if (!formData.email.trim()) {
      newErrors.email = 'Adresa de email este obligatorie.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Adresa de email nu este validă.';
    }
    if (!formData.message.trim()) newErrors.message = 'Mesajul nu poate fi gol.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // In loc sa trimitem la backend, simulam succesul pe frontend
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Info Contact */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Să vorbim!</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Ai un proiect în minte sau doar vrei să ne saluți? Completează formularul și te vom contacta în cel mai scurt timp.
            </p>
          </div>

          <div className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-slate-600 dark:text-slate-400">echipa05@e-uvt.ro</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Telefon</h3>
                  <p className="text-slate-600 dark:text-slate-400">0758493678</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-2xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Locație</h3>
                  <p className="text-slate-600 dark:text-slate-400">Universitatea de Vest din Timișoara</p>
                </div>
              </div>
        </div>
      </div>
        {/* Formular Contact */}
        <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-lg">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                <Send size={32} />
              </div>
              <h3 className="text-2xl font-bold">Mesaj trimis cu succes!</h3>
              <p className="text-slate-600 dark:text-slate-400">Îți mulțumim că ne-ai contactat.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Numele tău</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border focus:ring-2 outline-none transition-all ${
                    errors.name ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-100 dark:focus:ring-primary-900'
                  }`}
                  placeholder="Ion Popescu"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Adresa de email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border focus:ring-2 outline-none transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-100 dark:focus:ring-primary-900'
                  }`}
                  placeholder="ion@exemplu.ro"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Mesajul tău</label>
                <textarea 
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border focus:ring-2 outline-none transition-all resize-none ${
                    errors.message ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900' : 'border-slate-200 dark:border-slate-700 focus:border-primary-500 focus:ring-primary-100 dark:focus:ring-primary-900'
                  }`}
                  placeholder="Cum te putem ajuta?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
              >
                Trimite mesajul
                <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
