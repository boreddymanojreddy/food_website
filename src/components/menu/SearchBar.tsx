import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative w-full md:w-64">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search menu..."
        className="input pl-10 pr-10"
      />
      {searchQuery && (
        <button
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setSearchQuery('')}
        >
          <X size={18} className="text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;