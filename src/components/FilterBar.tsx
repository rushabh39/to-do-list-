import React from 'react';
import { Filter } from '../types/todo';
import { cn } from '../utils/cn';
import { Search } from 'lucide-react';

interface FilterBarProps {
  currentFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  itemCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  currentFilter, 
  onFilterChange, 
  searchQuery, 
  onSearchChange, 
  itemCount 
}) => {
  const filters: Filter[] = ['all', 'active', 'completed'];

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gen-z-subtext" size={18} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search ur tasks... 🔍"
          className="w-full bg-gen-z-surface border border-gen-z-surface focus:border-gen-z-purple rounded-xl pl-10 pr-4 py-3 outline-none transition-all text-gen-z-text placeholder-gen-z-subtext"
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-gen-z-subtext text-sm font-medium">
          {itemCount} {itemCount === 1 ? 'task' : 'tasks'} for u 💅
        </div>
        
        <div className="flex bg-gen-z-surface p-1 rounded-xl">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onFilterChange(f)}
              className={cn(
                "px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-200",
                currentFilter === f
                  ? "bg-gen-z-purple text-white shadow-md"
                  : "text-gen-z-subtext hover:text-white"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
