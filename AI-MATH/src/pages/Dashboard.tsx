import React, { useState, useEffect } from 'react';
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Timer, Trash, Edit, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskText, setEditTaskText] = useState("");
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const { toast } = useToast();

  const performanceData = [
    { date: "Mon", score: 45 },
    { date: "Tue", score: 32 },
    { date: "Wed", score: 29 },
    { date: "Thu", score: 17 },
    { date: "Fri", score: 10 },
    { date: "Sat", score: 90 },
    { date: "Sun", score: 94 },
  ];

  // Pomodoro Timer Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      toast({
        title: "Time's up!",
        description: "Take a break and start fresh.",
      });
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, toast]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setTimeLeft(25 * 60);
    setIsActive(false);
  };

  // Task Management Logic
  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
      setNewTask("");
      toast({
        title: "Task added!",
        description: "Your task has been successfully added.",
      });
    }
  };

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted!",
      description: "Your task has been successfully deleted.",
    });
  };

  const startEditTask = (taskId: number, taskText: string) => {
    setEditTaskId(taskId);
    setEditTaskText(taskText);
  };

  const saveEditTask = (taskId: number) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: editTaskText } : task
    ));
    setEditTaskId(null);
    setEditTaskText("");
    toast({
      title: "Task updated!",
      description: "Your task has been successfully updated.",
    });
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true; // "all"
  });

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navigation />
      
      <div className="pt-16 px-4 max-w-7xl mx-auto">
        <Tabs defaultValue="overview" className="space-y-10">
          <TabsList className="inline-flex p-1 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg">
            <TabsTrigger value="overview" className="px-6 py-3 rounded-lg transition-all">Overview</TabsTrigger>
            <TabsTrigger value="todo" className="px-6 py-3 rounded-lg transition-all">To-Do List</TabsTrigger>
            <TabsTrigger value="pomodoro" className="px-6 py-3 rounded-lg transition-all">Pomodoro Timer</TabsTrigger>
            <TabsTrigger value="analytics" className="px-6 py-3 rounded-lg transition-all">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="p-6 backdrop-blur-sm bg-white/80 border-none shadow-xl rounded-xl overflow-hidden">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">Weekly Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                    <XAxis dataKey="date" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="url(#colorGradient)"
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2 }}
                      activeDot={{ r: 8, fill: '#6366f1' }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 backdrop-blur-sm bg-white/80 border-none shadow-xl rounded-xl">
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm">
                    <span className="font-medium text-gray-700">Problems Solved</span>
                    <span className="font-bold text-indigo-600">124</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm">
                    <span className="font-medium text-gray-700">Study Time</span>
                    <span className="font-bold text-indigo-600">14.5 hrs</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-sm">
                    <span className="font-medium text-gray-700">Current Streak</span>
                    <span className="font-bold text-indigo-600">7 days</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="todo" className="space-y-4">
            <Card className="p-6 backdrop-blur-sm bg-blue/80 border-none shadow-xl rounded-xl">
              <form onSubmit={addTask} className="flex gap-3 mb-6">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Add a new task..."
                  className="flex-1 bg-white/50 border-none shadow-sm"
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                  Add Task
                </Button>
              </form>

              {/* Filter Buttons */}
              <div className="flex gap-3 mb-6">
                <Button
                  variant={filter === "all" ? "default" : "outline"}
                  onClick={() => setFilter("all")}
                >
                  All
                </Button>
                <Button
                  variant={filter === "completed" ? "default" : "outline"}
                  onClick={() => setFilter("completed")}
                >
                  Completed
                </Button>
                <Button
                  variant={filter === "incomplete" ? "default" : "outline"}
                  onClick={() => setFilter("incomplete")}
                >
                  Incomplete
                </Button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 p-4 bg-white/50 rounded-xl shadow-sm transition-all hover:shadow-md"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="rounded-full w-5 h-5 text-indigo-600 focus:ring-indigo-500"
                    />
                    {editTaskId === task.id ? (
                      <Input
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        className="flex-1 bg-white/50 border-none shadow-sm"
                      />
                    ) : (
                      <span className={`flex-1 transition-all ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                        {task.text}
                      </span>
                    )}
                    <div className="flex gap-2">
                      {editTaskId === task.id ? (
                        <Button
                          onClick={() => saveEditTask(task.id)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => startEditTask(task.id, task.text)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-600 hover:bg-red-700 text-white"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pomodoro" className="space-y-4">
            <Card className="p-8 backdrop-blur-sm bg-white/80 border-none shadow-xl rounded-xl text-center">
              <div className="mb-8">
                <Timer className="w-16 h-16 mx-auto mb-6 text-indigo-600" />
                <h2 className="text-6xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
                  {formatTime(timeLeft)}
                </h2>
                <div className="space-x-4">
                  <Button 
                    onClick={toggleTimer}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg shadow-lg"
                  >
                    {isActive ? "Pause" : "Start"}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={resetTimer}
                    className="px-8 py-4 text-lg border-2 hover:bg-gray-50"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6 backdrop-blur-sm bg-white/80 border-none shadow-xl rounded-xl">
              <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">Performance Analytics</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#8884d8', strokeWidth: 2 }}
                    activeDot={{ r: 8, fill: '#6366f1' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;