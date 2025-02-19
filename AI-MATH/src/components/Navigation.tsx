import { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, BookOpen, GraduationCap, LineChart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LineChart className="w-5 h-5" /> },
    { name: "Practice", path: "/practice", icon: <Calculator className="w-5 h-5" /> },
    { name: "AI Tutor", path: "/ai-tutor", icon: <GraduationCap className="w-5 h-5" /> },
    { name: "Resources", path: "/resources", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Formulas", path: "/formulas", icon: <Calculator className="w-5 h-5" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide flex items-center">
            Math<span className="text-yellow-300">AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="inline-flex items-center px-3 py-2 text-lg font-medium transition-colors duration-300 hover:text-yellow-300"
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="p-2 rounded-md hover:bg-white/20"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md shadow-md absolute w-full animate-slideIn">
          <div className="pt-3 pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center px-6 py-3 text-lg font-medium text-gray-900 hover:text-indigo-600 hover:bg-gray-100 transition-all"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
