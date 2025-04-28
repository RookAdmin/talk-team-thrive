
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Presentation {
  id: string;
  title: string;
  topic: string;
  scheduledFor: string;
  status: "upcoming" | "ready" | "completed";
  uploadRequired: boolean;
}

const samplePresentations: Presentation[] = [
  {
    id: "ppt-1",
    title: "Innovation in Technology",
    topic: "Present your ideas about future tech trends",
    scheduledFor: "Tomorrow, 2:00 PM",
    status: "upcoming",
    uploadRequired: true,
  },
  {
    id: "ppt-2",
    title: "Startup Pitch",
    topic: "Present your startup idea to the group",
    scheduledFor: "Today, 4:00 PM",
    status: "ready",
    uploadRequired: true,
  },
];

export default function Presentations() {
  const { toast } = useToast();

  const handleUploadPresentation = (presentationId: string) => {
    toast({
      title: "Upload Successful",
      description: "Your presentation has been uploaded successfully.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          Presentations
        </h1>
        <p className="text-gray-600 mt-1">
          Practice and improve your presentation skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {samplePresentations.map((presentation) => (
          <Card key={presentation.id} className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{presentation.title}</CardTitle>
                  <CardDescription className="mt-1">{presentation.topic}</CardDescription>
                </div>
                <div className="bg-brand-light p-2 rounded-full">
                  <BookOpen className="h-5 w-5 text-brand-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{presentation.scheduledFor}</span>
                  </div>
                  {presentation.uploadRequired && (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4 text-gray-500" />
                      <span>Upload required</span>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    presentation.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                    presentation.status === 'ready' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {presentation.status.charAt(0).toUpperCase() + presentation.status.slice(1)}
                  </span>
                  <Button 
                    onClick={() => handleUploadPresentation(presentation.id)}
                    disabled={presentation.status === 'completed'}
                  >
                    Upload Presentation
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
