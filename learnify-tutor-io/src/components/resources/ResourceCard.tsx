
import { Resource } from "@/types/resources";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, ExternalLink, Download, Play } from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
  isBookmarked: boolean;
  onBookmark: (id: string) => void;
  onAction: (resource: Resource) => void;
}

export const ResourceCard = ({
  resource,
  isBookmarked,
  onBookmark,
  onAction
}: ResourceCardProps) => {
  return (
    <Card className="group p-6 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-indigo-200 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gray-700">
          <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
            {resource.icon}
          </div>
          <span className="ml-2 text-sm font-medium text-gray-500">
            {resource.type}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBookmark(resource.id)}
          className={`hover:bg-yellow-50 transition-colors ${
            isBookmarked ? "text-yellow-500" : ""
          }`}
        >
          <BookmarkPlus className="w-5 h-5" />
        </Button>
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-gray-800">
        {resource.title}
      </h3>
      
      <p className="text-gray-600 mb-4 leading-relaxed">
        {resource.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {resource.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-indigo-50 text-indigo-600 text-sm rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          resource.difficulty === "Beginner" 
            ? "bg-green-100 text-green-800" 
            : resource.difficulty === "Intermediate"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-red-100 text-red-800"
        }`}>
          {resource.difficulty}
        </span>
        {resource.duration && (
          <span className="text-sm text-gray-500 flex items-center">
            <Play className="w-4 h-4 mr-1" />
            {resource.duration}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
        {resource.views && (
          <span className="flex items-center gap-1">
            👁️ {resource.views.toLocaleString()} views
          </span>
        )}
        {resource.downloads && (
          <span className="flex items-center gap-1">
            ⬇️ {resource.downloads.toLocaleString()} downloads
          </span>
        )}
      </div>
      
      <Button 
        className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-[1.02]" 
        onClick={() => onAction(resource)}
      >
        {resource.type === "PDF Guide" ? (
          <>
            Download Resource
            <Download className="w-4 h-4 ml-2" />
          </>
        ) : (
          <>
            Access Resource
            <ExternalLink className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </Card>
  );
};
