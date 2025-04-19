import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import RecipeList from '../components/RecipeList';
import DietaryFilters from '../components/DietaryFilters';
import { Recipe } from '../types/recipe';
import { fetchRecipes } from '../utils/api';
import { useRecipeContext } from '../contexts/RecipeContext';

const SearchResults: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const { dietaryPreferences, addToSearchHistory } = useRecipeContext();

  useEffect(() => {
    const loadRecipes = async () => {
      if (!query && dietaryPreferences.length === 0) return;
      
      try {
        setLoading(true);
        setError('');
        
        // Build filters object from dietary preferences
        const filters: Record<string, string> = {};
        
        dietaryPreferences.forEach(pref => {
          filters[`health`] = pref;
        });
        
        // If there's a query, fetch recipes
        if (query) {
          addToSearchHistory(query);
          const data = await fetchRecipes(query, filters);
          setRecipes(data.hits.map(hit => hit.recipe));
        } 
        // If no query but there are dietary filters
        else if (dietaryPreferences.length > 0) {
          // Use a default generic query with the filters
          const data = await fetchRecipes('meal', filters);
          setRecipes(data.hits.map(hit => hit.recipe));
        }
      } catch (err) {
        setError('Failed to load recipes. Please try again later.');
        console.error('Error loading recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [query, dietaryPreferences, addToSearchHistory]);

  const handleFilterChange = (filters: string[]) => {
    // Update the search params with the new filters
    const newParams = new URLSearchParams(searchParams);
    
    // Clear existing health params
    newParams.delete('health');
    
    // Add new health params
    filters.forEach(filter => {
      newParams.append('health', filter);
    });
    
    setSearchParams(newParams);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row md:items-center mb-8 gap-4">
            <div className="flex-grow">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {query ? `Results for "${query}"` : 'All Recipes'}
              </h1>
              <p className="text-gray-600">
                {recipes.length > 0 
                  ? `Found ${recipes.length} recipes ${query ? `for "${query}"` : ''}`
                  : loading ? 'Searching for recipes...' : 'No recipes found'
                }
              </p>
            </div>
            
            <div className="w-full md:w-auto">
              <SearchBar defaultValue={query} />
            </div>
          </div>
          
          <div className="mb-8">
            <button
              onClick={toggleFilters}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
            
            {filtersVisible && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center mb-3">
                  <Filter size={18} className="text-orange-500 mr-2" />
                  <h3 className="font-medium">Dietary Preferences</h3>
                </div>
                <DietaryFilters onFilterChange={handleFilterChange} />
              </div>
            )}
          </div>
          
          {error ? (
            <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
          ) : (
            <RecipeList 
              recipes={recipes} 
              loading={loading} 
              emptyMessage={
                query 
                  ? `No recipes found for "${query}". Try a different search term.`
                  : "Use the search bar to find recipes."
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;