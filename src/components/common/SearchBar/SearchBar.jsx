import React from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

export const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  onClear,
  placeholder = 'Buscar por producto, sector o empresa...',
  className = '',
  size = 'md'
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`search-bar-wrapper search-bar-${size} ${className}`}>
      <Search className="search-bar-icon" size={18} />
      <input
        type="text"
        className="search-bar-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && (
        <button
          type="button"
          className="search-bar-clear"
          onClick={() => {
            if (onClear) onClear();
            else if (onChange) onChange('');
          }}
          aria-label="Limpiar búsqueda"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
