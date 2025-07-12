"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Wand2 } from "lucide-react"
import { generateDataSummary } from "@/ai/flows/generate-data-summary"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export function AiSummary() {
  const [summary, setSummary] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { toast } = useToast()

  const handleGenerateSummary = async () => {
    setIsLoading(true)
    setSummary("")

    const mockData = {
      connectedDataSources: ["QuickBooks", "Shopify"],
      data: {
        quickbooks: {
          revenue: 75231.89,
          expenses: 30000,
          profit: 45231.89,
          top_expenses: [
            { category: "Marketing", amount: 12000 },
            { category: "Software", amount: 5000 },
            { category: "Salaries", amount: 13000 },
          ],
        },
        shopify: {
          total_sales: 12234,
          new_customers: 2350,
          top_selling_products: [
            { name: "Product A", sales: 4500 },
            { name: "Product B", sales: 3200 },
          ],
          traffic_sources: [
            { source: "Google", visitors: 15000 },
            { source: "Facebook", visitors: 8000 },
          ],
        },
      },
    }

    try {
      const result = await generateDataSummary(mockData)
      setSummary(result.summary)
    } catch (error) {
      console.error("Failed to generate summary:", error)
      toast({
        title: "Error",
        description: "Failed to generate AI summary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <CardTitle>AI-Powered Summary</CardTitle>
        </div>
        <CardDescription>
          Get key insights, trends, and anomalies from your data.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        {isLoading ? (
          <div className="space-y-3 flex-grow">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        ) : summary ? (
          <div className="prose prose-sm dark:prose-invert text-sm text-foreground flex-grow">
            {summary.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground flex-grow flex flex-col items-center justify-center">
            <p>Click the button to generate a summary of your connected data.</p>
          </div>
        )}
        
        <Button onClick={handleGenerateSummary} disabled={isLoading} className="mt-4 w-full">
          {isLoading ? "Generating..." : "Generate Summary"}
        </Button>
      </CardContent>
    </Card>
  )
}
