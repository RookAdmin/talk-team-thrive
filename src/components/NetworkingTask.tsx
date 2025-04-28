
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, MessageCircle, Users } from "lucide-react";

export interface NetworkingTask {
  id: string;
  title: string;
  description: string;
  type: "connect" | "message" | "group" | "challenge";
  difficulty: "easy" | "medium" | "hard";
  progress: number;
  totalSteps: number;
  completed: boolean;
  deadline?: string;
}

interface NetworkingTaskCardProps {
  task: NetworkingTask;
  onStart: (taskId: string) => void;
  onComplete: (taskId: string) => void;
}

export default function NetworkingTaskCard({ task, onStart, onComplete }: NetworkingTaskCardProps) {
  const { id, title, description, type, difficulty, progress, totalSteps, completed, deadline } = task;

  // Helper to render the appropriate icon based on task type
  const renderTaskIcon = () => {
    switch(type) {
      case "connect":
        return <Users className="h-5 w-5 text-brand-primary" />;
      case "message":
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      case "group":
        return <Users className="h-5 w-5 text-blue-500" />;
      case "challenge":
        return <Users className="h-5 w-5 text-orange-500" />;
      default:
        return <Users className="h-5 w-5 text-gray-500" />;
    }
  };

  // Helper to get badge color based on difficulty
  const getDifficultyColor = () => {
    switch(difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const progressPercent = Math.round((progress / totalSteps) * 100);

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${completed ? 'border-green-200' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {renderTaskIcon()}
              <CardTitle className="text-lg font-medium">{title}</CardTitle>
              {completed && <CheckCircle className="h-5 w-5 text-green-500" />}
            </div>
            <CardDescription className="text-sm text-gray-500">{description}</CardDescription>
          </div>
          <Badge className={`${getDifficultyColor()} capitalize`}>{difficulty}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        {!completed && (
          <>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Progress</span>
              <span className="text-xs font-medium">{progress}/{totalSteps}</span>
            </div>
            <Progress value={progressPercent} className="h-1.5" />
          </>
        )}
        
        {deadline && (
          <div className="flex items-center gap-1 mt-3 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Deadline: {deadline}</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-1">
        {completed ? (
          <div className="w-full text-center text-sm text-green-600 font-medium py-1">
            Task Completed
          </div>
        ) : (
          <Button 
            className="w-full"
            variant={progress > 0 ? "outline" : "default"}
            onClick={() => progress > 0 ? onComplete(id) : onStart(id)}
          >
            {progress > 0 ? 'Continue Task' : 'Start Task'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
