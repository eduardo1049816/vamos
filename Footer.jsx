import React from 'react';
import { Link } from 'react-router-dom';
import { Dumbbell, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 border-t-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Dumbbell className="w-7 h-7 text-black" />
              </div>
              <span className="font-black text-2xl tracking-tighter">FITHUB</span>
            </div>
            <p className="text-secondary-foreground/70 max-w-sm leading-relaxed text-lg">
              Sua academia digital completa. Transforme seu corpo com treinos personalizados e dietas focadas no seu objetivo.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-primary">Acesso Rápido</h4>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-secondary-foreground/70 hover:text-white transition-colors font-medium">Home</Link>
              <Link to="/exercises" className="text-secondary-foreground/70 hover:text-white transition-colors font-medium">Exercícios</Link>
              <Link to="/diets" className="text-secondary-foreground/70 hover:text-white transition-colors font-medium">Dietas</Link>
              <Link to="/about" className="text-secondary-foreground/70 hover:text-white transition-colors font-medium">Sobre Nós</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 uppercase tracking-wider text-primary">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-secondary-foreground/5 hover:bg-primary hover:text-black flex items-center justify-center transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-secondary-foreground/5 hover:bg-primary hover:text-black flex items-center justify-center transition-all">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-secondary-foreground/5 hover:bg-primary hover:text-black flex items-center justify-center transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm font-medium">
            &copy; 2026 FitHub Academy. Todos os direitos reservados.
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <span className="text-secondary-foreground/50">Políticas de Privacidade</span>
            <span className="text-secondary-foreground/50">Termos de Uso</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;