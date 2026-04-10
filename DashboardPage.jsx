import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scale, TrendingUp, Dumbbell, Utensils, Activity, Lightbulb } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const DAILY_TIPS = [
  "A hidratação é fundamental! Tente beber pelo menos 2,5 litros de água hoje.",
  "A consistência supera a intensidade. Aparecer para treinar já é metade da batalha.",
  "Não pule o aquecimento. Ele previne lesões e melhora seu desempenho.",
  "Proteína é essencial para a recuperação. Garanta suas metas diárias."
];

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [weightHistory, setWeightHistory] = useState([]);
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {
    fetchWeightHistory();
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    setDailyTip(DAILY_TIPS[dayOfYear % DAILY_TIPS.length]);
  }, []);

  const fetchWeightHistory = async () => {
    try {
      const records = await pb.collection('weight_history').getFullList({
        filter: `userId = "${currentUser.id}"`,
        sort: 'date',
        $autoCancel: false
      });
      setWeightHistory(records.slice(-7)); // Last 7 entries
    } catch (error) {
      console.error('Error fetching weight history:', error);
    }
  };

  const calculateBMI = () => {
    if (!currentUser?.weight || !currentUser?.height) return null;
    const h = currentUser.height / 100;
    return (currentUser.weight / (h * h)).toFixed(1);
  };

  const bmi = calculateBMI();

  const getBMIStatus = (val) => {
    if (!val) return { text: 'N/A', color: 'text-muted-foreground', bg: 'bg-muted' };
    if (val < 18.5) return { text: 'Abaixo do peso', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    if (val < 25) return { text: 'Peso normal', color: 'text-emerald-500', bg: 'bg-emerald-500/10' };
    if (val < 30) return { text: 'Sobrepeso', color: 'text-amber-500', bg: 'bg-amber-500/10' };
    return { text: 'Obesidade', color: 'text-red-500', bg: 'bg-red-500/10' };
  };

  const bmiStatus = getBMIStatus(bmi);

  const chartData = weightHistory.map(record => ({
    date: new Date(record.date).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' }),
    weight: record.weight
  }));

  const workoutDays = [
    { day: 'A', focus: 'Peito e Tríceps', desc: 'Supino, Crucifixo, Tríceps Pulley' },
    { day: 'B', focus: 'Costas e Bíceps', desc: 'Puxada, Remada, Rosca Direta' },
    { day: 'C', focus: 'Pernas e Panturrilhas', desc: 'Agachamento, Leg Press, Extensora' },
    { day: 'D', focus: 'Ombros e Abdômen', desc: 'Desenvolvimento, Elevação Lateral, Prancha' }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header Greeting */}
            <div className="mb-10 animate-in slide-in-from-top-4">
              <h1 className="text-4xl font-extrabold mb-2">Bem-vindo, {currentUser?.name?.split(' ')[0] || 'Atleta'}!</h1>
              <p className="text-muted-foreground text-lg">Acompanhe seu progresso e mantenha o foco.</p>
            </div>

            {/* Daily Tip */}
            <div className="bg-card border border-border rounded-2xl p-5 flex items-start gap-4 mb-10 shadow-sm">
              <div className="bg-primary/20 rounded-xl p-3 shrink-0">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground mb-1 uppercase tracking-wider text-sm">Dica do Dia</h4>
                <p className="text-foreground/80">{dailyTip}</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="shadow-md border-border/50 hover:-translate-y-1 transition-transform">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Peso Atual</p>
                      <h3 className="text-3xl font-black">{currentUser?.weight ? `${currentUser.weight} kg` : '--'}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Scale className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-md border-border/50 hover:-translate-y-1 transition-transform">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Altura</p>
                      <h3 className="text-3xl font-black">{currentUser?.height ? `${currentUser.height} cm` : '--'}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Activity className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`shadow-md border-border/50 hover:-translate-y-1 transition-transform ${bmiStatus.bg}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">IMC (Índice de Massa)</p>
                      <h3 className={`text-3xl font-black ${bmiStatus.color}`}>{bmi || '--'}</h3>
                      <p className={`text-sm font-bold mt-1 ${bmiStatus.color}`}>{bmiStatus.text}</p>
                    </div>
                    <div className={`w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center`}>
                      <TrendingUp className={`w-6 h-6 ${bmiStatus.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Workout Plan */}
              <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-md border-border/50 h-full">
                  <CardHeader className="border-b border-border/50 pb-4">
                    <CardTitle className="text-xl">Seu Treino Recomendado</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {workoutDays.map((day) => (
                        <div key={day.day} className="flex items-start gap-4 p-4 rounded-xl bg-muted hover:bg-accent transition-colors border border-transparent hover:border-primary/20">
                          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center shrink-0">
                            <span className="font-bold text-primary">{day.day}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{day.focus}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{day.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Chart and Quick Links */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Evolution Chart */}
                <Card className="shadow-md border-border/50">
                  <CardHeader className="border-b border-border/50 pb-4">
                    <CardTitle className="text-xl">Evolução de Peso</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    {weightHistory.length > 0 ? (
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 12}} tickLine={false} axisLine={false} dy={10} />
                            <YAxis stroke="hsl(var(--muted-foreground))" tick={{fontSize: 12}} domain={['dataMin - 2', 'dataMax + 2']} tickLine={false} axisLine={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }}
                              itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="weight" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={3}
                              dot={{ fill: 'hsl(var(--background))', stroke: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                              animationDuration={1500}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-72 flex flex-col items-center justify-center bg-muted/50 rounded-xl border border-dashed border-border text-center p-6">
                        <Scale className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                        <p className="text-muted-foreground font-medium">Sem dados suficientes para gerar o gráfico.</p>
                        <Link to="/profile">
                          <Button variant="link" className="mt-2 text-primary">Adicionar primeira medição</Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Link to="/exercises">
                    <Card className="shadow-sm border-border hover:border-primary/50 hover:shadow-primary/10 transition-all group h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Dumbbell className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Ver Exercícios</h4>
                          <p className="text-sm text-muted-foreground">Catálogo completo</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/diets">
                    <Card className="shadow-sm border-border hover:border-primary/50 hover:shadow-primary/10 transition-all group h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Utensils className="w-7 h-7 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">Explorar Dietas</h4>
                          <p className="text-sm text-muted-foreground">Planos nutricionais</p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
            
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;