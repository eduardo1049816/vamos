import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/exercises', label: 'Exercícios' },
    { path: '/diets', label: 'Dietas' },
    { path: '/about', label: 'Sobre' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg">
              <Dumbbell className="w-7 h-7 text-primary" />
            </div>
            <span className="font-black text-2xl tracking-tighter hidden sm:block">FITHUB</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-bold tracking-wide uppercase transition-colors hover:text-primary ${
                  isActive(link.path) ? 'text-primary' : 'text-foreground/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="font-bold">Painel</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="outline" className="font-bold border-border">Perfil</Button>
                </Link>
                <Button onClick={logout} variant="default" className="font-bold shadow-lg">
                  Sair
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="font-bold">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="font-bold shadow-lg">Criar Conta</Button>
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-border animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-4">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-bold uppercase tracking-wide transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-accent'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="h-px bg-border my-2"></div>
              
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 font-bold text-foreground">Painel</Link>
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 font-bold text-foreground">Meu Perfil</Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="px-4 py-3 font-bold text-left text-destructive">
                    Sair
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-3 px-4 pt-2">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full h-12 font-bold">Entrar</Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-12 font-bold">Criar Conta</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;