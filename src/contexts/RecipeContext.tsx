import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Recipe } from '../types/recipe';

interface RecipeContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (recipeUri: string) => void;
  isFavorite: (recipeUri: string) => boolean;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  dietaryPreferences: string[];
  updateDietaryPreferences: (preferences: string[]) => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [favorites, setFavorites] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(() => {
    const saved = localStorage.getItem('dietaryPreferences');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    localStorage.setItem('dietaryPreferences', JSON.stringify(dietaryPreferences));
  }, [dietaryPreferences]);

  const addFavorite = (recipe: Recipe) => {
    setFavorites(prev => {
      // Check if already in favorites to avoid duplicates
      if (prev.some(fav => fav.uri === recipe.uri)) {
        return prev;
      }
      return [...prev, recipe];
    });
  };

  const removeFavorite = (recipeUri: string) => {
    setFavorites(prev => prev.filter(recipe => recipe.uri !== recipeUri));
  };

  const isFavorite = (recipeUri: string) => {
    return favorites.some(recipe => recipe.uri === recipeUri);
  };

  const addToSearchHistory = (query: string) => {
    if (!query.trim() || searchHistory.includes(query)) return;
    
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.slice(0, 9)]; // Keep only 10 most recent searches
      return newHistory;
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const updateDietaryPreferences = (preferences: string[]) => {
    setDietaryPreferences(preferences);
  };

  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
    dietaryPreferences,
    updateDietaryPreferences,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = (): RecipeContextType => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};