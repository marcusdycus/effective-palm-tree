import {
  BarChart3,
  PieChart,
  CreditCard,
  Target,
  Activity,
  Settings,
  Bell,
} from "lucide-react";

const data = {
  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Portfolio",
      url: "/dashboard/portfolio",
      icon: PieChart,
    },
    {
      title: "Transactions",
      url: "/dashboard/transactions",
      icon: CreditCard,
    },
    {
      title: "Goals",
      url: "/dashboard/goals",
      icon: Target,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: Activity,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings,
    },
    {
      title: "Notifications",
      url: "/dashboard/notifications",
      icon: Bell,
    },
  ],
};

export default data;
