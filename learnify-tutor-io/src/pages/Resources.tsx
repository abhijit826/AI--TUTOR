
import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Sparkles } from "lucide-react";
import { Resource } from "@/types/resources";
import { ResourceCard } from "@/components/resources/ResourceCard";
import { SearchBar } from "@/components/resources/SearchBar";
import { FilterButtons } from "@/components/resources/FilterButtons";
import { resources } from "@/data/resources";

const Resources = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedResources, setBookmarkedResources] = useState<string[]>([]);
  const { toast } = useToast();

<<<<<<< HEAD
  const resources: Resource[] = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      type: "Video Course",
      description: "Master the basics of algebra with our comprehensive video series",
      icon: <Video className="w-6 h-6" />,
      link: "https://www.udemy.com/course/master-algebra-unlock-the-power-of-mathematics-with-confide/?srsltid=AfmBOoo7bbzJPA00GgoCZEYkxagMKlFoy2rmJ8bkrwXcmQZLSDSQ7p6x&couponCode=NVDIN35",
      difficulty: "Beginner",
      // duration: "2.5 hours",
      tags: ["algebra", "basics", "equations"],
      // views: 1234
    },
    {
      id: "2",
      title: "Geometry Handbook",
      type: "PDF Guide",
      description: "Complete guide to geometric concepts and problem-solving techniques",
      icon: <FileText className="w-6 h-6" />,
      link: "https://mathguy.us/Handbooks/GeometryHandbook.pdf",
      difficulty: "Intermediate",
      tags: ["geometry", "shapes", "formulas"],
      // downloads: 567
    },
    {
      id: "3",
      title: "Calculus Practice Problems",
      type: "Interactive",
      description: "Collection of calculus problems with step-by-step solutions",
      icon: <BookOpen className="w-6 h-6" />,
      link: "https://tutorial.math.lamar.edu/problems/calci/diffformulas.aspx",
      difficulty: "Advanced",
      tags: ["calculus", "practice", "derivatives"],
      // views: 890
    }
  ];

=======
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
  const handleBookmark = (resourceId: string) => {
    setBookmarkedResources(prev => {
      const newBookmarks = prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId];
      
      toast({
        title: prev.includes(resourceId) ? "Bookmark Removed" : "Bookmark Added",
        description: prev.includes(resourceId) 
          ? "Resource removed from your bookmarks"
          : "Resource added to your bookmarks",
        className: prev.includes(resourceId) 
          ? "bg-yellow-50 text-yellow-900"
          : "bg-green-50 text-green-900",
      });
      
      return newBookmarks;
    });
  };

  const handleResourceAction = (resource: Resource) => {
    if (resource.type === "PDF Guide") {
      toast({
        title: "Download Started",
        description: "Your PDF is being downloaded...",
        className: "bg-blue-50 text-blue-900",
      });


      const link = document.createElement("a");
      link.href = resource.link;
      link.setAttribute("download", "Resource.pdf"); // Explicit filename
      link.target = "_blank"; // Ensures correct behavior in some cases
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);



    } else {
      toast({
        title: "Opening Resource",
        description: "Loading your content...",
        className: "bg-green-50 text-green-900",
      });
      window.open(resource.link, "_blank");
    }
  };

  const filteredResources = resources
    .filter(r => {
      if (filter === "all") return true;
      if (filter === "bookmarked") return bookmarkedResources.includes(r.id);
      return r.difficulty.toLowerCase() === filter;
    })
    .filter(r => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        r.title.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.tags.some(tag => tag.toLowerCase().includes(query))
      );
    });

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-pink">
=======
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-purple-50">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
      <Navigation />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
<<<<<<< HEAD
          <span className="inline-block bg-blue-100 text-indigo-800 text-sm font-medium px-4 py-2 rounded-full mb-4">
            Learning Resources
          </span>
          <h1 className="text-4xl font-bold text-green-500 mb-4">
            Educational Materials
          </h1>
          <p className="text-xl text-indigo-600 max-w-2xl mx-auto">
            Access our curated collection of learning resources to support your mathematical journey.
=======
          <div className="inline-flex items-center justify-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Learning Hub</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Educational Materials
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Access our curated collection of learning resources to support your mathematical journey
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-8">
<<<<<<< HEAD
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-indigo-500" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 py-6"
            />
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8 flex-wrap text-blue-500">
          {["all", "bookmarked", "beginner", "intermediate", "advanced"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f === "bookmarked" && <Star className="w-4 h-4 mr-2 text-pink-400"  />}
              {f}
            </Button>
          ))}
        </div>
=======
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        <FilterButtons 
          currentFilter={filter}
          onFilterChange={setFilter}
        />
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-indigo-800">
          {filteredResources.map((resource) => (
<<<<<<< HEAD
            <Card key={resource.id} className="glass-card p-6 hover-transform">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-gray-700">
                  {resource.icon}
                  <span className="ml-2 text-sm font-medium text-gray-500">
                    {resource.type}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBookmark(resource.id)}
                  className={bookmarkedResources.includes(resource.id) ? "text-yellow-500" : ""}
                >
                  <BookmarkPlus className="w-5 h-5" />
                </Button>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                {resource.title}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {resource.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  resource.difficulty === "Beginner" ? "bg-green-100 text-green-800" :
                  resource.difficulty === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                  "bg-red-100 text-red-800"
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
                  <span>👁️ {resource.views} views</span>
                )}
                {resource.downloads && (
                  <span>⬇️ {resource.downloads} downloads</span>
                )}
              </div>
              
              <Button 
                className="w-full mt-4 text-green-500" 
                variant="outline"
                onClick={() => handleResourceAction(resource)}
                
              >
                
                {resource.type === "PDF Guide" ? "Download" : "Access"} Resource
                {resource.type === "PDF Guide" ? (
                  <Download className="w-4 h-4 ml-2 text-yellow-600" />
                ) : (
                  <ExternalLink className="w-4 h-4 ml-2" />
                )}
              </Button>
            </Card>
=======
            <ResourceCard
              key={resource.id}
              resource={resource}
              isBookmarked={bookmarkedResources.includes(resource.id)}
              onBookmark={handleBookmark}
              onAction={handleResourceAction}
            />
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
