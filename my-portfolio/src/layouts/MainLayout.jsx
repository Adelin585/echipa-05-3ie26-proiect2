import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* pt-20 adauga padding top pentru a compensa navbar-ul sticky */}
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
