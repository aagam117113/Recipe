import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, TrendingUp, Clock } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import DietaryFilters from '../components/DietaryFilters';
import { fetchTrendingRecipes } from '../utils/api';
import { Recipe } from '../types/recipe';
import { useRecipeContext } from '../contexts/RecipeContext';

const Home: React.FC = () => {
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { searchHistory } = useRecipeContext();

  useEffect(() => {
    const loadTrendingRecipes = async () => {
      try {
        setLoading(true);
        const data = await fetchTrendingRecipes();
        setTrendingRecipes(data.hits.map(hit => hit.recipe));
        setLoading(false);
      } catch (err) {
        setError('Failed to load trending recipes. Please try again later.');
        setLoading(false);
        console.error('Error loading trending recipes:', err);
      }
    };

    loadTrendingRecipes();
  }, []);

  const handleFilterChange = (filters: string[]) => {
    if (filters.length > 0) {
      const filterParams = filters.map(f => `&health=${f}`).join('');
      navigate(`/search?${filterParams}`);
    }
  };

  const handleQuickSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const quickSearches = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Healthy', 'Quick'];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-orange-500 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center md:text-left md:max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Discover Delicious Recipes for Every Occasion
            </h1>
            <p className="text-xl mb-8 text-gray-100">
              Find and save your favorite recipes from around the world
            </p>
            
            <SearchBar className="max-w-xl mx-auto md:mx-0" />
            
            <div className="mt-6">
              <p className="text-gray-200 mb-2">Dietary Preferences:</p>
              <DietaryFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Search Chips */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {quickSearches.map((search) => (
            <button
              key={search}
              onClick={() => handleQuickSearch(search)}
              className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium hover:bg-orange-200 transition-colors"
            >
              {search}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Searches */}
      {searchHistory.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center mb-4">
            <Clock size={20} className="text-gray-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Recent Searches</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.slice(0, 5).map((search, index) => (
              <button
                key={index}
                onClick={() => handleQuickSearch(search)}
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Trending Recipes */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center mb-6">
          <TrendingUp size={24} className="text-orange-500 mr-2" />
          <h2 className="text-2xl font-semibold text-gray-800">Trending Recipes</h2>
        </div>
        
        {error ? (
          <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
        ) : (
          <RecipeList 
            recipes={trendingRecipes} 
            loading={loading} 
            emptyMessage="No trending recipes available at the moment. Please check back later."
          />
        )}
      </div>

      {/* Recipe Categories */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <ChefHat size={24} className="text-orange-500 mr-2" />
            <h2 className="text-2xl font-semibold text-gray-800">Popular Categories</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {['Italian', 'Asian', 'Mexican', 'Vegetarian', 'Desserts', 'Seafood'].map((category) => (
              <button
                key={category}
                onClick={() => handleQuickSearch(category)}
                className="relative h-40 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">{category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;