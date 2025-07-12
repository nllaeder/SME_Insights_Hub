import { KpiCard } from "@/components/dashboard/kpi-card"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { MetricsChart } from "@/components/dashboard/metrics-chart"
import { AiSummary } from "@/components/dashboard/ai-summary"
import { TrendingUp, Users, DollarSign, ShoppingCart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s a summary of your business.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="New Customers"
          value="+2,350"
          change="+180.1% from last month"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Sales"
          value="+12,234"
          change="+19% from last month"
          icon={<ShoppingCart className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Active Users"
          value="+573"
          change="+201 since last hour"
          icon={<TrendingUp className="h-5 w-5 text-muted-foreground" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MetricsChart />
        </div>
        <div className="lg:col-span-1">
          <AiSummary />
        </div>
      </div>

      <div>
        <ActivityFeed />
      </div>
    </div>
  )
}
