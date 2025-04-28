
import { Progress } from "@/components/ui/progress";
import { Award, Star, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface MilestoneProps {
  level: "beginner" | "intermediate" | "advanced";
  tasksCompleted: number;
  connectionsCount: number;
}

export default function MilestoneTracker({ 
  level,
  tasksCompleted,
  connectionsCount 
}: MilestoneProps) {
  // Define milestone thresholds
  const totalMilestonesNeeded = {
    beginner: { tasks: 3, connections: 5 },
    intermediate: { tasks: 7, connections: 20 },
    advanced: { tasks: 15, connections: 50 },
  };

  const currentMilestone = level;
  const currentThresholds = totalMilestonesNeeded[currentMilestone];
  
  // Calculate progress percentages
  const taskProgressPercent = Math.min(
    Math.round((tasksCompleted / currentThresholds.tasks) * 100),
    100
  );
  
  const connectionProgressPercent = Math.min(
    Math.round((connectionsCount / currentThresholds.connections) * 100),
    100
  );

  // Overall progress is the average of the two
  const overallProgressPercent = Math.round((taskProgressPercent + connectionProgressPercent) / 2);

  // Determine which badge to show based on level
  const renderBadge = () => {
    switch(currentMilestone) {
      case "beginner":
        return (
          <div className="rounded-full bg-gray-200 p-2">
            <Star className="h-5 w-5 text-gray-500" />
          </div>
        );
      case "intermediate":
        return (
          <div className="rounded-full bg-brand-light p-2">
            <Star className="h-5 w-5 text-brand-primary" />
          </div>
        );
      case "advanced":
        return (
          <div className="rounded-full bg-brand-primary p-2">
            <Award className="h-5 w-5 text-white" />
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Your Progress</h3>
        {renderBadge()}
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium capitalize">{currentMilestone} Level</span>
          <span className="text-sm font-semibold text-brand-primary">{overallProgressPercent}%</span>
        </div>
        <Progress value={overallProgressPercent} className="h-2" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-100 p-2">
            <Users className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Connections</span>
              <span className="text-xs font-medium">
                {connectionsCount}/{currentThresholds.connections}
              </span>
            </div>
            <Progress value={connectionProgressPercent} className="h-1.5 mt-1" />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gray-100 p-2">
            <Award className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="text-sm">Tasks Completed</span>
              <span className="text-xs font-medium">
                {tasksCompleted}/{currentThresholds.tasks}
              </span>
            </div>
            <Progress value={taskProgressPercent} className="h-1.5 mt-1" />
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between">
          <div className={cn(
            "text-center", 
            currentMilestone === "beginner" ? "text-brand-primary font-medium" : "text-gray-500"
          )}>
            <div className="relative">
              <div className={cn(
                "milestone-node",
                currentMilestone === "beginner" ? "current" : "completed"
              )}>
                1
              </div>
            </div>
            <span className="text-xs mt-1 block">Beginner</span>
          </div>
          
          <div className={cn(
            "text-center", 
            currentMilestone === "intermediate" ? "text-brand-primary font-medium" : 
            currentMilestone === "advanced" ? "text-gray-500" : "text-gray-400"
          )}>
            <div className="relative">
              <div className={cn(
                "milestone-node",
                currentMilestone === "intermediate" ? "current" :
                currentMilestone === "advanced" ? "completed" : "future"
              )}>
                2
              </div>
            </div>
            <span className="text-xs mt-1 block">Intermediate</span>
          </div>
          
          <div className={cn(
            "text-center", 
            currentMilestone === "advanced" ? "text-brand-primary font-medium" : "text-gray-400"
          )}>
            <div className="relative">
              <div className={cn(
                "milestone-node",
                currentMilestone === "advanced" ? "current" : "future"
              )}>
                3
              </div>
            </div>
            <span className="text-xs mt-1 block">Advanced</span>
          </div>
        </div>
        
        <div className="relative mt-[-34px] z-[-1]">
          <div className={cn(
            "milestone-line left-0",
            "w-1/2 completed"
          )}></div>
          <div className={cn(
            "milestone-line right-0",
            "w-1/2",
            currentMilestone === "advanced" ? "completed" : "future"
          )}></div>
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500">Complete tasks and connect with more users to advance to the next level!</p>
      </div>
    </div>
  );
}
