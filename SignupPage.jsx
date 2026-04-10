import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const validateEmail = (email) => {
  return String(email).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Real-time validations
  const isNameValid = formData.name.length >= 2;
  const isEmailValid = formData.email === '' ? null : validateEmail(formData.email);
  const isPasswordMatch = formData.passwordConfirm === '' ? null : formData.password === formData.passwordConfirm;

  useEffect(() => {
    const pass = formData.password;
    let score = 0;
    if (!pass) {
      setPasswordStrength(0);
      return;
    }
    if (pass.length >= 8) score += 1;
    if (pass.match(/[A-Z]/)) score += 1;
    if (pass.match(/[0-9]/)) score += 1;
    if (pass.match(/[^A-Za-z0-9]/)) score += 1;
    setPasswordStrength(score);
  }, [formData.password]);

  const getStrengthConfig = () => {
    if (passwordStrength === 0) return { color: 'bg-muted', text: '', labelColor: 'text-muted-foreground' };
    if (passwordStrength <= 1) return { color: 'bg-destructive', text: 'Fraca', labelColor: 'text-destructive' };
    if (passwordStrength === 2) return { color: 'bg-amber-500', text: 'Média', labelColor: 'text-amber-500' };
    return { color: 'bg-emerald-500', text: 'Forte', labelColor: 'text-emerald-500' };
  };

  const strength = getStrengthConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isNameValid || !isEmailValid || !isPasswordMatch || passwordStrength === 0) {
      setError('Por favor, preencha todos os campos corretamente.');
      return;
    }

    setLoading(true);
    const result = await signup(
      formData.email,
      formData.password,
      formData.passwordConfirm,
      formData.name
    );
    setLoading(false);

    if (result.success) {
      toast.success('Conta criada com sucesso!');
      navigate('/dashboard');
    } else {
      setError(result.error || 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Criar Conta - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-muted relative px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

        <Card className="w-full max-w-md shadow-2xl border-border/50 relative z-10 glass-panel">
          <CardHeader className="text-center pb-6">
            <Link to="/" className="inline-block">
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg hover:scale-105 transition-transform">
                <Dumbbell className="w-8 h-8 text-primary" />
              </div>
            </Link>
            <CardTitle className="text-3xl font-bold tracking-tight">Criar Conta</CardTitle>
            <p className="text-muted-foreground mt-2">Inicie sua transformação hoje</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-destructive/15 border border-destructive/30 text-destructive text-sm p-4 rounded-lg flex items-start gap-3 animate-in fade-in">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`text-foreground bg-background transition-colors ${
                    formData.name && isNameValid ? 'border-green-500 focus-visible:ring-green-500' : ''
                  }`}
                />
              </div>

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
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="text-foreground bg-background"
                />
                {/* Strength Meter */}
                <div className="pt-2">
                  <div className="flex gap-2 h-2 mb-2">
                    {[1, 2, 3, 4].map((level) => (
                      <div 
                        key={level} 
                        className={`flex-1 rounded-full transition-colors duration-300 ${
                          passwordStrength >= level ? strength.color : 'bg-border'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-xs font-medium">
                    <span className="text-muted-foreground">Força da senha:</span>
                    <span className={strength.labelColor}>{strength.text}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">Confirmar Senha</Label>
                <div className="relative">
                  <Input
                    id="passwordConfirm"
                    type="password"
                    placeholder="Repita sua senha"
                    value={formData.passwordConfirm}
                    onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                    className={`text-foreground bg-background transition-colors pr-10 ${
                      isPasswordMatch === false ? 'border-destructive focus-visible:ring-destructive' : 
                      isPasswordMatch === true ? 'border-green-500 focus-visible:ring-green-500' : ''
                    }`}
                  />
                  {isPasswordMatch === true && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-bold mt-2" 
                disabled={loading || !isNameValid || !isEmailValid || !isPasswordMatch || passwordStrength === 0}
              >
                {loading ? 'Criando...' : 'Criar Conta'}
              </Button>

              <div className="text-center pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="text-primary hover:underline font-semibold">
                    Faça login
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

export default SignupPage;