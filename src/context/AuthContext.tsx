
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  school: string;
  country: string;
  interest?: string;
  milestoneLevel: "beginner" | "intermediate" | "advanced";
  tasksCompleted: number;
  connectionsCount: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: Omit<User, "id" | "milestoneLevel" | "tasksCompleted" | "connectionsCount">) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Simple mock login
  const login = async (email: string, password: string) => {
    // This would be replaced with an actual API call
    try {
      // Mock successful login
      const mockUser: User = {
        id: "user-1",
        name: "Test User",
        email: email,
        school: "Demo University",
        country: "United States",
        interest: "Technology",
        milestoneLevel: "beginner",
        tasksCompleted: 0,
        connectionsCount: 0
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      toast({
        title: "Login successful",
        description: "Welcome back to Talk Team Thrive!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      console.error("Login error:", error);
    }
  };

  // Simple mock signup
  const signup = async (userData: Omit<User, "id" | "milestoneLevel" | "tasksCompleted" | "connectionsCount">) => {
    // This would be replaced with an actual API call
    try {
      // Mock successful signup
      const newUser: User = {
        id: `user-${Math.random().toString(36).substr(2, 9)}`,
        ...userData,
        milestoneLevel: "beginner",
        tasksCompleted: 0,
        connectionsCount: 0
      };
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast({
        title: "Signup successful",
        description: "Welcome to Talk Team Thrive!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Signup failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
      console.error("Signup error:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  // Check for existing session on load
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
