import { Navigation } from "@/components/Navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Book, Calculator, ChevronRight, Lightbulb, Star, Sparkles, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TutorResponse {
  explanation: string;
  examples: string[];
  practice: string;
}

interface HistoryItem {
  question: string;
  response: TutorResponse;
  timestamp: Date;
  starred: boolean;
}

const AITutor = () => {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<TutorResponse | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState("ask");
  const { toast } = useToast();

  const popularTopics = [
    {
      title: "Algebra Basics",
      description: "Learn fundamental algebraic concepts",
      icon: <Calculator className="w-6 h-6" />,
      questions: [
        {
          question: "How to solve quadratic equations?",
          response: {
            explanation: "To solve quadratic equations, use the quadratic formula: x = [-b ± √(b² - 4ac)] / 2a",
            examples: [
              "Example 1: x² + 5x + 6 = 0 → x = -2, x = -3",
              "Example 2: 2x² + 4x - 6 = 0 → x = 1, x = -3"
            ],
            practice: "Try solving: x² - 5x + 6 = 0"
          }
        },
        {
          question: "What is factoring?",
          response: {
            explanation: "Factoring is the process of breaking down an expression into simpler terms that can be multiplied together to get the original expression.",
            examples: [
              "Example 1: x² + 5x + 6 = (x + 2)(x + 3)",
              "Example 2: x² - 9 = (x + 3)(x - 3)"
            ],
            practice: "Try factoring: x² - 4x + 4"
          }
        },
        {
          question: "How to solve linear equations?",
          response: {
            explanation: "To solve linear equations, isolate the variable on one side of the equation.",
            examples: [
              "Example 1: x + 5 = 10 → x = 5",
              "Example 2: 2x + 3 = 15 → 2x = 12 → x = 6"
            ],
            practice: "Try solving: 3x + 7 = 22"
          }
        }
      ]
    },
    {
      title: "Geometry Formulas",
      description: "Master geometric calculations",
      icon: <Brain className="w-6 h-6" />,
      questions: [
        {
          question: "How to find circle area?",
          response: {
            explanation: "The area of a circle is calculated using the formula: A = πr², where r is the radius.",
            examples: [
              "Example 1: r = 5 → A = π(5)² = 25π",
              "Example 2: r = 10 → A = π(10)² = 100π"
            ],
            practice: "Try finding the area of a circle with radius 7"
          }
        },
        {
          question: "What is the Pythagorean theorem?",
          response: {
            explanation: "The Pythagorean theorem states that in a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides: a² + b² = c².",
            examples: [
              "Example 1: a = 3, b = 4 → c = √(3² + 4²) = 5",
              "Example 2: a = 5, b = 12 → c = √(5² + 12²) = 13"
            ],
            practice: "Try finding the hypotenuse of a triangle with sides 6 and 8"
          }
        },
        {
          question: "How to calculate triangle area?",
          response: {
            explanation: "The area of a triangle is calculated using the formula: A = ½bh, where b is the base and h is the height.",
            examples: [
              "Example 1: b = 5, h = 10 → A = ½(5)(10) = 25",
              "Example 2: b = 8, h = 6 → A = ½(8)(6) = 24"
            ],
            practice: "Try finding the area of a triangle with base 7 and height 9"
          }
        }
      ]
    },
    {
      title: "Calculus Help",
      description: "Understanding derivatives and integrals",
      icon: <Book className="w-6 h-6" />,
      questions: [
        {
          question: "What is a derivative?",
          response: {
            explanation: "A derivative represents the rate of change of a function with respect to a variable. It is the slope of the tangent line to the function at a given point.",
            examples: [
              "Example 1: f(x) = x² → f'(x) = 2x",
              "Example 2: f(x) = 3x³ → f'(x) = 9x²"
            ],
            practice: "Try finding the derivative of f(x) = 4x² + 3x + 2"
          }
        },
        {
          question: "How to find limits?",
          response: {
            explanation: "A limit describes the value that a function approaches as the input approaches some value. Limits are fundamental to calculus.",
            examples: [
              "Example 1: lim(x→2) x² = 4",
              "Example 2: lim(x→0) (sin(x)/x) = 1"
            ],
            practice: "Try finding the limit as x approaches 3 of f(x) = x² - 9"
          }
        },
        {
          question: "What are integrals used for?",
          response: {
            explanation: "Integrals are used to calculate areas under curves, volumes, and other quantities that can be accumulated.",
            examples: [
              "Example 1: ∫x² dx = (1/3)x³ + C",
              "Example 2: ∫2x dx = x² + C"
            ],
            practice: "Try finding the integral of f(x) = 3x² + 2x + 1"
          }
        }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Find the response for the selected question
    const selectedQuestion = popularTopics
      .flatMap(topic => topic.questions)
      .find(q => q.question === question);

    if (selectedQuestion) {
      setTimeout(() => {
        setResponse(selectedQuestion.response);
        setHistory(prev => [
          { question, response: selectedQuestion.response, timestamp: new Date(), starred: false },
          ...prev
        ]);
        
        setIsLoading(false);
        toast({
          title: "Solution Ready!",
          description: "Here's your personalized explanation.",
          className: "bg-blue-50 text-blue-900",
        });
      }, 1500);
    } else {
      setIsLoading(false);
      toast({
        title: "Error",
        description: "No response found for the selected question.",
        className: "bg-red-50 text-red-900",
      });
    }
  };

  const toggleStarred = (index: number) => {
    setHistory(prev => prev.map((item, i) => 
      i === index ? { ...item, starred: !item.starred } : item
    ));
    
    toast({
      title: history[index].starred ? "Removed from Favorites" : "Added to Favorites",
      description: history[index].starred 
        ? "Question removed from your favorites"
        : "Question saved to your favorites",
      className: history[index].starred 
        ? "bg-yellow-50 text-yellow-900"
        : "bg-green-50 text-green-900",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
<<<<<<< HEAD
        <div className="text-center mb-12">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium px-4 py-2 rounded-full mb-4">
            AI Tutor
          </span>
          <h1 className="text-4xl font-bold text-pink-500 mb-4">
            Your Personal Math Assistant
          </h1>
          <p className="text-xl text-yellow-600 max-w-2xl mx-auto">
            Ask any math question and receive clear, step-by-step explanations
=======
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Learning</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Personal Math Assistant
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get instant help with any math problem through clear, step-by-step explanations
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
<<<<<<< HEAD
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto bg-gray-100 p-2 rounded-lg">
            <TabsTrigger value="ask" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              Ask
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
=======
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-blue-50 p-1">
            <TabsTrigger value="ask" className="data-[state=active]:bg-white">
              <Brain className="w-4 h-4 mr-2" />
              Ask
            </TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-white">
              <Book className="w-4 h-4 mr-2" />
              History
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-white">
              <Star className="w-4 h-4 mr-2" />
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
              Favorites
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ask">
<<<<<<< HEAD
            <Card className="max-w-3xl mx-auto p-8 shadow-lg">
=======
            <Card className="glass-card max-w-3xl mx-auto p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    What's your math question?
                  </label>
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="E.g., How do I solve quadratic equations?"
<<<<<<< HEAD
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
=======
                    className="w-full p-4 text-lg border-2 border-blue-100 focus:border-blue-300 rounded-xl"
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                  />
                </div>
                
                <Button
                  type="submit"
                  disabled={!question || isLoading}
<<<<<<< HEAD
                  className="w-full py-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105"
=======
                  className="w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50"
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                >
                  {isLoading ? (
                    <Brain className="mr-2 h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Get Smart Help
                    </>
                  )}
                </Button>
              </form>

              {response && (
                <div className="mt-8 space-y-6 animate-fade-in">
<<<<<<< HEAD
                  <Card className="p-6 bg-blue-50 shadow-sm">
                    <h3 className="text-lg font-semibold flex items-center mb-4">
=======
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-none">
                    <h3 className="text-lg font-semibold flex items-center mb-4 text-blue-800">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                      <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                      Explanation
                    </h3>
                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{response.explanation}</p>
                  </Card>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-purple-800">Examples</h3>
                    {response.examples.map((example, index) => (
<<<<<<< HEAD
                      <Card key={index} className="p-4 bg-gray-50 shadow-sm">
=======
                      <Card key={index} className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-none">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                        <p className="text-gray-700">{example}</p>
                      </Card>
                    ))}
                  </div>

<<<<<<< HEAD
                  <Card className="p-6 bg-green-50 shadow-sm">
                    <h3 className="text-lg font-semibold flex items-center mb-4">
=======
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-none">
                    <h3 className="text-lg font-semibold flex items-center mb-4 text-green-800">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                      <Brain className="w-5 h-5 mr-2 text-green-600" />
                      Practice Problem
                    </h3>
                    <p className="text-gray-700">{response.practice}</p>
                  </Card>
                </div>
              )}
            </Card>

<<<<<<< HEAD
            <div className="mt-12">
              <h2 className="text-2xl font-semibold mb-6 text-center text-blue-00">Popular Topics</h2>
=======
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                Popular Topics
              </h2>
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularTopics.map((topic, index) => (
                  <Card
                    key={index}
<<<<<<< HEAD
                    className="p-6 hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl"
=======
                    className="p-6 hover:shadow-lg transition-all duration-300 bg-white border-2 border-gray-100 hover:border-blue-200"
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                  >
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        {topic.icon}
                      </div>
                      <h3 className="text-lg font-semibold ml-3">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="space-y-2">
                      {topic.questions.map((q, i) => (
                        <Button
                          key={i}
                          variant="ghost"
<<<<<<< HEAD
                          className="w-full justify-start text-left hover:bg-gray-100 rounded-lg"
=======
                          className="w-full justify-start text-left hover:bg-blue-50 transition-colors"
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                          onClick={() => {
                            setQuestion(q.question);
                            setActiveTab("ask");
                          }}
                        >
<<<<<<< HEAD
                          <ChevronRight className="w-4 h-4 mr-2" />
                          {q.question}
=======
                          <ChevronRight className="w-4 h-4 mr-2 text-blue-500" />
                          {q}
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                        </Button>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <div className="max-w-3xl mx-auto space-y-4">
              {history.map((item, index) => (
<<<<<<< HEAD
                <Card key={index} className="p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.question}</h3>
                    <div className="flex items-center gap-2">
=======
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{item.question}</h3>
                    <div className="flex items-center gap-4">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStarred(index)}
<<<<<<< HEAD
                        className="hover:bg-yellow-50 rounded-full"
=======
                        className="hover:bg-yellow-50"
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                      >
                        <Star className={`w-5 h-5 ${item.starred ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                      </Button>
                      <span className="text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.response.explanation}</p>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites">
            <div className="max-w-3xl mx-auto space-y-4">
              {history.filter(item => item.starred).map((item, index) => (
<<<<<<< HEAD
                <Card key={index} className="p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{item.question}</h3>
                    <div className="flex items-center gap-2">
=======
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-yellow-100">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{item.question}</h3>
                    <div className="flex items-center gap-4">
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStarred(index)}
<<<<<<< HEAD
                        className="hover:bg-yellow-50 rounded-full"
=======
                        className="hover:bg-yellow-50"
>>>>>>> 6fd960695a6194bd1f1b8ee45457bdf670f739d8
                      >
                        <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                      </Button>
                      <span className="text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.response.explanation}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITutor;