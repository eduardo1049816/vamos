import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import pb from '@/lib/pocketbaseClient';

const ExerciseCard = ({ exercise, onClick }) => {
  const imageUrl = exercise.image 
    ? pb.files.getUrl(exercise, exercise.image, { thumb: '300x200' })
    : null;

  return (
    <Card 
      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(exercise)}
    >
      <div className="aspect-video bg-muted relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={exercise.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <span className="text-4xl font-bold text-primary/30">{exercise.name.charAt(0)}</span>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg leading-tight">{exercise.name}</h3>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {exercise.muscleGroup}
          </Badge>
        </div>
        {exercise.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {exercise.description}
          </p>
        )}
        {(exercise.series || exercise.reps) && (
          <div className="flex gap-4 text-sm text-muted-foreground">
            {exercise.series && <span>{exercise.series} sets</span>}
            {exercise.reps && <span>{exercise.reps} reps</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExerciseCard;