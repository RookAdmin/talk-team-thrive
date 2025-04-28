
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Discussion {
  id: string;
  title: string;
  topic: string;
  scheduledFor: string;
  participants: number;
  maxParticipants: number;
  status: "upcoming" | "in-progress" | "completed";
}

const sampleDiscussions: Discussion[] = [
  {
    id: "gd-1",
    title: "Leadership in Tech",
    topic: "Exploring effective leadership styles in technology companies",
    scheduledFor: "Tomorrow, 3:00 PM",
    participants: 3,
    maxParticipants: 8,
    status: "upcoming",
  },
  {
    id: "gd-2",
    title: "Future of Remote Work",
    topic: "Discussing challenges and opportunities in remote work culture",
    scheduledFor: "Today, 5:00 PM",
    participants: 6,
    maxParticipants: 8,
    status: "in-progress",
  },
];

export default function GroupDiscussions() {
  const { toast } = useToast();

  const handleJoinDiscussion = (discussionId: string) => {
    toast({
      title: "Discussion Joined",
      description: "You have successfully joined the group discussion.",
    });
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageCircle className="h-8 w-8" />
          Group Discussions
        </h1>
        <p className="text-gray-600 mt-1">
          Join professional discussions to improve your communication skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleDiscussions.map((discussion) => (
          <Card key={discussion.id} className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{discussion.title}</CardTitle>
                  <CardDescription className="mt-1">{discussion.topic}</CardDescription>
                </div>
                <div className="bg-brand-light p-2 rounded-full">
                  <MessageCircle className="h-5 w-5 text-brand-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{discussion.scheduledFor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span>{discussion.participants}/{discussion.maxParticipants} participants</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    discussion.status === 'upcoming' ? 'bg-green-100 text-green-700' :
                    discussion.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {discussion.status.charAt(0).toUpperCase() + discussion.status.slice(1)}
                  </span>
                  <Button 
                    onClick={() => handleJoinDiscussion(discussion.id)}
                    disabled={discussion.status !== 'upcoming' || discussion.participants >= discussion.maxParticipants}
                  >
                    Join Discussion
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
