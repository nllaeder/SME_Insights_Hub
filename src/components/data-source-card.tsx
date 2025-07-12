"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SaasIcon } from "./icons/saas-icon"
import { CheckCircle, Zap } from "lucide-react"

export type DataSource = {
  name: "Mailchimp" | "Constant Contact" | "QuickBooks" | "Asana" | "Monday.com" | "ShipStation" | "Shopify"
  category: string
  connected?: boolean
}

interface DataSourceCardProps {
  source: DataSource
}

export function DataSourceCard({ source }: DataSourceCardProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(source.connected ?? false)

  const handleConnect = () => {
    setIsConnecting(true)
    // Simulate OAuth flow
    setTimeout(() => {
      setIsConnecting(false)
      setIsConnected(true)
    }, 1500)
  }

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
            <SaasIcon name={source.name} className="h-10 w-10" />
            {isConnected && (
                <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>Connected</span>
                </div>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardTitle className="text-lg">{source.name}</CardTitle>
        <CardDescription className="flex-grow mb-4">{source.category}</CardDescription>
        <Button
          onClick={handleConnect}
          disabled={isConnecting || isConnected}
          variant={isConnected ? "secondary" : "default"}
          className="w-full"
        >
          {isConnecting ? (
            "Connecting..."
          ) : isConnected ? (
            "Manage"
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Connect
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
