
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  deadline: string;
  teamSize: number;
  status: "open" | "in-progress" | "judging" | "completed";
  teamMembers: number;
}

const sampleProjects: Project[] = [
  {
    id: "proj-1",
    title: "Business Plan Challenge",
    description: "Create a comprehensive business plan for a sustainable startup",
    deadline: "7 days",
    teamSize: 5,
    status: "open",
    teamMembers: 2,
  },
  {
    id: "proj-2",
    title: "Marketing Strategy",
    description: "Develop a digital marketing strategy for a local business",
    deadline: "5 days",
    teamSize: 4,
    status: "in-progress",
    teamMembers: 4,
  },
];

export default function Projects() {
  const { toast } = useToast();

  const handleJoinProject = (projectId: string) => {
    toast({
      title: "Project Joined",
      description: "You have successfully joined the project team.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8" />
          Project Development
        </h1>
        <p className="text-gray-600 mt-1">
          Join group projects to develop real-world skills and earn certificates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleProjects.map((project) => (
          <Card key={project.id} className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription className="mt-1">{project.description}</CardDescription>
                </div>
                <div className="bg-brand-light p-2 rounded-full">
                  <Award className="h-5 w-5 text-brand-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Deadline: {project.deadline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{project.teamMembers}/{project.teamSize} members</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    project.status === 'open' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    project.status === 'judging' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                  <Button 
                    onClick={() => handleJoinProject(project.id)}
                    disabled={project.status !== 'open' || project.teamMembers >= project.teamSize}
                  >
                    Join Project
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
