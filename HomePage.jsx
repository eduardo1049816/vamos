import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dumbbell, Utensils, LineChart, Users, ChevronRight, Star } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>FitHub Academy - Transform Your Body, Transform Your Life</title>
        <meta name="description" content="Join FitHub Academy for personalized workouts, diet plans, and progress tracking." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          {/* Hero Section with Parallax Background */}
          <section className="relative min-h-[90vh] flex items-center justify-center bg-parallax overflow-hidden" 
                   style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1673922553727-fe98ea114d5e)' }}>
            <div className="absolute inset-0 bg-black/70" /> {/* Dark Overlay */}
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white animate-in fade-in slide-in-from-bottom-8 duration-1000">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wider uppercase mb-6">
                Sua Evolução Começa Aqui
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight tracking-tighter">
                Transform Your Body,<br />
                <span className="text-transparent bg-clip-text gold-gradient">Transform Your Life</span>
              </h1>
              <p className="text-lg md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                Treinos personalizados, planos de dieta exclusivos e acompanhamento contínuo para você atingir sua melhor versão.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/signup">
                  <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-lg font-bold">
                    Começar Agora <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                    Conheça a Academia
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Features Section - 4 Cards */}
          <section className="py-24 bg-secondary text-secondary-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Nossos Pilares</h2>
                <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
                  Tudo o que você precisa para alcançar seus objetivos, reunido em uma única plataforma completa e intuitiva.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Dumbbell, title: 'Exercícios Personalizados', desc: 'Acesso a uma biblioteca completa de exercícios com instruções detalhadas.' },
                  { icon: Utensils, title: 'Planos de Dieta', desc: 'Dietas adaptadas para ganho de massa, perda de peso ou manutenção.' },
                  { icon: LineChart, title: 'Rastreamento de Progresso', desc: 'Acompanhe seu peso, medidas e evolução gráfica em tempo real.' },
                  { icon: Users, title: 'Comunidade', desc: 'Junte-se a milhares de membros focados nos mesmos objetivos que você.' }
                ].map((feature, idx) => (
                  <Card key={idx} className="bg-card text-card-foreground border-border hover:-translate-y-2 transition-transform duration-300">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                        <feature.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-24 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Histórias Reais</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Veja o que nossos alunos dizem sobre a experiência FitHub Academy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Lucas Mendes', role: 'Membro há 1 ano', text: '"A melhor decisão que tomei. A plataforma facilita o acompanhamento da dieta e dos treinos. Perdi 15kg com saúde."', initials: 'LM', color: 'bg-blue-500' },
                  { name: 'Mariana Costa', role: 'Membro há 6 meses', text: '"Os planos de hipertrofia são incríveis. Ganhei massa magra de forma consistente e o gráfico de progresso me mantém motivada."', initials: 'MC', color: 'bg-purple-500' },
                  { name: 'Ricardo Silva', role: 'Membro há 2 anos', text: '"A funcionalidade de buscar exercícios e ver a execução correta mudou meu treino. Recomendo para todos, do iniciante ao avançado."', initials: 'RS', color: 'bg-emerald-500' }
                ].map((testimonial, idx) => (
                  <Card key={idx} className="bg-card border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex gap-1 text-primary mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                      </div>
                      <p className="text-foreground/80 italic mb-8 leading-relaxed text-lg">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${testimonial.color}`}>
                          {testimonial.initials}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Pronto para iniciar sua jornada?
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
                Crie sua conta gratuitamente hoje e tenha acesso a ferramentas exclusivas para transformar seu corpo.
              </p>
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="h-14 px-10 text-lg font-bold shadow-xl hover:scale-105 transition-transform">
                  Criar Conta Grátis
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;