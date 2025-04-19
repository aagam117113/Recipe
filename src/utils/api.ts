import { SearchResult } from '../types/recipe';

const APP_ID = import.meta.env.VITE_EDAMAM_APP_ID;
const APP_KEY = import.meta.env.VITE_EDAMAM_APP_KEY;
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export const fetchRecipes = async (query: string, filters: Record<string, string> = {}): Promise<SearchResult> => {
  try {
    const params = new URLSearchParams({
      type: 'public',
      q: query,
      app_id: APP_ID,
      app_key: APP_KEY,
      ...filters
    });

    const response = await fetch(`${BASE_URL}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const fetchRecipeById = async (id: string): Promise<SearchResult> => {
  try {
    const recipeId = id.startsWith('http') ? id : `http://www.edamam.com/ontologies/edamam.owl#recipe_${id}`;
    const encodedId = encodeURIComponent(recipeId);
    
    const params = new URLSearchParams({
      type: 'public',
      app_id: APP_ID,
      app_key: APP_KEY,
    });

    const response = await fetch(`${BASE_URL}/${encodedId}?${params}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw error;
  }
};

export const fetchTrendingRecipes = async (): Promise<SearchResult> => {
  // For trending, we'll use a popular search term like "popular" or "trending"
  return fetchRecipes('popular', { random: 'true' });
};