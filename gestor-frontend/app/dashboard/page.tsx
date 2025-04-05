import { CalendarView } from "@/components/calendar-view"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>
        <p className="text-muted-foreground">Gestione sus citas y vea su calendario</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Citas Totales</CardTitle>
            <CardDescription>Total de citas programadas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Citas Hoy</CardTitle>
            <CardDescription>Citas programadas para hoy</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Próxima Cita</CardTitle>
            <CardDescription>La próxima cita programada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">Juan Pérez - 14:30</div>
          </CardContent>
        </Card>
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

