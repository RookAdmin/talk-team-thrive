
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, BookOpen } from "lucide-react";

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced";
  duration: string;
  isPaid: boolean;
  isLocked: boolean;
}

interface CourseCardProps {
  course: Course;
  onStart: (courseId: string) => void;
}

export default function CourseCard({ course, onStart }: CourseCardProps) {
  const { id, title, description, category, level, duration, isPaid, isLocked } = course;

  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-md ${isLocked ? 'opacity-75' : ''}`}>
      <div className={`h-2 ${level === 'beginner' ? 'bg-green-500' : level === 'intermediate' ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold">{title}</CardTitle>
            <CardDescription className="text-sm text-gray-500 mt-1">{description}</CardDescription>
          </div>
          <BookOpen className="h-5 w-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline" className="text-xs font-normal capitalize">{level}</Badge>
          <Badge variant="outline" className="text-xs font-normal">{duration}</Badge>
          <Badge variant={isPaid ? "secondary" : "outline"} className="text-xs font-normal">
            {isPaid ? "Premium" : "Free"}
          </Badge>
        </div>
        <p className="text-xs text-gray-500">Category: {category}</p>
      </CardContent>
      <CardFooter className="pt-1">
        <Button 
          className={`w-full ${isLocked ? 'bg-gray-300 hover:bg-gray-400' : ''}`}
          variant={isPaid ? "outline" : "default"}
          disabled={isLocked}
          onClick={() => onStart(id)}
        >
          {isLocked ? (
            <>
              <Lock className="mr-2 h-4 w-4" /> Unlock at Next Level
            </>
          ) : isPaid ? (
            'Enroll (Premium)'
          ) : (
            'Start Course'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
