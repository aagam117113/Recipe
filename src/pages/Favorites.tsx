import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Info } from 'lucide-react';
import RecipeList from '../components/RecipeList';
import { useRecipeContext } from '../contexts/RecipeContext';

const Favorites: React.FC = () => {
  const { favorites, clearSearchHistory } = useRecipeContext();

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex items-center mb-2">
            <Heart size={24} className="text-red-500 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Saved Recipes</h1>
          </div>
          <p className="text-gray-600 mb-8">
            Your favorite recipes saved in one place.
          </p>
          
          {favorites.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Info size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No favorites yet</h3>
              <p className="text-gray-600 mb-6">
                You haven't saved any recipes yet. When you find a recipe you love, click the heart icon to save it here.
              </p>
              <Link 
                to="/" 
                className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors"
              >
                Discover Recipes
              </Link>
            </div>
          ) : (
            <>
              <RecipeList 
                recipes={favorites} 
                loading={false} 
                emptyMessage="No favorite recipes found."
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;