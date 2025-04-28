
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, MessageCircle, BookOpen, Users } from "lucide-react";

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-xl font-bold text-brand-primary">
          Talk<span className="text-brand-secondary">Team</span>Thrive
        </Link>

        <div className="hidden md:flex gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-brand-primary">
                Dashboard
              </Link>
              <Link to="/networking" className="text-gray-700 hover:text-brand-primary">
                Networking
              </Link>
              <Link to="/courses" className="text-gray-700 hover:text-brand-primary">
                Courses
              </Link>
              <Link to="/projects" className="text-gray-700 hover:text-brand-primary">
                Projects
              </Link>
              <Link to="/discussions" className="text-gray-700 hover:text-brand-primary">
                Discussions
              </Link>
              <Link to="/presentations" className="text-gray-700 hover:text-brand-primary">
                Presentations
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-gray-700 hover:text-brand-primary">
                Login
              </Link>
            </>
          )}
        </div>

        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full h-10 w-10 p-0 border-2 border-gray-200 hover:border-brand-primary"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-xs text-gray-500">{user?.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="md:hidden">
            <Link to="/auth">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
