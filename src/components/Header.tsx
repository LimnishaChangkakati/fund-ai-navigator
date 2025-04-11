
import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="w-full border-b dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-10">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2">
            <span className="text-2xl font-display font-bold gradient-text">
              Fund<span className="text-fund-blue">AI</span>
            </span>
          </a>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full size-8 p-0">
                  <span className="sr-only">Open user menu</span>
                  <User className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <a href="/dashboard">Dashboard</a>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-500 cursor-pointer flex items-center gap-2" 
                  onClick={logout}
                >
                  <LogOut className="size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="link" size="sm" asChild>
                <a href="/login">Log in</a>
              </Button>
              <Button size="sm" className="bg-gradient-purple hover:opacity-90" asChild>
                <a href="/signup">Sign up</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
