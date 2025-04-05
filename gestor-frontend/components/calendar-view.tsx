"use client"

import { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "moment/locale/es"
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AppointmentDialog } from "@/components/appointment-dialog"
import { UpdateAppointmentDialog } from "@/components/update-appointment-dialog"
import { useToast } from "@/hooks/use-toast"

// Set Moment to Spanish
moment.locale("es")
const localizer = momentLocalizer(moment)

export interface AppointmentEvent {
  id: number
  title: string
  start: Date
  end: Date
  phone: string
  note: string
}

// Spanish messages for the calendar
const messages = {
  allDay: "Todo el día",
  previous: "Anterior",
  next: "Siguiente",
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "Día",
  agenda: "Agenda",
  date: "Fecha",
  time: "Hora",
  event: "Evento",
  noEventsInRange: "No hay citas en este rango.",
  showMore: (total: number) => `+ Ver más (${total})`,
}

// Custom formats
const formats = {
  weekdayFormat: (date: Date, culture: string, localizer: any) => localizer.format(date, "dddd", culture),
  dayHeaderFormat: (date: Date, culture: string, localizer: any) => localizer.format(date, "dddd", culture),
}

export function CalendarView() {
  const [appointments, setAppointments] = useState<AppointmentEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [currentView, setCurrentView] = useState("month")
  const { toast } = useToast()

  // Fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:3001/appointments")
      const data = await response.json()
      const events: AppointmentEvent[] = data.map((appt: any) => ({
        id: appt.idCita,
        title: appt.Nombre,
        start: new Date(appt.Fecha),
        end: new Date(new Date(appt.Fecha).getTime() + 60 * 60 * 1000),
        phone: appt.Telefono,
        note: appt.Nota,
      }))
      setAppointments(events)
    } catch (error) {
      console.error("Error fetching appointments:", error)
      toast({
        title: "Error",
        description: "No se pudieron cargar las citas",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  const handleSelectEvent = (event: AppointmentEvent) => {
    setSelectedEvent(event)
    setIsUpdateModalOpen(true)
  }

  const handleCreateSuccess = () => {
    fetchAppointments()
    setIsCreateModalOpen(false)
    toast({
      title: "Cita creada",
      description: "La cita ha sido creada exitosamente",
    })
  }

  const handleUpdateSuccess = () => {
    fetchAppointments()
    setIsUpdateModalOpen(false)
    toast({
      title: "Cita actualizada",
      description: "La cita ha sido actualizada exitosamente",
    })
  }

  // Custom event component
  const EventComponent = ({ event }: { event: AppointmentEvent }) => {
    const startTime = moment(event.start).format("HH:mm")
    return (
      <div className="text-xs">
        <strong>{event.title}</strong> <span>({startTime})</span>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nueva Cita
        </Button>
      </div>

      <div className="rounded-md border bg-white">
        <Calendar
          localizer={localizer}
          events={appointments}
          date={currentDate}
          view={currentView as any}
          onNavigate={(newDate: Date) => setCurrentDate(newDate)}
          onView={(view: string) => setCurrentView(view)}
          formats={formats}
          culture="es"
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          messages={messages}
          components={{
            event: EventComponent as any,
          }}
          onSelectEvent={handleSelectEvent}
          className="rbc-calendar-custom"
        />
      </div>

      <AppointmentDialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} onSuccess={handleCreateSuccess} />

      {selectedEvent && (
        <UpdateAppointmentDialog
          open={isUpdateModalOpen}
          onOpenChange={setIsUpdateModalOpen}
          appointment={selectedEvent}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  )
}

