"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface Client {
  id: number
  name: string
  phone: string
  appointmentsCount: number
  lastAppointment: string
}

export function ClientsTable() {
  const [clients, setClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch appointments and transform them into client data
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:3001/appointments")
        const data = await response.json()

        // Transform appointments into client data
        const clientMap = new Map<string, Client>()

        data.forEach((appt: any) => {
          const name = appt.Nombre
          const phone = appt.Telefono
          const date = new Date(appt.Fecha)

          if (clientMap.has(phone)) {
            const client = clientMap.get(phone)!
            client.appointmentsCount += 1

            // Update last appointment if this one is more recent
            const lastDate = new Date(client.lastAppointment)
            if (date > lastDate) {
              client.lastAppointment = date.toISOString()
            }
          } else {
            clientMap.set(phone, {
              id: clientMap.size + 1,
              name,
              phone,
              appointmentsCount: 1,
              lastAppointment: date.toISOString(),
            })
          }
        })

        setClients(Array.from(clientMap.values()))
      } catch (error) {
        console.error("Error fetching clients:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchClients()
  }, [])

  const filteredClients = clients.filter(
    (client) => client.name.toLowerCase().includes(searchTerm.toLowerCase()) || client.phone.includes(searchTerm),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nombre o teléfono..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>Total Citas</TableHead>
              <TableHead>Última Cita</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Cargando clientes...
                </TableCell>
              </TableRow>
            ) : filteredClients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No se encontraron clientes
                </TableCell>
              </TableRow>
            ) : (
              filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.appointmentsCount}</TableCell>
                  <TableCell>{new Date(client.lastAppointment).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

