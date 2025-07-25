"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PDFImportDialog } from "./pdf-import-dialog";
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Activity,
  Plus,
  MoreHorizontal,
  Sparkles,
  AlertCircle,
  Coffee,
  Car,
  Home,
  ShoppingCart,
  Utensils,
  Zap,
  CreditCard,
  ArrowDownRight,
  Target,
  PiggyBank,
} from "lucide-react";
import { PlaidConnectBankLink } from "./plaid-connect-bank-link";

interface ParsedExpense {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  merchant?: string;
}

interface ParsedStatement {
  accountName: string;
  statementPeriod: string;
  totalIncome: number;
  totalExpenses: number;
  netCashFlow: number;
  expenses: ParsedExpense[];
  categories: {
    [key: string]: {
      total: number;
      count: number;
      percentage: number;
    };
  };
}

const CATEGORY_ICONS: { [key: string]: any } = {
  "Food & Dining": Utensils,
  Transportation: Car,
  Shopping: ShoppingCart,
  Entertainment: Coffee,
  "Bills & Utilities": Zap,
  Housing: Home,
  Healthcare: Activity,
  Other: CreditCard,
};

const CATEGORY_COLORS: { [key: string]: string } = {
  "Food & Dining": "from-orange-500 to-red-500",
  Transportation: "from-blue-500 to-cyan-500",
  Shopping: "from-purple-500 to-pink-500",
  Entertainment: "from-green-500 to-emerald-500",
  "Bills & Utilities": "from-yellow-500 to-orange-500",
  Housing: "from-indigo-500 to-purple-500",
  Healthcare: "from-red-500 to-pink-500",
  Other: "from-gray-500 to-slate-500",
};

interface DashboardClientProps {
  userName: string;
}

export function DashboardClient({ userName }: DashboardClientProps) {
  const [parsedData, setParsedData] = useState<ParsedStatement | null>(null);

  const handleDataParsed = (data: ParsedStatement) => {
    setParsedData(data);
  };
  console.log(parsedData);

  return (
    <div className="flex flex-col gap-4">
      {/* Header Actions Bar */}
      <div className="flex items-center justify-between px-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-400">
            {parsedData
              ? `Showing data from ${parsedData.statementPeriod} - ${parsedData.accountName}`
              : "Here's what's happening with your portfolio today."}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge
            variant="secondary"
            className="border-emerald-400/40 text-emerald-300 bg-emerald-500/10 font-medium"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            Pro Plan
          </Badge>

          <PDFImportDialog onDataParsed={handleDataParsed} />

          <Button
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      <PlaidConnectBankLink />

      {parsedData ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">
          {/* Expenses List */}
          <Card className="md:col-span-2 bg-gray-900/50 border-gray-700/50 text-white">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Your recent expenses from the imported statement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {parsedData.expenses.map((expense) => {
                  const Icon =
                    CATEGORY_ICONS[expense.category] || MoreHorizontal;
                  return (
                    <li
                      key={expense.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            CATEGORY_COLORS[expense.category] ||
                            CATEGORY_COLORS["Other"]
                          }`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-gray-400">
                            {expense.date} - {expense.category}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold text-lg">
                        -${expense.amount.toFixed(2)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>

          {/* Categories Summary */}
          <Card className="bg-gray-900/50 border-gray-700/50 text-white">
            <CardHeader>
              <CardTitle>Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(parsedData.categories)
                .sort(([, a], [, b]) => b.total - a.total)
                .map(([category, data]) => (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm font-semibold">
                        ${data.total.toFixed(2)}
                      </span>
                    </div>
                    <Progress value={data.percentage} className="h-2" />
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="text-center py-20 px-4">
          <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <PieChart className="w-12 h-12 text-gray-500" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">
            No Data Yet
          </h2>
          <p className="text-gray-400">
            Import a financial statement to get started.
          </p>
        </div>
      )}
    </div>
  );
}
