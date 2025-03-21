import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Brain, Calculator, ChartLine } from "lucide-react";
import { Link } from "react-router-dom";
import { FacialEmotionAnalyzer } from "@/components/FacialEmotionAnalyzer";

const Index = () => {
  const features = [
    {
      icon: <Brain className="w-12 h-12 text-indigo-600" />,
      title: "Personalized Learning",
      description: "AI-powered tutoring adapts to your unique learning style",
    },
    {
      icon: <Calculator className="w-12 h-12 text-indigo-600" />,
      title: "Interactive Practice",
      description: "Engage with dynamic math problems and get instant feedback",
    },
    {
      icon: <ChartLine className="w-12 h-12 text-indigo-600" />,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <div className="pt-32 pb-16 text-center px-4 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Master Mathematics with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience personalized learning with our advanced AI tutor. Perfect for high school students looking to excel in mathematics.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/ai-tutor">
              <Button className="hover:scale-105 transition-transform bg-indigo-600 text-white px-8 py-6 rounded-lg text-lg shadow-lg hover:bg-indigo-700">
                Start Learning
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" className="hover:scale-105 transition-transform px-8 py-6 rounded-lg text-lg border-indigo-600 text-indigo-600 hover:bg-indigo-50">
                Try Practice Questions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl hover:scale-105 transition-transform bg-white shadow-lg hover:shadow-xl"
            >
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Facial Expression Analysis Section */}
      {/* <div className="max-w-7xl mx-auto px-4 py-16 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Emotional Learning Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes your facial expressions to help understand your emotional engagement with the learning material.
          </p>
        </div>
        <FacialEmotionAnalyzer />
      </div> */}
    </div>
  );
};

export default Index;