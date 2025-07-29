import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  Clock,
  MessageSquare,
  PlusCircle,
  XCircle,
} from "lucide-react"
import Link from "next/link"

const connectedSources = [
  { name: "QuickBooks", status: "Connected", lastUpdated: "2 minutes ago" },
  { name: "Shopify", status: "Connected", lastUpdated: "5 minutes ago" },
  { name: "Mailchimp", status: "Disconnected", lastUpdated: "Never" },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome Back!</CardTitle>
            <CardDescription>
              Here's a quick look at what's new since you last logged in.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Review My Business</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Last Session's Insights
            </CardTitle>
            <CardDescription>
              A summary of the key takeaways from your last analysis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1 text-sm text-muted-foreground">
            <ul className="list-disc space-y-1 pl-5">
              <li>Revenue is up 15% month-over-month.</li>
              <li>Identified "Product B" as a high-performing item.</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            AI Chat
          </CardTitle>
          <CardDescription>
            Have a question about your data? Ask our AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button disabled>Coming Soon</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected Data Sources</CardTitle>
          <CardDescription>
            Manage your integrations and see their current status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-xs">
              {connectedSources.map((source) => (
                <TableRow key={source.name}>
                  <TableCell className="font-medium">{source.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        source.status === "Connected" ? "default" : "destructive"
                      }
                      className="flex w-fit items-center gap-1"
                    >
                      {source.status === "Connected" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      <span>{source.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{source.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t pt-6">
          <Button asChild variant="outline">
            <Link href="/dashboard/connect">
              <PlusCircle className="mr-2 h-4 w-4" />
              Connect New Data Source
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
