import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function SignupConfirmPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Success-themed orbs */}
        <div className="absolute top-20 left-20 w-48 h-48 lg:w-72 lg:h-72 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center mb-8 text-center">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-white">
                FinTrakr
              </span>
            </div>
          </div>

          {/* Confirmation Card */}
          <Card className="border border-gray-800 bg-gray-900/50 backdrop-blur-xl shadow-2xl">
            <CardContent className="p-8 text-center">
              {/* Success Icon */}
              <div className="relative mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full shadow-lg relative">
                  <Mail className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                </div>
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-400/30 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border-2 border-emerald-400/20 animate-ping delay-75"></div>
              </div>

              {/* Content */}
              <div className="space-y-4 mb-8">
                <h1 className="text-3xl font-bold text-white">
                  Check Your Email
                </h1>
                <p className="text-lg text-gray-300">
                  We've sent you a confirmation link
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Please check your email and click the confirmation link to
                  activate your FinTrakr account. Don't forget to check your
                  spam folder if you don't see it in your inbox.
                </p>
              </div>

              {/* Email Tips */}
              <div className="bg-gray-800/50 rounded-xl p-6 mb-8 text-left">
                <h3 className="text-white font-semibold mb-3 flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-emerald-400" />
                  What's next?
                </h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Check your email inbox for our confirmation message
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Click the "Confirm Account" button in the email
                  </li>
                  <li className="flex items-start">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    Start tracking your financial portfolio
                  </li>
                </ul>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <Link href="/login">
                  <Button className="w-full h-14 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 group">
                    <span className="flex items-center justify-center">
                      Continue to Sign In
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  className="w-full h-12 border-2 border-gray-700 hover:border-emerald-500 bg-transparent hover:bg-emerald-500/10 text-gray-300 hover:text-white font-medium rounded-xl transition-all duration-300"
                >
                  Resend Confirmation Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Need help? Contact our{" "}
              <a
                href="#"
                className="text-emerald-400 hover:text-emerald-300 font-medium"
              >
                support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
