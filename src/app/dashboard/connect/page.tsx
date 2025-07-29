
"use client";

import { Button } from "@/components/ui/button"
import { DataSourceCard, type DataSource } from "@/components/data-source-card"
import { RequestSourceDialog } from "@/components/request-source-dialog"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

const dataSources: DataSource[] = [
  { name: "Mailchimp", category: "Marketing", connected: false }, // Default to not connected
  { name: "Constant Contact", category: "Marketing" },
  { name: "QuickBooks", category: "Finance", connected: true },
  { name: "Asana", category: "Project Management" },
  { name: "Monday.com", category: "Project Management" },
  { name: "ShipStation", category: "eCommerce" },
  { name: "Shopify", category: "eCommerce", connected: true },
]

const categories = ["All", ...Array.from(new Set(dataSources.map(ds => ds.category)))]

export default function ConnectPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const status = searchParams.get('status')
    const source = searchParams.get('source')
    const error = searchParams.get('error')

    if (status === 'success' && source === 'mailchimp') {
      toast({
        title: "Mailchimp Connected!",
        description: "Successfully integrated with your Mailchimp account.",
      })
      // In a real app, you'd want to update the state of the card here
      // For this prototype, a page reload will reflect the "connected" state
      // after you manually update `dataSources` array.
    } else if (error) {
      toast({
        title: "Connection Failed",
        description: `Could not connect to ${source || 'the service'}. Reason: ${error}`,
        variant: "destructive",
      })
    }
  }, [searchParams, toast])

  const filteredDataSources = selectedCategory === "All"
    ? dataSources
    : dataSources.filter(source => source.category === selectedCategory)

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
      
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="shrink-0"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredDataSources.map((source) => (
          <DataSourceCard key={source.name} source={source} />
        ))}
      </div>
    </div>
  )
}
