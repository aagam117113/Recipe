import React from 'react';
import { useRecipeContext } from '../contexts/RecipeContext';

interface DietaryFiltersProps {
  onFilterChange: (filters: string[]) => void;
  className?: string;
}

const DietaryFilters: React.FC<DietaryFiltersProps> = ({ onFilterChange, className = '' }) => {
  const { dietaryPreferences, updateDietaryPreferences } = useRecipeContext();
  
  const filters = [
    { id: 'vegetarian', label: 'Vegetarian', health: 'vegetarian' },
    { id: 'vegan', label: 'Vegan', health: 'vegan' },
    { id: 'gluten-free', label: 'Gluten-Free', health: 'gluten-free' },
    { id: 'dairy-free', label: 'Dairy-Free', health: 'dairy-free' },
    { id: 'low-sugar', label: 'Low Sugar', health: 'low-sugar' },
  ];

  const handleFilterToggle = (filterId: string) => {
    const newPreferences = dietaryPreferences.includes(filterId)
      ? dietaryPreferences.filter(id => id !== filterId)
      : [...dietaryPreferences, filterId];
    
    updateDietaryPreferences(newPreferences);
    onFilterChange(newPreferences);
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => handleFilterToggle(filter.health)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
            dietaryPreferences.includes(filter.health)
              ? 'bg-green-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-pressed={dietaryPreferences.includes(filter.health)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default DietaryFilters;