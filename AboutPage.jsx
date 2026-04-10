import React from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, MapPin, Target, ShieldCheck, Dumbbell, Users } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const AboutPage = () => {
  const facilities = [
    { icon: Dumbbell, title: 'Máquinas Modernas', desc: 'Equipamentos de última geração com manutenção preventiva constante.' },
    { icon: ShieldCheck, title: 'Ambiente Climatizado', desc: 'Temperatura ideal para garantir o conforto durante todo o treino.' },
    { icon: Target, title: 'Profissionais Certificados', desc: 'Equipe altamente qualificada para suporte e instrução correta.' },
    { icon: Users, title: 'Comunidade Ativa', desc: 'Eventos mensais e aulas coletivas exclusivas para membros.' }
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nós - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1">
          
          {/* Mission Hero Section */}
          <section className="relative py-24 bg-secondary text-secondary-foreground overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="w-full h-full bg-parallax" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1618355281346-66ac1663917d)' }} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
            
            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
              <span className="text-primary font-bold uppercase tracking-widest mb-4 block">Nossa Missão</span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-balance">
                Transformar vidas através do fitness
              </h1>
              <p className="text-xl opacity-80 leading-relaxed text-balance">
                Acreditamos que um corpo forte constrói uma mente forte. Entregamos a melhor estrutura e metodologia para você alcançar seus resultados.
              </p>
            </div>
          </section>

          {/* History */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <h2 className="text-4xl font-bold">Nossa História</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Fundada em 2018, a FitHub Academy nasceu da paixão por resultados reais. Começamos como um pequeno estúdio de treinamento funcional e rapidamente crescemos para nos tornar referência em saúde e estética.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed font-semibold text-primary">
                    Desde a nossa fundação, já transformamos 2.847 vidas com nossa metodologia.
                  </p>
                </div>
                <div className="flex-1">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-card">
                    <img 
                      src="https://images.unsplash.com/photo-1685633224597-294ff1adfd6f" 
                      alt="Interior da academia" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="py-24 bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-4">Nossa Equipe</h2>
              <p className="text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
                Conheça os especialistas dedicados a guiar você em cada etapa da sua jornada.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Rafael Torres', role: 'Head Coach', spec: 'Especialista em Hipertrofia e Força' },
                  { name: 'Camila Alves', role: 'Nutricionista Esportiva', spec: 'Especialista em Recomposição Corporal' },
                  { name: 'Diego Martins', role: 'Treinador Funcional', spec: 'Especialista em Condicionamento e HIIT' }
                ].map((member, i) => (
                  <Card key={i} className="bg-card border-none shadow-lg overflow-hidden group">
                    <div className="aspect-square relative overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1618355281346-66ac1663917d" 
                        alt="Trainer" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full p-6 text-left">
                        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-primary font-bold">{member.role}</p>
                      </div>
                    </div>
                    <CardContent className="p-6 text-left">
                      <p className="text-muted-foreground font-medium">{member.spec}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Facilities */}
          <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-center mb-16">Nossa Estrutura</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {facilities.map((fac, i) => (
                  <div key={i} className="text-center p-6 border border-border rounded-2xl bg-card hover:border-primary transition-colors">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary">
                      <fac.icon className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-xl mb-3">{fac.title}</h3>
                    <p className="text-muted-foreground">{fac.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="py-24 bg-secondary text-secondary-foreground">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl font-bold mb-12">Entre em Contato</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">E-mail</h4>
                  <p className="text-secondary-foreground/70">contato@fithubacademy.com</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Telefone / WhatsApp</h4>
                  <p className="text-secondary-foreground/70">+55 (11) 99999-9999</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Endereço</h4>
                  <p className="text-secondary-foreground/70">Av. Paulista, 1000<br/>São Paulo, SP</p>
                </div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
};

export default AboutPage;