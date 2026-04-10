import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flame, CheckCircle, UtensilsCrossed } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const FALLBACK_DIETS = [
  { id: '1', name: 'Ganho de Massa', objective: 'Hipertrofia', planType: 'Premium', dailyCalories: 3200, protein: 180, carbs: 400, fats: 80, description: 'Plano com alto superávit calórico, focado em proteínas de alto valor biológico e carboidratos complexos.', recommendedFoods: 'Ovos, Carne vermelha magra, Frango, Arroz, Macarrão, Aveia, Pasta de amendoim, Whey Protein.', dailyMenu: 'Café: Ovos, Aveia, Frutas\nAlmoço: Arroz, Feijão, Carne, Salada\nPré-treino: Banana, Whey\nPós-treino: Macarrão, Frango\nJantar: Arroz, Ovos' },
  { id: '2', name: 'Ganho de Massa', objective: 'Hipertrofia', planType: 'Econômico', dailyCalories: 3000, protein: 160, carbs: 450, fats: 70, description: 'Plano eficiente e focado no custo-benefício para hipertrofia.', recommendedFoods: 'Ovos, Frango, Arroz, Feijão, Aveia, Leite integral, Banana.', dailyMenu: 'Café: Pão francês, Ovos, Leite\nAlmoço: Arroz, Feijão, Frango\nLanche: Banana, Aveia\nJantar: Arroz, Ovos' },
  { id: '3', name: 'Perda de Peso', objective: 'Emagrecimento', planType: 'Premium', dailyCalories: 1800, protein: 160, carbs: 120, fats: 60, description: 'Déficit calórico agressivo mas preservando massa magra. Rico em fibras e alimentos com alta saciedade.', recommendedFoods: 'Peixes brancos, Peito de frango, Vegetais folhosos, Frutas vermelhas, Castanhas, Iogurte proteico.', dailyMenu: 'Café: Ovos, Mamão, Iogurte\nAlmoço: Peixe, Salada rica, Brócolis\nLanche: Castanhas, Whey\nJantar: Frango, Vegetais' },
  { id: '4', name: 'Perda de Peso', objective: 'Emagrecimento', planType: 'Econômico', dailyCalories: 1900, protein: 140, carbs: 150, fats: 60, description: 'Plano acessível para secar, utilizando ingredientes de baixo custo.', recommendedFoods: 'Ovos, Frango, Repolho, Alface, Maçã, Leite desnatado.', dailyMenu: 'Café: Ovos, Pão integral\nAlmoço: Frango, Salada, Pouco Arroz\nLanche: Maçã, Leite\nJantar: Ovos, Salada' },
  { id: '5', name: 'Manutenção', objective: 'Recomposição', planType: 'Premium', dailyCalories: 2500, protein: 160, carbs: 250, fats: 80, description: 'Manter o peso enquanto melhora a composição corporal.', recommendedFoods: 'Salmão, Carnes nobres, Batata doce, Abacate, Variedade de frutas.', dailyMenu: 'Café: Panqueca de aveia\nAlmoço: Salmão, Batata doce\nLanche: Abacate, Whey\nJantar: Frango, Salada variada' },
  { id: '6', name: 'Manutenção', objective: 'Recomposição', planType: 'Econômico', dailyCalories: 2400, protein: 150, carbs: 280, fats: 70, description: 'Plano base para manter a forma física de forma econômica.', recommendedFoods: 'Ovos, Carnes moídas magras, Mandioca, Frutas da estação.', dailyMenu: 'Café: Ovos, Banana\nAlmoço: Carne moída, Mandioca\nLanche: Fruta da estação\nJantar: Ovos, Salada' },
];

const DietsPage = () => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiets();
  }, []);

  const fetchDiets = async () => {
    try {
      const records = await pb.collection('diets').getFullList({ sort: 'name', $autoCancel: false });
      if (records.length === 0) {
        setDiets(FALLBACK_DIETS);
      } else {
        setDiets(records);
      }
    } catch (error) {
      console.error('Error fetching diets:', error);
      setDiets(FALLBACK_DIETS);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dietas - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Planos Nutricionais</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Encontre a dieta perfeita para o seu objetivo e bolso. Selecionamos planos detalhados para garantir que sua nutrição impulsione seus treinos.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-96 bg-muted rounded-2xl animate-pulse"></div>)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {diets.map((diet) => (
                  <div 
                    key={diet.id} 
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full group"
                  >
                    {/* Card Header matching Premium/Econômico */}
                    <div className={`p-6 ${diet.planType === 'Premium' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${diet.planType === 'Premium' ? 'bg-black/20' : 'bg-background border border-border'}`}>
                          {diet.planType}
                        </span>
                        <UtensilsCrossed className="w-6 h-6 opacity-80" />
                      </div>
                      <h3 className="text-2xl font-bold mb-1">{diet.name}</h3>
                      <p className="opacity-90 font-medium">{diet.objective}</p>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-6">
                        <Flame className="w-6 h-6 text-primary" />
                        <span className="text-3xl font-black text-foreground">{diet.dailyCalories}</span>
                        <span className="text-muted-foreground font-medium">kcal/dia</span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 mb-8">
                        <div className="bg-muted/50 p-3 rounded-lg text-center border border-border/50">
                          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">PROT</p>
                          <p className="font-bold">{diet.protein}g</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg text-center border border-border/50">
                          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">CARB</p>
                          <p className="font-bold">{diet.carbs}g</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-lg text-center border border-border/50">
                          <p className="text-xs text-muted-foreground uppercase font-bold mb-1">GORD</p>
                          <p className="font-bold">{diet.fats}g</p>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Button 
                          onClick={() => setSelectedDiet(diet)} 
                          className="w-full h-12 font-bold"
                          variant={diet.planType === 'Premium' ? 'default' : 'outline'}
                        >
                          Ver Detalhes do Plano
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        <Footer />

        {/* Details Modal */}
        <Dialog open={!!selectedDiet} onOpenChange={() => setSelectedDiet(null)}>
          <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedDiet && (
              <>
                <DialogHeader className="pb-6 border-b border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedDiet.planType === 'Premium' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground border border-border'}`}>
                      {selectedDiet.planType}
                    </span>
                    <span className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{selectedDiet.objective}</span>
                  </div>
                  <DialogTitle className="text-4xl font-extrabold">{selectedDiet.name}</DialogTitle>
                </DialogHeader>
                
                <div className="py-6 space-y-8">
                  {/* Macros Summary */}
                  <div className="bg-secondary text-secondary-foreground rounded-2xl p-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Flame className="w-8 h-8 text-primary" />
                      <div>
                        <p className="text-sm opacity-80 uppercase font-bold">Meta Diária</p>
                        <p className="text-3xl font-black text-primary">{selectedDiet.dailyCalories} kcal</p>
                      </div>
                    </div>
                    <div className="flex gap-6">
                      <div>
                        <p className="text-sm opacity-80 uppercase font-bold">Proteínas</p>
                        <p className="text-xl font-bold">{selectedDiet.protein}g</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80 uppercase font-bold">Carboidratos</p>
                        <p className="text-xl font-bold">{selectedDiet.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-sm opacity-80 uppercase font-bold">Gorduras</p>
                        <p className="text-xl font-bold">{selectedDiet.fats}g</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-bold text-xl mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" /> 
                      Sobre o Plano
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {selectedDiet.description}
                    </p>
                  </div>

                  {/* Recommended Foods */}
                  <div className="bg-muted/50 border border-border p-6 rounded-2xl">
                    <h4 className="font-bold text-xl mb-4">Alimentos Recomendados</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedDiet.recommendedFoods.split(',').map((food, i) => (
                        <li key={i} className="flex items-center gap-2 text-foreground font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {food.trim()}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Daily Menu */}
                  <div>
                    <h4 className="font-bold text-xl mb-4">Exemplo de Cardápio Diário</h4>
                    <div className="space-y-3">
                      {selectedDiet.dailyMenu.split('\n').map((meal, i) => {
                        const [time, items] = meal.split(':');
                        if (!items) return <p key={i}>{meal}</p>;
                        return (
                          <div key={i} className="flex flex-col md:flex-row md:items-center gap-2 p-4 bg-background border border-border rounded-xl">
                            <span className="font-bold text-primary w-24">{time}</span>
                            <span className="text-muted-foreground">{items}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default DietsPage;