import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MobileMenuTrigger } from "@/components/app-sidebar";
import { Greeting } from "@/components/ui/greeting";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Activity,
  Users,
  ArrowUpRight,
  Plus,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();
  if (profileError || !profileData || !profileData.completed_onboarding) {
    redirect("/onboarding");
  }
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <MobileMenuTrigger />
          <Separator
            orientation="vertical"
            className="mr-2 h-4 bg-gray-600 lg:hidden"
          />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block text-gray-500" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white font-medium">
                  Overview
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-4">
          <div className="flex items-center gap-3">
            <Badge
              variant="default"
              className="border-emerald-400/40 text-emerald-300 bg-emerald-500/10 font-medium"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              Pro Plan
            </Badge>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25 transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="px-4 pb-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            <Greeting />, {profileData.name} 👋
          </h1>
          <p className="text-gray-400">
            Here's what's happening with your portfolio today.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-4">
        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Total Portfolio
            </CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$45,231.89</div>
            <p className="text-xs text-emerald-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Today's Change
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">+$1,234.56</div>
            <p className="text-xs text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +2.8% today
            </p>
          </CardContent>
        </Card>

        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Active Investments
            </CardTitle>
            <PieChart className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-gray-400">Across 4 categories</p>
          </CardContent>
        </Card>

        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">
              Monthly Goal
            </CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78%</div>
            <p className="text-xs text-blue-400">$3,900 of $5,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 px-4">
        {/* Portfolio Performance Chart */}
        <Card className="col-span-4 border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">
                  Portfolio Performance
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Your portfolio value over the last 6 months
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 bg-transparent transition-colors"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed border-gray-600/50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400 font-medium">Portfolio Chart</p>
                <p className="text-gray-500 text-sm">
                  Interactive chart widget placeholder
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription className="text-gray-400">
              Latest transactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Bought",
                  asset: "AAPL",
                  amount: "+$1,234",
                  time: "2 hours ago",
                  positive: true,
                },
                {
                  action: "Sold",
                  asset: "TSLA",
                  amount: "-$856",
                  time: "5 hours ago",
                  positive: false,
                },
                {
                  action: "Dividend",
                  asset: "MSFT",
                  amount: "+$45",
                  time: "1 day ago",
                  positive: true,
                },
                {
                  action: "Bought",
                  asset: "BTC",
                  amount: "+$2,100",
                  time: "2 days ago",
                  positive: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-800/40 border border-gray-600/30 hover:bg-gray-800/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.positive ? "bg-emerald-400" : "bg-red-400"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {item.action} {item.asset}
                      </p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                  <div
                    className={`text-sm font-medium ${
                      item.positive ? "text-emerald-400" : "text-red-400"
                    }`}
                  >
                    {item.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-4">
        {/* Top Holdings */}
        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Top Holdings</CardTitle>
            <CardDescription className="text-gray-400">
              Your largest positions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  symbol: "AAPL",
                  name: "Apple Inc.",
                  value: "$12,450",
                  percentage: "27.5%",
                  change: "+2.3%",
                },
                {
                  symbol: "MSFT",
                  name: "Microsoft",
                  value: "$8,920",
                  percentage: "19.7%",
                  change: "+1.8%",
                },
                {
                  symbol: "GOOGL",
                  name: "Alphabet",
                  value: "$6,780",
                  percentage: "15.0%",
                  change: "-0.5%",
                },
              ].map((holding, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {holding.symbol.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {holding.symbol}
                      </p>
                      <p className="text-xs text-gray-400">{holding.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      {holding.value}
                    </p>
                    <p className="text-xs text-gray-400">
                      {holding.percentage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market News */}
        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Market News</CardTitle>
            <CardDescription className="text-gray-400">
              Latest financial updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center border-2 border-dashed border-gray-600/50 rounded-lg">
              <div className="text-center">
                <Activity className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">News Feed Widget</p>
                <p className="text-gray-500 text-xs">
                  Market updates placeholder
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-gray-700/50 bg-gray-900/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
            <CardDescription className="text-gray-400">
              Common tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-16 flex-col border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 bg-transparent transition-colors"
              >
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-xs">Add Asset</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 bg-transparent transition-colors"
              >
                <TrendingUp className="w-5 h-5 mb-1" />
                <span className="text-xs">View Report</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 bg-transparent transition-colors"
              >
                <PieChart className="w-5 h-5 mb-1" />
                <span className="text-xs">Rebalance</span>
              </Button>
              <Button
                variant="outline"
                className="h-16 flex-col border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700/50 bg-transparent transition-colors"
              >
                <Users className="w-5 h-5 mb-1" />
                <span className="text-xs">Share</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
