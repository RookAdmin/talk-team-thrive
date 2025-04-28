
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import CourseCard, { Course } from "@/components/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Sample courses data
const coursesData: Course[] = [
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
    title: "Public Speaking Essentials",
    description: "Techniques to speak confidently in public",
    category: "Presentation Skills",
    level: "beginner",
    duration: "3 hours",
    isPaid: false,
    isLocked: false,
  },
  {
    id: "course-3",
    title: "Networking Fundamentals",
    description: "Build meaningful professional relationships",
    category: "Networking",
    level: "beginner",
    duration: "2.5 hours",
    isPaid: false,
    isLocked: false,
  },
  {
    id: "course-4",
    title: "Advanced Presentation Techniques",
    description: "Take your presentations to the next level",
    category: "Presentation Skills",
    level: "intermediate",
    duration: "4 hours",
    isPaid: true,
    isLocked: true,
  },
  {
    id: "course-5",
    title: "Conflict Resolution",
    description: "Navigate and resolve professional conflicts",
    category: "Communication Skills",
    level: "intermediate",
    duration: "3.5 hours",
    isPaid: true,
    isLocked: true,
  },
  {
    id: "course-6",
    title: "Leadership Communication",
    description: "Communicate effectively as a leader",
    category: "Leadership",
    level: "advanced",
    duration: "5 hours",
    isPaid: true,
    isLocked: true,
  },
];

export default function Courses() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [courses] = useState<Course[]>(coursesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  
  const handleStartCourse = (courseId: string) => {
    const course = courses.find(c => c.id === courseId);
    
    if (course?.isPaid) {
      toast({
        title: "Premium Course",
        description: "This is a premium course. Please upgrade to access.",
      });
    } else {
      toast({
        title: "Course Started",
        description: `You've started "${course?.title}"`,
      });
    }
  };
  
  // Extract unique categories for filter
  const uniqueCategories = Array.from(new Set(courses.map(course => course.category)));
  
  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
    const matchesLevel = levelFilter ? course.level === levelFilter : true;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center">
          <BookOpen className="mr-2 h-7 w-7" />
          Courses
        </h1>
        <p className="text-gray-600 mt-1">
          Develop your professional communication skills with our courses
        </p>
      </div>
      
      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search courses..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {uniqueCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Active filters display */}
        {(categoryFilter || levelFilter || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery("")} className="ml-1 hover:text-gray-700">
                  ×
                </button>
              </Badge>
            )}
            
            {categoryFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Category: {categoryFilter}
                <button onClick={() => setCategoryFilter("")} className="ml-1 hover:text-gray-700">
                  ×
                </button>
              </Badge>
            )}
            
            {levelFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Level: {levelFilter}
                <button onClick={() => setLevelFilter("")} className="ml-1 hover:text-gray-700">
                  ×
                </button>
              </Badge>
            )}
            
            {(categoryFilter || levelFilter || searchQuery) && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm h-7"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("");
                  setLevelFilter("");
                }}
              >
                Clear all
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Free Courses Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Free Courses</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCourses
            .filter(course => !course.isPaid)
            .map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onStart={handleStartCourse}
              />
            ))}
        </div>
      </section>
      
      {/* Premium Courses Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Premium Courses</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCourses
            .filter(course => course.isPaid)
            .map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onStart={handleStartCourse}
              />
            ))}
        </div>
      </section>
    </Layout>
  );
}
