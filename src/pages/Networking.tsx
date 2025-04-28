
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import NetworkingTaskCard, { NetworkingTask } from "@/components/NetworkingTask";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, UserPlus, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Sample networking tasks data
const tasksData: NetworkingTask[] = [
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
  {
    id: "task-3",
    title: "Group Discussion Participation",
    description: "Participate in a group discussion on professional development.",
    type: "group",
    difficulty: "medium",
    progress: 0,
    totalSteps: 1,
    completed: false,
    deadline: "This week",
  },
  {
    id: "task-4",
    title: "Team Presentation Challenge",
    description: "Work with 2 other users to create a short presentation.",
    type: "challenge",
    difficulty: "hard",
    progress: 0,
    totalSteps: 3,
    completed: false,
    deadline: "Next week",
  },
];

// Sample user data for connections
const sampleUsers = [
  {
    id: "user-1",
    name: "Alex Johnson",
    avatar: "",
    school: "Stanford University",
    interest: "Technology",
    connected: false,
  },
  {
    id: "user-2",
    name: "Jordan Smith",
    avatar: "",
    school: "MIT",
    interest: "Engineering",
    connected: false,
  },
  {
    id: "user-3",
    name: "Taylor Brown",
    avatar: "",
    school: "Harvard University",
    interest: "Business",
    connected: true,
  },
  {
    id: "user-4",
    name: "Morgan Lee",
    avatar: "",
    school: "UCLA",
    interest: "Science",
    connected: false,
  },
  {
    id: "user-5",
    name: "Casey Wilson",
    avatar: "",
    school: "Columbia University",
    interest: "Arts",
    connected: true,
  },
];

export default function Networking() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [tasks] = useState<NetworkingTask[]>(tasksData);
  const [users, setUsers] = useState(sampleUsers);
  const [searchQuery, setSearchQuery] = useState("");
  
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
  
  const handleConnect = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === userId ? { ...u, connected: true } : u
      )
    );
    
    toast({
      title: "Connection Request Sent",
      description: "Your networking request has been sent!",
    });
  };
  
  // Filter users based on search
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.interest.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get connected users
  const connectedUsers = users.filter(u => u.connected);
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <Users className="mr-2 h-7 w-7" />
          Networking
        </h1>
        <p className="text-gray-600 mt-1">
          Build your professional network and complete tasks to level up
        </p>
      </div>
      
      <Tabs defaultValue="tasks">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="find">Find Connections</TabsTrigger>
          <TabsTrigger value="connections">Your Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks">
          <div className="mb-6">
            <Card className="bg-brand-primary text-white">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Your Networking Progress</h3>
                    <p className="text-sm text-gray-100 mt-1">Complete networking tasks to advance your skills</p>
                  </div>
                  <div className="bg-white/20 p-3 rounded-full">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Progress to next level</span>
                    <span className="text-sm font-medium">
                      {user?.tasksCompleted}/{user?.milestoneLevel === "beginner" ? 3 : 7} tasks
                    </span>
                  </div>
                  <Progress 
                    value={user?.milestoneLevel === "beginner" 
                      ? (user?.tasksCompleted / 3) * 100 
                      : (user?.tasksCompleted / 7) * 100
                    } 
                    className="h-2 mt-2 bg-white/30"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Current Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {tasks
              .filter(task => !task.completed)
              .map(task => (
                <NetworkingTaskCard 
                  key={task.id} 
                  task={task} 
                  onStart={handleStartTask}
                  onComplete={handleCompleteTask}
                />
              ))}
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Completed Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tasks
              .filter(task => task.completed)
              .map(task => (
                <NetworkingTaskCard 
                  key={task.id} 
                  task={task} 
                  onStart={handleStartTask}
                  onComplete={handleCompleteTask}
                />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="find">
          <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search for people by name, school, or interest..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers
              .filter(u => !u.connected)
              .map(user => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.school}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {user.interest}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="flex items-center gap-1"
                        onClick={() => handleConnect(user.id)}
                      >
                        <UserPlus className="h-4 w-4 mr-1" />
                        Connect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredUsers.filter(u => !u.connected).length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                  <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No more connections to show</h3>
                  <p className="text-gray-500">Try adjusting your search or check again later.</p>
                </div>
              )}
          </div>
        </TabsContent>
        
        <TabsContent value="connections">
          <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 shadow-sm text-center">
            <Users className="h-8 w-8 mx-auto text-brand-primary mb-3" />
            <h2 className="text-xl font-semibold mb-1">Your Network</h2>
            <p className="text-gray-600 mb-4">You have {connectedUsers.length} connections so far</p>
            <Progress 
              value={(connectedUsers.length / (user?.milestoneLevel === "beginner" ? 5 : 20)) * 100} 
              className="h-2 mx-auto max-w-sm"
            />
            <p className="text-sm text-gray-500 mt-3">
              {user?.milestoneLevel === "beginner" 
                ? `Connect with ${5 - connectedUsers.length} more users to reach the next milestone`
                : `Connect with ${20 - connectedUsers.length} more users to reach the next milestone`
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {connectedUsers.length > 0 ? (
              connectedUsers.map(user => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.school}</p>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {user.interest}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-100">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700 mb-2">No connections yet</h3>
                <p className="text-gray-500 mb-4">Find and connect with other users to build your network.</p>
                <Button onClick={() => document.querySelector('[value="find"]')?.dispatchEvent(new Event('click'))}>
                  Find Connections
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
}
