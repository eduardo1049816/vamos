import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Dumbbell, Target, Repeat, PlayCircle } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

// Fallback data if DB is empty
const FALLBACK_EXERCISES = [
  { id: '1', name: 'Supino Reto', muscleGroup: 'Peito', series: 4, reps: 10, description: 'Exercício base para desenvolvimento do peitoral maior. Deite no banco, desça a barra até o peito e empurre.', imageUrl: '' },
  { id: '2', name: 'Crucifixo', muscleGroup: 'Peito', series: 3, reps: 12, description: 'Focado em isolar o peitoral. Use halteres, abra os braços sentindo o alongamento do músculo.', imageUrl: '' },
  { id: '3', name: 'Puxada Frontal', muscleGroup: 'Costas', series: 4, reps: 12, description: 'Ótimo para o grande dorsal. Puxe a barra em direção ao peito estufando o tórax.', imageUrl: '' },
  { id: '4', name: 'Remada Curvada', muscleGroup: 'Costas', series: 4, reps: 10, description: 'Trabalha a espessura das costas. Mantenha a lombar reta e puxe a barra em direção ao umbigo.', imageUrl: '' },
  { id: '5', name: 'Agachamento Livre', muscleGroup: 'Pernas', series: 4, reps: 10, description: 'O rei dos exercícios de perna. Mantenha os calcanhares no chão e desça controlando o movimento.', imageUrl: '' },
  { id: '6', name: 'Leg Press 45', muscleGroup: 'Pernas', series: 4, reps: 12, description: 'Excelente construtor de quadríceps. Não trave totalmente os joelhos na fase final.', imageUrl: '' },
  { id: '7', name: 'Desenvolvimento', muscleGroup: 'Ombros', series: 3, reps: 12, description: 'Foco na porção anterior e medial do deltoide.', imageUrl: '' },
  { id: '8', name: 'Rosca Direta', muscleGroup: 'Braços', series: 3, reps: 15, description: 'Isolador para bíceps. Mantenha os cotovelos fixos ao lado do corpo.', imageUrl: '' },
  { id: '9', name: 'Tríceps Corda', muscleGroup: 'Braços', series: 4, reps: 12, description: 'Isolador para tríceps. Abra a corda no final do movimento para contração máxima.', imageUrl: '' },
  { id: '10', name: 'Prancha', muscleGroup: 'Core', series: 3, reps: 60, description: 'Exercício isométrico para fortalecimento total do core.', imageUrl: '' },
];

const MUSCLE_GROUPS = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços', 'Core'];

const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [selectedMuscle, setSelectedMuscle] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    let filtered = exercises;
    if (selectedMuscle !== 'Todos') {
      filtered = filtered.filter(ex => ex.muscleGroup === selectedMuscle);
    }
    if (searchQuery) {
      filtered = filtered.filter(ex => 
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredExercises(filtered);
  }, [exercises, selectedMuscle, searchQuery]);

  const fetchExercises = async () => {
    try {
      const records = await pb.collection('exercises').getFullList({ sort: 'name', $autoCancel: false });
      
      if (records.length === 0) {
        setExercises(FALLBACK_EXERCISES);
      } else {
        // Map PB muscle groups from English to Portuguese if needed, but assuming DB matches exactly what we filter
        setExercises(records);
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setExercises(FALLBACK_EXERCISES);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Exercícios - FitHub Academy</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Catálogo de Exercícios</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Explore centenas de exercícios organizados por grupo muscular. Encontre a execução perfeita para maximizar seus resultados.
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-card p-4 rounded-2xl shadow-sm border border-border mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar exercício..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-end w-full">
                {MUSCLE_GROUPS.map((muscle) => (
                  <Button
                    key={muscle}
                    variant={selectedMuscle === muscle ? 'default' : 'outline'}
                    onClick={() => setSelectedMuscle(muscle)}
                    className="rounded-full text-sm"
                  >
                    {muscle}
                  </Button>
                ))}
              </div>
            </div>

            {/* Exercise Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 bg-muted rounded-xl animate-pulse"></div>)}
              </div>
            ) : filteredExercises.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises.map((exercise) => (
                  <div 
                    key={exercise.id} 
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-lg transition-all cursor-pointer group"
                    onClick={() => setSelectedExercise(exercise)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Dumbbell className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <span className="bg-muted px-3 py-1 rounded-full text-xs font-semibold text-muted-foreground">
                        {exercise.muscleGroup}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{exercise.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Target className="w-4 h-4"/> {exercise.series || 4} Séries</span>
                      <span className="flex items-center gap-1"><Repeat className="w-4 h-4"/> {exercise.reps || 12} Reps</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
                <Dumbbell className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">Nenhum exercício encontrado</h3>
                <p className="text-muted-foreground">Tente buscar por outro nome ou mudar o grupo muscular.</p>
              </div>
            )}
          </div>
        </main>

        <Footer />

        {/* Detail Modal */}
        <Dialog open={!!selectedExercise} onOpenChange={() => setSelectedExercise(null)}>
          <DialogContent className="sm:max-w-2xl">
            {selectedExercise && (
              <>
                <DialogHeader className="pb-4 border-b border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {selectedExercise.muscleGroup}
                    </span>
                  </div>
                  <DialogTitle className="text-3xl font-extrabold">{selectedExercise.name}</DialogTitle>
                </DialogHeader>
                
                <div className="py-4 space-y-6">
                  {/* Image/Video placeholder */}
                  <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center overflow-hidden relative">
                    {selectedExercise.image || selectedExercise.imageUrl ? (
                      <img src={selectedExercise.imageUrl || pb.files.getUrl(selectedExercise, selectedExercise.image)} alt={selectedExercise.name} className="w-full h-full object-cover opacity-80" />
                    ) : (
                      <>
                        <Dumbbell className="w-20 h-20 text-muted-foreground opacity-20 absolute" />
                        <PlayCircle className="w-12 h-12 text-primary relative z-10" />
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-xl text-center">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Séries Recomendadas</p>
                      <p className="text-3xl font-black text-foreground">{selectedExercise.series || 4}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-xl text-center">
                      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Repetições</p>
                      <p className="text-3xl font-black text-foreground">{selectedExercise.reps || 12}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-lg mb-2">Instruções de Execução</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {selectedExercise.description || 'Siga o movimento demonstrado mantendo o controle na fase excêntrica e concêntrica. Respire de forma ritmada e não utilize impulsos.'}
                    </p>
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

export default ExercisesPage;