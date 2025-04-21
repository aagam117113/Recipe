import { SearchResult } from '../types/recipe';
import mockData from '../../public/mock_recipes_50.json';

export const fetchRecipes = async (query: string, filters: Record<string, string> = {}): Promise<SearchResult> => {
  // Filter recipes based on query and filters
  return {
    ...mockData,
    hits: mockData.hits.filter(hit => {
      const recipe = hit.recipe;
      const matchesQuery = !query || recipe.label.toLowerCase().includes(query.toLowerCase());
      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (key === 'health') {
          return recipe.healthLabels.includes(value);
        }
        return true;
      });
      return matchesQuery && matchesFilters;
    })
  };
};

export const fetchRecipeById = async (id: string): Promise<SearchResult> => {
  const recipe = mockData.hits.find(hit => {
    const recipeId = hit.recipe.uri.split('#')[1];
    return recipeId === `recipe_${id}` || hit.recipe.uri === id;
  });

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  return {
    ...mockData,
    hits: [recipe]
  };
};

export const fetchTrendingRecipes = async (): Promise<SearchResult> => {
  // Return all mock data as trending recipes
  return mockData;
};