import { Navigation } from "@/components/Navigation";
import { Trophy, Brain, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Question, MathGame } from "@/types/practice";
import { QuestionCard } from "@/components/practice/QuestionCard";
import { GameBreak } from "@/components/practice/GameBreak";
import { generateQuestion } from "@/utils/questionGenerator";
import { FacialEmotionAnalyzer } from "@/components/FacialEmotionAnalyzer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Practice = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showExplanation, setShowExplanation] = useState<number | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(generateQuestion());
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [attentionReport, setAttentionReport] = useState<any>(null);
  const { toast } = useToast();

  // Rest of the state and handlers remain the same...
  const games: MathGame[] = [
    {
      id: 1,
      type: "speed",
      title: "Quick Math Challenge",
      description: "Solve 3 simple math problems in 30 seconds!"
    },
    {
      id: 2,
      type: "memory",
      title: "Number Memory",
      description: "Remember and repeat the sequence of numbers"
    }
  ];

  const handleAnswerSubmit = (selectedOption: string, correctAnswer: string, questionId: number) => {
    setSelectedAnswer(selectedOption);
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Well done! Let's try another question.",
        className: "bg-green-50 text-green-900",
      });
      setShowExplanation(null);
      
      if ((score + 1) % 3 === 0) {
        setShowGame(true);
        setIsSessionActive(false);
        toast({
          title: "🎮 Game Break!",
          description: "You've earned a fun break! Choose a mini-game to play.",
          className: "bg-purple-50 text-purple-900",
        });
      } else {
        setCurrentQuestion(generateQuestion());
        setSelectedAnswer("");
      }
    } else {
      toast({
        title: "Not quite right",
        description: "Click 'Show Explanation' to see a detailed solution.",
        className: "bg-yellow-50 text-yellow-900",
      });
    }
  };

  const handleGameComplete = () => {
    setShowGame(false);
    setCurrentQuestion(generateQuestion());
    setSelectedAnswer("");
    setIsSessionActive(true);
    toast({
      title: "Game Complete!",
      description: "Great job! Back to practice questions.",
      className: "bg-blue-50 text-blue-900",
    });
  };

  const handleSessionStart = () => {
    setIsSessionActive(true);
    setAttentionReport(null);
  };

  const handleReportGenerated = (report: any) => {
    setAttentionReport(report);
    toast({
      title: "Session Complete!",
      description: "Your attention report is ready to view.",
      className: "bg-green-50 text-green-900",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-purple-300 to-indigo-300 rounded-full blur-3xl opacity-20 -z-10" />
          
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 text-sm font-medium px-6 py-2 rounded-full mb-4 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Practice Questions
          </span>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 py-5">
            Test Your Knowledge
          </h1>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <Card className="px-6 py-3 flex items-center gap-3 bg-white/80 backdrop-blur-sm border-none shadow-lg">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Score: {score}
              </span>
            </Card>
          </div>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Practice makes perfect! Try these questions and get instant feedback.
          </p>
          
          {!isSessionActive && !showGame && (
            <Button
              onClick={handleSessionStart}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Practice Session
            </Button>
          )}
        </div>

        {isSessionActive && (
          <div className="mb-8">
            <FacialEmotionAnalyzer 
              isSessionActive={isSessionActive} 
              onReportGenerated={handleReportGenerated}
            />
          </div>
        )}

        {attentionReport && (
          <Card className="max-w-2xl mx-auto mb-8 p-8 bg-white/80 backdrop-blur-sm border-none shadow-xl rounded-xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-6 h-6 text-purple-500" />
              Session Report
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Session Duration</p>
                <p className="text-2xl font-bold text-indigo-900">
                  {Math.round((attentionReport.endTime - attentionReport.startTime) / 60000)} min
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Average Attention</p>
                <p className="text-2xl font-bold text-indigo-900">{Math.round(attentionReport.averageAttention)}%</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Attentive Time</p>
                <p className="text-2xl font-bold text-indigo-900">{Math.round(attentionReport.attentiveMinutes)} min</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Distracted Time</p>
                <p className="text-2xl font-bold text-indigo-900">{Math.round(attentionReport.distractedMinutes)} min</p>
              </div>
            </div>
          </Card>
        )}

        {showGame ? (
          <div className="max-w-2xl mx-auto">
            <GameBreak 
              games={games}
              onGameComplete={handleGameComplete}
            />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto transform hover:scale-[1.01] transition-all">
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSubmit={handleAnswerSubmit}
              showExplanation={showExplanation}
              onToggleExplanation={(id) => setShowExplanation(showExplanation === id ? null : id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Practice;