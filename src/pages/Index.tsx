
import React from "react";
import ChatInterface from "@/components/ChatInterface";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Award, BookOpen, Users } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();

  const handleChatComplete = () => {
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
            Talk<span className="text-brand-primary">Team</span>Thrive
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Build essential communication skills for your professional future
          </p>
        </header>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Chat Interface */}
          <div className="w-full max-w-md">
            <ChatInterface onComplete={handleChatComplete} />
          </div>

          {/* Info Section */}
          <div className="w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-brand-primary mb-6">Elevate Your Professional Skills</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-brand-light rounded-full p-3">
                    <MessageCircle className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Structured Communication Practice</h3>
                    <p className="text-gray-600 mt-1">Learn to express yourself confidently in professional settings through guided exercises.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-brand-light rounded-full p-3">
                    <Users className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Real Networking Opportunities</h3>
                    <p className="text-gray-600 mt-1">Connect with other students and build meaningful professional relationships.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-brand-light rounded-full p-3">
                    <BookOpen className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Skill-Building Courses</h3>
                    <p className="text-gray-600 mt-1">Access curated courses designed to develop your teamwork and leadership abilities.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 bg-brand-light rounded-full p-3">
                    <Award className="h-6 w-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Achievement-Based Progress</h3>
                    <p className="text-gray-600 mt-1">Track your growth with milestones and earn certificates for your accomplishments.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button onClick={() => navigate("/auth")} size="lg" className="px-8">
                  Create Your Account
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Start your networking journey today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
