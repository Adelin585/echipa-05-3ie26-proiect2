export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} Proiect React. Toate drepturile rezervate.
        </div>
        <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
