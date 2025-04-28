import React from "react";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import MilestoneTracker from "@/components/MilestoneTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Award, ArrowRight, BookOpen } from "lucide-react";
import { NetworkingTask } from "@/components/NetworkingTask";
import NetworkingTaskCard from "@/components/NetworkingTask";
import CourseCard, { Course } from "@/components/CourseCard";
import { useToast } from "@/components/ui/use-toast";

// Sample networking tasks
const sampleTasks: NetworkingTask[] = [
  {
    id: "task-1",
    title: "Connect with 5 New Users",
    description: "Reach out and establish connections with 5 new users in your field.",
    type: "connect",
    difficulty: "easy",
    progress: 2,
    totalSteps: 5,
    completed: false,
  },
  {
    id: "task-2",
    title: "Daily Communication Challenge",
    description: "Respond to messages from at least 3 connections.",
    type: "message",
    difficulty: "easy",
    progress: 3,
    totalSteps: 3,
    completed: true,
    deadline: "Today",
  },
];

// Sample recommended courses
const recommendedCourses: Course[] = [
  {
    id: "course-1",
    title: "Communication Basics",
    description: "Learn fundamentals of effective communication",
    category: "Communication Skills",
    level: "beginner",
    duration: "2 hours",
    isPaid: false,
    isLocked: false,
  },
  {
    id: "course-2",
    title: "Advanced Networking",
    description: "Master professional networking tactics",
    category: "Networking",
    level: "intermediate",
    duration: "4 hours",
    isPaid: true,
    isLocked: true,
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleStartTask = (taskId: string) => {
    toast({
      title: "Task Started",
      description: "You've started a new networking task.",
    });
  };

  const handleCompleteTask = (taskId: string) => {
    toast({
      title: "Task Progress Updated",
      description: "Your progress has been saved.",
    });
  };

  const handleStartCourse = (courseId: string) => {
    toast({
      title: "Course Started",
      description: "You've started a new course.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
        <p className="text-gray-600 mt-1">Continue developing your professional skills.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - 2/3 width on desktop */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Tasks Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Current Networking Tasks</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="text-brand-primary"
                onClick={() => navigate("/networking")}
              >
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sampleTasks.map(task => (
                <NetworkingTaskCard 
                  key={task.id} 
                  task={task} 
                  onStart={handleStartTask}
                  onComplete={handleCompleteTask}
                />
              ))}
            </div>
          </section>
          
          {/* Recommended Courses Section */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recommended Courses</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="text-brand-primary"
                onClick={() => navigate("/courses")}
              >
                Browse All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recommendedCourses.map(course => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onStart={handleStartCourse}
                />
              ))}
            </div>
          </section>
          
          {/* Quick Stats Cards */}
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Connections</p>
                      <p className="text-2xl font-bold">{user.connectionsCount}</p>
                    </div>
                    <div className="bg-brand-light p-3 rounded-full">
                      <Users className="h-5 w-5 text-brand-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Tasks Completed</p>
                      <p className="text-2xl font-bold">{user.tasksCompleted}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-full">
                      <Award className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Courses</p>
                      <p className="text-2xl font-bold">0</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-full">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
        
        {/* Sidebar - 1/3 width on desktop */}
        <aside className="space-y-6">
          <div className="sticky top-6">
            {/* Progress Tracker */}
            <MilestoneTracker 
              level={user.milestoneLevel}
              tasksCompleted={user.tasksCompleted}
              connectionsCount={user.connectionsCount}
            />
            
            {/* Quick Action Card */}
            <Card className="bg-brand-primary text-white mt-6">
              <CardHeader>
                <CardTitle className="text-white">Ready to Start Networking?</CardTitle>
                <CardDescription className="text-gray-100">
                  Your first tasks await you!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm">
                  Complete your first networking task to earn points and unlock more features.
                </p>
                <Button 
                  variant="secondary" 
                  className="w-full bg-white text-brand-primary hover:bg-gray-100"
                  onClick={() => navigate("/networking")}
                >
                  Start Networking <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Need Support Card */}
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Need Support?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Contact Support</span>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full flex justify-between">
                  <span>Community Forum</span>
                  <Users className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
