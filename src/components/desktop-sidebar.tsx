"use client";
import {
  TrendingUp,
  Wallet,
  Settings,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import data from "./sidebar-data";

// Desktop Sidebar Component
export function DesktopSidebar() {
  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-gray-900/95 backdrop-blur-xl border-r border-gray-700/50">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-700/50">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">FinTrakr</h1>
          <p className="text-xs text-gray-400">Financial Dashboard</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-6 space-y-8">
          {/* Main Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Dashboard
            </h3>
            <ul className="space-y-2">
              {data.navMain.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        item.isActive
                          ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10"
                          : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                      }
                    `}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-2">
              {data.navSecondary.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all duration-200"
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-gray-700/50">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full h-auto p-3 justify-start hover:bg-gray-800/60 text-gray-300 hover:text-white"
              >
                <div className="flex items-center gap-3 flex-1">
                  <Avatar className="h-9 w-9 border-2 border-purple-500/40">
                    <AvatarImage
                      //   src="/placeholder.svg?height=36&width=36"
                      alt="User"
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-sm font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-semibold text-white">John Doe</p>
                    <p className="text-xs text-gray-400">john@example.com</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 rounded-xl bg-gray-800/95 backdrop-blur-xl border-gray-600/50 shadow-2xl"
              side="top"
              align="end"
              sideOffset={8}
            >
              <DropdownMenuItem className="h-10 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <User className="w-4 h-4 mr-3" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-10 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <Wallet className="w-4 h-4 mr-3" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="h-10 rounded-lg hover:bg-gray-700/50 text-gray-300 hover:text-white cursor-pointer transition-colors">
                <Settings className="w-4 h-4 mr-3" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-600/50 my-2" />
              <DropdownMenuItem className="h-10 rounded-lg hover:bg-red-900/30 text-red-400 hover:text-red-300 cursor-pointer transition-colors">
                <LogOut className="w-4 h-4 mr-3" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
