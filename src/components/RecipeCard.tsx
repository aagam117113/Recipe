import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { extractRecipeId, formatCookingTime, truncateText } from '../utils/helpers';
import { useRecipeContext } from '../contexts/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { isFavorite, addFavorite, removeFavorite } = useRecipeContext();
  const recipeId = extractRecipeId(recipe.uri);
  const favorite = isFavorite(recipe.uri);

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to detail page
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(recipe.uri);
    } else {
      addFavorite(recipe);
    }
  };

  return (
    <Link
      to={`/recipe/${recipeId}`}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col h-full"
    >
      <div className="relative">
        <img 
          src={recipe.image}
          alt={recipe.label}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-all duration-300"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            size={18} 
            className={favorite ? "fill-red-500 text-red-500" : "text-gray-500"}
          />
        </button>
        {recipe.dietLabels.length > 0 && (
          <div className="absolute bottom-3 left-3">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {recipe.dietLabels[0]}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-gray-800 group-hover:text-orange-500 transition-colors duration-300">
            {truncateText(recipe.label, 24)}
          </h3>
        </div>
        
        <div className="mt-1 mb-3 flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-1" />
          <span>
            {formatCookingTime(recipe.totalTime || 0)}
          </span>
          {recipe.cuisineType && recipe.cuisineType.length > 0 && (
            <span className="ml-3 capitalize">
              {recipe.cuisineType[0]}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {truncateText(recipe.ingredientLines.length + " ingredients", 100)}
        </p>
        
        <div className="mt-auto flex flex-wrap gap-1">
          {recipe.mealType && recipe.mealType.slice(0, 2).map((type, index) => (
            <span 
              key={index}
              className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;