
import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  onSearch: (query: string, filters: any) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    fundType: "all",
    riskLevel: "all",
    minReturn: 0,
  });
  
  const handleSearch = () => {
    onSearch(query, filters);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  const clearSearch = () => {
    setQuery("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative animate-fade-in">
      <div className="flex items-center w-full gap-2 bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all">
        <div className="pl-4 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for funds (e.g., 'ICICI infra', 'High return funds', 'Funds with HDFC holding')"
          className="flex-grow border-0 shadow-none focus-visible:ring-0 text-sm h-12 bg-transparent"
        />
        
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={clearSearch}
            className="mr-1 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="px-2">
              <Filter className="h-4 w-4 mr-1" />
              <span className="text-sm">Filter</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Filter Options</h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Fund Type</label>
                <select
                  className="w-full p-2 text-sm border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={filters.fundType}
                  onChange={(e) => setFilters({...filters, fundType: e.target.value})}
                >
                  <option value="all">All Types</option>
                  <option value="equity">Equity</option>
                  <option value="debt">Debt</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="index">Index</option>
                  <option value="etf">ETF</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Risk Level</label>
                <select
                  className="w-full p-2 text-sm border rounded-md dark:bg-gray-800 dark:border-gray-700"
                  value={filters.riskLevel}
                  onChange={(e) => setFilters({...filters, riskLevel: e.target.value})}
                >
                  <option value="all">All Levels</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                  <option value="very-high">Very High</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Minimum Return (%)</label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={filters.minReturn}
                  onChange={(e) => setFilters({...filters, minReturn: Number(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>{filters.minReturn}%</span>
                  <span>30%</span>
                </div>
              </div>
              
              <Button 
                onClick={handleSearch} 
                className="w-full bg-gradient-purple hover:opacity-90"
              >
                Apply Filters
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button 
          onClick={handleSearch} 
          className="px-6 py-3 h-12 bg-gradient-purple hover:opacity-90 text-white rounded-none"
        >
          Search
        </Button>
      </div>
    </div>
  );
}
