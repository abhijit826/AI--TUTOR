
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface FilterButtonsProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterButtons = ({ currentFilter, onFilterChange }: FilterButtonsProps) => {
  const filters = ["all", "bookmarked", "beginner", "intermediate", "advanced"];

  return (
    <div className="flex justify-center gap-4 mb-8 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={currentFilter === filter ? "default" : "outline"}
          onClick={() => onFilterChange(filter)}
          className={`capitalize px-6 py-2 rounded-full transition-all duration-300 ${
            currentFilter === filter 
              ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md hover:shadow-lg transform hover:scale-105"
              : "hover:bg-indigo-50 border-2 border-indigo-200"
          }`}
        >
          {filter === "bookmarked" && <Star className="w-4 h-4 mr-2" />}
          {filter}
        </Button>
      ))}
    </div>
  );
};
