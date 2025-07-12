import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type React from "react"

interface KpiCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}

export function KpiCard({ title, value, change, icon }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{change}</p>
      </CardContent>
    </Card>
  )
}
