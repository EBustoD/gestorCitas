import { CalendarView } from "@/components/calendar-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
        <p className="text-muted-foreground">Gestione sus citas y vea su calendario</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendario de Citas</CardTitle>
          <CardDescription>Visualice y gestione todas sus citas</CardDescription>
        </CardHeader>
        <CardContent>
          <CalendarView />
        </CardContent>
      </Card>
    </div>
  )
}

