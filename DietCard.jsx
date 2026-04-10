import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const DietCard = ({ diet, onClick }) => {
  const getObjectiveIcon = () => {
    if (diet.objective === 'Ganho de Massa Muscular') return <TrendingUp className="w-4 h-4" />;
    if (diet.objective === 'Perda de Peso') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getObjectiveColor = () => {
    if (diet.objective === 'Ganho de Massa Muscular') return 'bg-green-500/10 text-green-700 border-green-500/20';
    if (diet.objective === 'Perda de Peso') return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
    return 'bg-gray-500/10 text-gray-700 border-gray-500/20';
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-xl">{diet.name}</CardTitle>
          <Badge variant={diet.planType === 'Premium' ? 'default' : 'secondary'} className="shrink-0">
            {diet.planType}
          </Badge>
        </div>
        <Badge variant="outline" className={`w-fit ${getObjectiveColor()}`}>
          <span className="flex items-center gap-1">
            {getObjectiveIcon()}
            {diet.objective}
          </span>
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {diet.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {diet.description}
          </p>
        )}
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Flame className="w-4 h-4 text-primary" />
            <span className="font-medium">{diet.dailyCalories} kcal/day</span>
          </div>
          
          {(diet.protein || diet.carbs || diet.fats) && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              {diet.protein && (
                <div className="bg-muted rounded-lg p-2 text-center">
                  <div className="font-semibold text-foreground">{diet.protein}g</div>
                  <div className="text-muted-foreground">Protein</div>
                </div>
              )}
              {diet.carbs && (
                <div className="bg-muted rounded-lg p-2 text-center">
                  <div className="font-semibold text-foreground">{diet.carbs}g</div>
                  <div className="text-muted-foreground">Carbs</div>
                </div>
              )}
              {diet.fats && (
                <div className="bg-muted rounded-lg p-2 text-center">
                  <div className="font-semibold text-foreground">{diet.fats}g</div>
                  <div className="text-muted-foreground">Fats</div>
                </div>
              )}
            </div>
          )}
        </div>

        <Button 
          onClick={() => onClick(diet)} 
          variant="outline" 
          className="w-full mt-auto"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default DietCard;