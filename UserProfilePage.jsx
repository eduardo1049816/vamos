import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useAuth } from '@/contexts/AuthContext.jsx';
import pb from '@/lib/pocketbaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { User, Scale, Ruler, History } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const UserProfilePage = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });
  const [measurements, setMeasurements] = useState({
    weight: currentUser?.weight || '',
    height: currentUser?.height || ''
  });
  const [weightHistory, setWeightHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [measLoading, setMeasLoading] = useState(false);

  useEffect(() => {
    fetchWeightHistory();
  }, []);

  const fetchWeightHistory = async () => {
    try {
      const records = await pb.collection('weight_history').getFullList({
        filter: `userId = "${currentUser.id}"`,
        sort: '-date',
        $autoCancel: false
      });
      setWeightHistory(records);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateUserProfile({ name: profileData.name });
    setLoading(false);
    if (result.success) {
      toast.success('Perfil atualizado com sucesso!');
    } else {
      toast.error('Erro ao atualizar perfil.');
    }
  };

  const handleMeasurementsUpdate = async (e) => {
    e.preventDefault();
    if (!measurements.weight || !measurements.height) {
      toast.error('Preencha peso e altura.');
      return;
    }
    
    setMeasLoading(true);
    try {
      const weightNum = parseFloat(measurements.weight);
      const heightNum = parseFloat(measurements.height);

      // Update user
      await updateUserProfile({ weight: weightNum, height: heightNum });

      // Add to history if weight changed or it's a new day (simplified logic here: just add entry)
      const today = new Date().toISOString().split('T')[0] + ' 12:00:00.000Z';
      
      await pb.collection('weight_history').create({
        userId: currentUser.id,
        weight: weightNum,
        date: today
      }, { $autoCancel: false });

      toast.success('Medidas atualizadas com sucesso!');
      fetchWeightHistory();
    } catch (err) {
      toast.error('Erro ao salvar medidas.');
    } finally {
      setMeasLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Meu Perfil - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Configurações da Conta</h1>
              <p className="text-muted-foreground mt-1">Gerencie seus dados pessoais e acompanhe suas medidas.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Forms */}
              <div className="space-y-8">
                
                {/* Personal Data */}
                <Card className="shadow-md border-border">
                  <CardHeader className="bg-muted/30 border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <CardTitle>Dados Pessoais</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleProfileUpdate} className="space-y-5">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail (Não editável)</Label>
                        <Input
                          id="email"
                          value={profileData.email}
                          disabled
                          className="bg-muted text-muted-foreground"
                        />
                      </div>
                      <Button type="submit" disabled={loading} className="w-full">
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Measurements */}
                <Card className="shadow-md border-border">
                  <CardHeader className="bg-muted/30 border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <Scale className="w-5 h-5 text-primary" />
                      <CardTitle>Medidas Atuais</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <form onSubmit={handleMeasurementsUpdate} className="space-y-5">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="weight">Peso (kg)</Label>
                          <div className="relative">
                            <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="weight"
                              type="number"
                              step="0.1"
                              min="30"
                              max="300"
                              value={measurements.weight}
                              onChange={(e) => setMeasurements({ ...measurements, weight: e.target.value })}
                              className="pl-10"
                              placeholder="0.0"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="height">Altura (cm)</Label>
                          <div className="relative">
                            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              id="height"
                              type="number"
                              step="1"
                              min="100"
                              max="250"
                              value={measurements.height}
                              onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                              className="pl-10"
                              placeholder="0"
                            />
                          </div>
                        </div>
                      </div>
                      <Button type="submit" disabled={measLoading} className="w-full" variant="secondary">
                        {measLoading ? 'Atualizando...' : 'Atualizar Medidas'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column: History Table */}
              <div>
                <Card className="shadow-md border-border h-full flex flex-col">
                  <CardHeader className="bg-muted/30 border-b border-border pb-4">
                    <div className="flex items-center gap-3">
                      <History className="w-5 h-5 text-primary" />
                      <div>
                        <CardTitle>Histórico de Peso</CardTitle>
                        <CardDescription className="mt-1">Acompanhamento das suas últimas medições.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6 flex-1">
                    {weightHistory.length > 0 ? (
                      <div className="border border-border rounded-lg overflow-hidden">
                        <table className="w-full text-sm text-left">
                          <thead className="bg-muted text-muted-foreground">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Data</th>
                              <th className="px-4 py-3 font-semibold text-right">Peso (kg)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border">
                            {weightHistory.map((entry) => (
                              <tr key={entry.id} className="bg-card hover:bg-muted/50 transition-colors">
                                <td className="px-4 py-3 font-medium">
                                  {new Date(entry.date).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-primary">
                                  {entry.weight.toFixed(1)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="h-full min-h-[200px] flex flex-col items-center justify-center text-muted-foreground bg-muted/30 rounded-lg border border-dashed border-border">
                        <History className="w-10 h-10 mb-3 opacity-50" />
                        <p>Nenhum registro de peso encontrado.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default UserProfilePage;