import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    change: "+$1,999.00",
    avatar: "https://placehold.co/40x40.png",
    dataAiHint: "woman portrait"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    change: "+$39.00",
    avatar: "https://placehold.co/40x40.png",
    dataAiHint: "man portrait"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    change: "+$299.00",
    avatar: "https://placehold.co/40x40.png",
    dataAiHint: "woman smiling"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    change: "+$99.00",
    avatar: "https://placehold.co/40x40.png",
    dataAiHint: "man professional"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    change: "+$39.00",
    avatar: "https://placehold.co/40x40.png",
    dataAiHint: "woman face"
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.email} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.avatar} alt="Avatar" data-ai-hint={activity.dataAiHint} />
                <AvatarFallback>{activity.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{activity.name}</p>
                <p className="text-sm text-muted-foreground">{activity.email}</p>
              </div>
              <div className="ml-auto font-medium">{activity.change}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
