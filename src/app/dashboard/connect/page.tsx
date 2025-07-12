import { Button } from "@/components/ui/button"
import { DataSourceCard, type DataSource } from "@/components/data-source-card"
import { RequestSourceDialog } from "@/components/request-source-dialog"

const dataSources: DataSource[] = [
  { name: "Mailchimp", category: "Marketing" },
  { name: "Constant Contact", category: "Marketing" },
  { name: "QuickBooks", category: "Finance", connected: true },
  { name: "Asana", category: "Project Management" },
  { name: "Monday.com", category: "Project Management" },
  { name: "ShipStation", category: "eCommerce" },
  { name: "Shopify", category: "eCommerce", connected: true },
]

export default function ConnectPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Connect Data Sources
          </h1>
          <p className="text-muted-foreground">
            Integrate your tools to build a unified view of your business.
          </p>
        </div>
        <RequestSourceDialog />
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataSources.map((source) => (
          <DataSourceCard key={source.name} source={source} />
        ))}
      </div>
    </div>
  )
}
