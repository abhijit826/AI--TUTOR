
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
      <Input
        placeholder="Search resources..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 py-6 bg-white/80 backdrop-blur-sm border-2 border-indigo-100 focus:border-indigo-300 rounded-xl shadow-sm"
      />
    </div>
  );
};
