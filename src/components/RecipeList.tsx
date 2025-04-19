import React from 'react';
import { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';
import { RecipeCardSkeleton } from './SkeletonLoader';

interface RecipeListProps {
  recipes: Recipe[];
  loading: boolean;
  emptyMessage?: string;
}

const RecipeList: React.FC<RecipeListProps> = ({ 
  recipes, 
  loading, 
  emptyMessage = "No recipes found. Try a different search term." 
}) => {
  if (loading) {
    return <RecipeCardSkeleton count={6} />;
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl text-gray-600 mb-4">{emptyMessage}</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.uri} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;