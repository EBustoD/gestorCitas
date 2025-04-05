import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientsTable } from "@/components/clients-table"

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
        <p className="text-muted-foreground">Gestione la información de sus clientes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
          <CardDescription>Visualice y gestione todos sus clientes</CardDescription>
        </CardHeader>
        <CardContent>
          <ClientsTable />
        </CardContent>
      </Card>
    </div>
  )
}

