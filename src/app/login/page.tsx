import { login } from "@/app/login/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background Elements - Optimized for mobile */}
      <div className="absolute inset-0">
        {/* Floating Orbs - Smaller on mobile */}
        <div className="absolute top-10 left-10 w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 xl:px-20">
          <div className="max-w-md">
            {/* Logo */}
            <div className="flex items-center mb-8">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
              </div>
              <span className="ml-3 text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                FinTrakr
              </span>
            </div>

            {/* Hero Text */}
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome back to
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                your dashboard
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Sign in to continue tracking your investments and managing your
              financial portfolio.
            </p>

            {/* Stats */}
            <div className="flex space-x-8">
              <div>
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">$2.5B+</div>
                <div className="text-sm text-gray-400">Assets Tracked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden flex flex-col items-center justify-center mb-8 text-center">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <span className="ml-3 text-2xl font-bold text-white">
                  FinTrakr
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm sm:text-base px-4">
                Sign in to your account
              </p>
            </div>

            {/* Login Card */}
            <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-xl shadow-2xl">
              <CardContent className="p-6 sm:p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg relative">
                    <Zap className="w-8 h-8 text-white" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Sign In
                  </h2>
                  <p className="text-gray-400">
                    Enter your credentials to continue
                  </p>
                </div>

                <form className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Email Address
                    </Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        className="pl-12 h-12 sm:h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 rounded-xl"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-300"
                    >
                      Password
                    </Label>
                    <div className="relative group">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 group-focus-within:text-purple-400 transition-colors" />
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                        className="pl-12 h-12 sm:h-14 bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 rounded-xl"
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="text-sm text-purple-400 hover:text-purple-300 font-medium transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <Button
                      formAction={login}
                      className="w-full h-12 sm:h-14 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 group"
                    >
                      <span className="flex items-center justify-center">
                        Sign In
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-700" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-gray-900 px-4 text-gray-500 font-medium">
                          New to FinTrakr?
                        </span>
                      </div>
                    </div>

                    <Link href="/signup">
                      <Button
                        variant="outline"
                        className="w-full h-12 sm:h-14 border-2 border-gray-700 hover:border-purple-500 bg-transparent hover:bg-purple-500/10 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] group"
                      >
                        <span className="flex items-center justify-center">
                          Create Account
                          <div className="ml-2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full group-hover:animate-pulse"></div>
                        </span>
                      </Button>
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Protected by enterprise-grade security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
