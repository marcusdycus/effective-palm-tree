import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  ArrowRight,
  CheckCircle,
  PieChart,
  Target,
  Smartphone,
  Search,
  Users,
  Star,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

// import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

// const config = new Configuration({
//   basePath: PlaidEnvironments["sandbox"],
//   baseOptions: {
//     headers: {
//       "PLAID-CLIENT-ID": "6881107ec232ad0025879d2d",
//       "PLAID-SECRET": "5649ba42136bce7767b5d8dcc06a27",
//     },
//   },
// });

// const plaid = new PlaidApi(config);

// (async () => {
//   try {
//     const response = await plaid.linkTokenCreate({
//       user: { client_user_id: "hello" },
//       client_name: "Test App",
//       products: ["auth"],
//       country_codes: ["US"],
//       language: "en",
//     });
//     console.log("Link Token:", response.data.link_token);
//   } catch (err) {
//     console.error("Plaid test error:", err.response?.data || err);
//   }
// })();

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 lg:px-12">
        <div className="flex items-center">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
          </div>
          <span className="ml-3 text-xl font-bold text-white">FinTrakr</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-gray-300 hover:text-white hover:bg-gray-800/50"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25 transition-all">
              Get Started Free
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">
              Now in Beta - Join Early Access
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Take Control of Your Money —{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-emerald-400 bg-clip-text text-transparent">
              Without the Overwhelm
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Fintrakr helps you track your monthly spending, build a smarter
            budget, and find real ways to save — all in one simple dashboard.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-700 hover:via-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 group"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Get Started Free
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 border-2 border-gray-600 hover:border-purple-500 bg-transparent hover:bg-purple-500/10 text-gray-300 hover:text-white font-semibold rounded-xl transition-all duration-300"
            >
              Join the Waitlist
            </Button>
          </div>

          {/* Hero Visual Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 flex items-center justify-center">
                <div className="text-center">
                  <TrendingUp className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-300 font-medium">Dashboard Preview</p>
                  <p className="text-gray-500 text-sm">
                    Interactive demo coming soon
                  </p>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-bounce delay-300"></div>
            <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-bounce delay-700"></div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Built for Real Life
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              No spreadsheets, no complexity. Just smart tools that help you
              understand and control your money.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <Card className="border-gray-700/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Built for Real Life
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Create a monthly budget that actually fits your lifestyle — no
                  spreadsheets required.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-gray-700/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Find Where You're Overspending
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Smart suggestions help you spot waste and reclaim your money.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-gray-700/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <PieChart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  See the Big Picture
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Track trends and progress over time so you can stay
                  consistent.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-gray-700/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-900/70 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Mobile-Friendly
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Check your spending or update your budget on the go.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Vision Statement */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="border-gray-700/50 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="text-2xl lg:text-3xl font-medium text-white mb-8 leading-relaxed">
                "Most budgeting apps are built for finance nerds.{" "}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Fintrakr is built for real people
                </span>{" "}
                who just want to stop stressing about money."
              </blockquote>

              <div className="flex items-center justify-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">10,000+ Early Users</span>
                </div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">Beta Testing</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative z-10 px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to stop guessing and start saving?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Create your free Fintrakr account today and take the first step
            toward financial clarity.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-16 px-10 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 group text-lg"
              >
                Create My Free Account
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            No credit card required • Free forever • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800/50 px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <span className="ml-2 text-lg font-bold text-white">
                FinTrakr
              </span>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800/50 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>
              © 2024 FinTrakr. All rights reserved. Built for real people who
              want to stop stressing about money.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
