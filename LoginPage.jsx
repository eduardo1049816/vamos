import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

// Real-time validation helper
const validateEmail = (email) => {
  return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  // Real-time validation states
  const isEmailValid = formData.email === '' ? null : validateEmail(formData.email);
  const isPasswordValid = formData.password === '' ? null : formData.password.length >= 8;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!isEmailValid || !isPasswordValid) {
      setError('Por favor, preencha os campos corretamente.');
      return;
    }

    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      toast.success('Bem-vindo de volta!');
      navigate('/dashboard');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError('Por favor, insira um email válido primeiro.');
      return;
    }

    setResetLoading(true);
    try {
      await pb.collection('users').requestPasswordReset(formData.email, { $autoCancel: false });
      toast.success('Link de recuperação enviado para seu email!');
      setError('');
    } catch (err) {
      toast.error('Falha ao enviar link. Verifique seu email.');
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Entrar - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-muted relative px-4 py-12 overflow-hidden">
        {/* Subtle Background Pattern/Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <Card className="w-full max-w-md shadow-2xl border-border/50 relative z-10 glass-panel">
          <CardHeader className="text-center pb-6">
            <Link to="/" className="inline-block">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-105 transition-transform">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
            </Link>
            <CardTitle className="text-3xl font-bold tracking-tight">Entrar</CardTitle>
            <p className="text-muted-foreground mt-2">Acesse sua conta para continuar</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`text-foreground bg-background transition-colors pr-10 ${
                      isEmailValid === false ? 'border-destructive focus-visible:ring-destructive' : 
                      isEmailValid === true ? 'border-green-500 focus-visible:ring-green-500' : ''
                    }`}
                  />
                  {isEmailValid === true && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                  {isEmailValid === false && <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <button 
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={resetLoading}
                    className="text-sm text-primary hover:text-primary/80 font-medium disabled:opacity-50 transition-colors"
                  >
                    {resetLoading ? 'Enviando...' : 'Esqueceu a senha?'}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`text-foreground bg-background transition-colors ${
                      isPasswordValid === false ? 'border-destructive focus-visible:ring-destructive' : 
                      isPasswordValid === true ? 'border-green-500 focus-visible:ring-green-500' : ''
                    }`}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-bold" 
                disabled={loading || isEmailValid === false || isPasswordValid === false}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <div className="text-center pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{' '}
                  <Link to="/signup" className="text-primary hover:underline font-semibold">
                    Criar conta
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;