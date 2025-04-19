import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { debounce, validateSearchQuery } from '../utils/helpers';
import { useRecipeContext } from '../contexts/RecipeContext';

interface SearchBarProps {
  defaultValue?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ defaultValue = '', className = '' }) => {
  const [query, setQuery] = useState(defaultValue);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToSearchHistory } = useRecipeContext();

  // Reset error when query changes
  useEffect(() => {
    if (query && error) {
      setError('');
    }
  }, [query, error]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!query.trim()) {
      setError('Please enter a search term');
      return;
    }

    if (!validateSearchQuery(query)) {
      setError('Invalid characters in search');
      return;
    }

    // Add to search history and navigate to results
    addToSearchHistory(query.trim());
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Debounced validation
  const debouncedValidation = debounce((value: string) => {
    if (value && !validateSearchQuery(value)) {
      setError('Invalid characters in search');
    }
  }, 300);

  useEffect(() => {
    if (query) {
      debouncedValidation(query);
    }
  }, [query]);

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for recipes..."
          className={`w-full px-4 py-3 pr-12 rounded-full border ${
            error ? 'border-red-500' : 'border-gray-300'
          } focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent shadow-sm`}
          data-testid="search-input"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500 focus:outline-none transition-colors"
          aria-label="Search"
        >
          <Search size={20} />
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-1 ml-2" data-testid="search-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchBar;