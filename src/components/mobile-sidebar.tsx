"use client";

import { useState } from "react";
import { TrendingUp, Wallet, Settings, LogOut, User, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import data from "./sidebar-data";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-800/50 p-2"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-5 h-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Mobile Menu Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-sm bg-gray-900/95 backdrop-blur-xl border-gray-700/50 p-0">
          <div className="flex flex-col h-[80vh]">
            {/* Header */}
            <DialogHeader className="flex flex-row items-center justify-between p-6 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
                </div>
                <DialogTitle className="text-white font-bold">
                  FinTrakr
                </DialogTitle>
              </div>
            </DialogHeader>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-6">
              <nav className="space-y-6">
                {/* Main Navigation */}
                <div>
                  <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    Dashboard
                  </h3>
                  <ul className="space-y-1">
                    {data.navMain.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.url}
                          className={`
                              flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                              ${
                                item.isActive
                                  ? "bg-gradient-to-r from-purple-600/20 to-pink-600/20 text-white border border-purple-500/30"
                                  : "text-gray-300 hover:text-white hover:bg-gray-800/60"
                              }
                            `}
                          onClick={() => setIsOpen(false)}
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
                  <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                    Account
                  </h3>
                  <ul className="space-y-1">
                    {data.navSecondary.map((item) => (
                      <li key={item.title}>
                        <a
                          href={item.url}
                          className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 transition-all duration-200"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-5 h-5 flex-shrink-0" />
                          <span>{item.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {/* User Menu */}
            <div className="p-6 border-t border-gray-700/50">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10 border-2 border-purple-500/40">
                  <AvatarImage
                    // src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-white">John Doe</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/60 h-10"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4 mr-3" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/60 h-10"
                  onClick={() => setIsOpen(false)}
                >
                  <Wallet className="w-4 h-4 mr-3" />
                  Billing
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800/60 h-10"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="w-4 h-4 mr-3" />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/30 h-10"
                  onClick={() => setIsOpen(false)}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
