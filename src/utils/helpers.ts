import { Recipe } from '../types/recipe';

// Extract ID from Edamam recipe URI
export const extractRecipeId = (uri: string): string => {
  const parts = uri.split('#');
  if (parts.length > 1) {
    return parts[1].replace('recipe_', '');
  }
  return uri;
};

// Format cooking time from minutes to readable format
export const formatCookingTime = (minutes: number): string => {
  if (!minutes) return 'N/A';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} hr`;
  }
  
  return `${hours} hr ${remainingMinutes} min`;
};

// Debounce function for search input
export const debounce = <F extends (...args: any[]) => any>(
  func: F,
  wait: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<F>) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Validate search query
export const validateSearchQuery = (query: string): boolean => {
  if (!query.trim()) return false;
  // Check for special characters except spaces and common punctuation
  const regex = /^[a-zA-Z0-9\s,.'&-]+$/;
  return regex.test(query);
};

// Truncate text with ellipsis
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};