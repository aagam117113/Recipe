import { SearchResult } from '../types/recipe';

const BASE_URL = 'mock_recipes_50.json';

export const fetchRecipes = async (query: string, filters: Record<string, string> = {}): Promise<SearchResult> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const data: SearchResult = await response.json();
    
    // Filter recipes based on query and filters
    return {
      ...data,
      hits: data.hits.filter(hit => {
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
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipeById = async (id: string): Promise<SearchResult> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    const data: SearchResult = await response.json();
    
    const recipe = data.hits.find(hit => {
      const recipeId = hit.recipe.uri.split('#')[1];
      return recipeId === `recipe_${id}` || hit.recipe.uri === id;
    });

    if (!recipe) {
      throw new Error('Recipe not found');
    }

    return {
      ...data,
      hits: [recipe]
    };
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw error;
  }
};

export const fetchTrendingRecipes = async (): Promise<SearchResult> => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch trending recipes');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching trending recipes:', error);
    throw error;
  }
};