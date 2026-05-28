/**
 * Designed & Implemented by Deatc Claudiu Aurel
 * UI/UX Design & Contact Page Features:
 * - Premium interactive contact info cards with custom icon scale effects
 * - Stylish input fields with glowing hover & focus borders and transitions
 * - Action button with scale transitions and shadow glow effects
 * - Responsive layout with smooth form submit state visual feedback
 */

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
      // Simulate success on frontend
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact info card column styled by Claudiu */}
        <div className="space-y-10">
          <div>
            <span className="inline-block text-xs font-bold tracking-wider uppercase text-primary-600 dark:text-primary-400 mb-2">
              Contact
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-800 dark:text-white">
              Să vorbim!
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mt-6 leading-relaxed">
              Ai un proiect în minte sau doar vrei să ne saluți? Completează formularul și te vom contacta în cel mai scurt timp.
            </p>
          </div>

          <div className="space-y-6 pt-10 border-t border-slate-100 dark:border-slate-850">
              {[
                { icon: Mail, label: 'Email', value: 'echipa05@e-uvt.ro' },
                { icon: Phone, label: 'Telefon', value: '0758493678' },
                { icon: MapPin, label: 'Locație', value: 'Universitatea de Vest din Timișoara' }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-start gap-5 p-5 bg-white dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800/80 hover:border-primary-500/30 hover:shadow-xl hover:shadow-primary-500/5 transition-all duration-300 group"
                >
                  <div className="p-3.5 bg-primary-100/80 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-2xl group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-slate-150 text-lg mb-1">{item.label}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Contact Form styled by Claudiu */}
        <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[36px] p-8 md:p-10 border border-slate-100 dark:border-slate-800/85 shadow-lg backdrop-blur-md">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-450 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-green-500/10">
                <Send size={30} />
              </div>
              <h3 className="text-3xl font-black text-slate-850 dark:text-white">Mesaj trimis!</h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-sm font-medium">
                Îți mulțumim că ne-ai contactat. Vom reveni cu un răspuns rapid.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Numele tău</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border focus:ring-4 outline-none transition-all text-sm font-medium ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500/10 focus:border-red-550' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:ring-primary-500/10'
                  }`}
                  placeholder="Ion Popescu"
                />
                {errors.name && <p className="text-red-500 text-xs font-semibold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Adresa de email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border focus:ring-4 outline-none transition-all text-sm font-medium ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500/10 focus:border-red-550' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:ring-primary-500/10'
                  }`}
                  placeholder="ion@exemplu.ro"
                />
                {errors.email && <p className="text-red-500 text-xs font-semibold mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Mesajul tău</label>
                <textarea 
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={`w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-950 border focus:ring-4 outline-none transition-all resize-none text-sm font-medium ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500/10 focus:border-red-550' 
                      : 'border-slate-200 dark:border-slate-800 focus:border-primary-500 focus:ring-primary-500/10'
                  }`}
                  placeholder="Cum te putem ajuta?"
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs font-semibold mt-1">{errors.message}</p>}
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold transition-all duration-300 shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
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
