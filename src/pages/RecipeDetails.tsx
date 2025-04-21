import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Tag, ArrowLeft, Heart, Printer } from 'lucide-react';
import { Recipe } from '../types/recipe';
import { fetchRecipes } from '../utils/api';
import { formatCookingTime } from '../utils/helpers';
import { useRecipeContext } from '../contexts/RecipeContext';
import { RecipeDetailSkeleton } from '../components/SkeletonLoader';

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isFavorite, addFavorite, removeFavorite } = useRecipeContext();
  useEffect(() => {
    const loadRecipeDetails = async () => {
      if (!id) return;
  
      try {
        setLoading(true);
        setError('');
  
        const data = await fetchRecipes(''); // Pass an empty query to fetch all recipes
        const recipe = data.hits.find(hit => {
          const recipeId = hit.recipe.uri.split('#')[1];
          return recipeId === `recipe_${id}` || hit.recipe.uri === id;
        });
  
        if (!recipe) {
          throw new Error('Recipe not found');
        }
  
        setRecipe(recipe.recipe || null);
      } catch (err) {
        setError('Failed to load recipe details. Please try again later.');
        console.error('Error loading recipe details:', err);
      } finally {
        setLoading(false);
      }
    };
  
    loadRecipeDetails();
  }, [id]);
  const handleFavoriteToggle = () => {
    if (!recipe) return;
    
    if (isFavorite(recipe.uri)) {
      removeFavorite(recipe.uri);
    } else {
      addFavorite(recipe);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecipeDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="pt-20 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 text-red-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error || 'Recipe not found. It may have been removed or is unavailable.'}</p>
            <Link to="/" className="inline-flex items-center mt-4 text-red-800 hover:text-red-900">
              <ArrowLeft size={16} className="mr-1" /> Back to recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(recipe.uri);

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/" 
            className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span>Back to recipes</span>
          </Link>
          
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1 px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
              aria-label="Print recipe"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Print</span>
            </button>
            
            <button
              onClick={handleFavoriteToggle}
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                favorite 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart size={18} className={favorite ? 'fill-red-500' : ''} />
              <span className="hidden sm:inline">{favorite ? 'Favorited' : 'Favorite'}</span>
            </button>
          </div>
        </div>

        {/* Recipe Header */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/2">
              <img 
                src={recipe.image} 
                alt={recipe.label}
                className="h-64 md:h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8 md:w-1/2">
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{recipe.label}</h1>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.dietLabels.map((label, idx) => (
                  <span key={idx} className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {label}
                  </span>
                ))}
                {recipe.healthLabels.slice(0, 3).map((label, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                    {label}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-y-4 text-gray-600 mb-6">
                <div className="w-1/2 flex items-center">
                  <Clock size={18} className="mr-2 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold">Cook Time</p>
                    <p>{formatCookingTime(recipe.totalTime)}</p>
                  </div>
                </div>
                <div className="w-1/2 flex items-center">
                  <User size={18} className="mr-2 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold">Servings</p>
                    <p>{recipe.yield} servings</p>
                  </div>
                </div>
                <div className="w-1/2 flex items-center">
                  <Tag size={18} className="mr-2 text-orange-500" />
                  <div>
                    <p className="text-sm font-semibold">Cuisine</p>
                    <p>{recipe.cuisineType?.[0] || 'Not specified'}</p>
                  </div>
                </div>
                <div className="w-1/2 flex items-center">
                  <div className="rounded-full h-5 w-5 bg-orange-500 flex justify-center items-center mr-2 text-white font-bold text-xs">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Calories</p>
                    <p>{Math.round(recipe.calories)} kcal</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {recipe.mealType?.map((type, idx) => (
                  <span key={idx} className="bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">
                    {type}
                  </span>
                ))}
                {recipe.dishType?.map((type, idx) => (
                  <span key={idx} className="bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Ingredients */}
          <div className="lg:w-2/5">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ingredients</h2>
              <ul className="space-y-3">
                {recipe.ingredientLines.map((ingredient, idx) => (
                  <li key={idx} className="flex items-baseline">
                    <span className="bg-orange-500 rounded-full h-2 w-2 mr-2 mt-2 flex-shrink-0"></span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">Instructions</h2>
              <p className="text-gray-600 mb-4">
                Complete recipe instructions available at the source:
              </p>
              <a 
                href={recipe.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
              >
                View Full Recipe at {recipe.source}
              </a>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Nutrition</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Calories</p>
                    <p className="font-semibold">{Math.round(recipe.calories)} kcal</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Servings</p>
                    <p className="font-semibold">{recipe.yield}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Weight</p>
                    <p className="font-semibold">{Math.round(recipe.totalWeight)}g</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Meal Type</p>
                    <p className="font-semibold">{recipe.mealType?.[0] || 'Not specified'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;