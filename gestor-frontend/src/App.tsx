// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, EventProps } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AppointmentForm from './AppointmentForm';
import UpdateAppointmentForm from './UpdateAppointmentForm';

interface AppointmentEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  phone: string;
  note: string;
}

// Set Moment to Spanish
moment.locale('es');
const localizer = momentLocalizer(moment);

// Spanish messages for the calendar toolbar and other texts
const messages = {
  allDay: 'Todo el día',
  previous: 'Anterior',
  next: 'Siguiente',
  today: 'Hoy',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: (total: number) => `+ Ver más (${total})`,
};

// Override weekday formats using the localizer's format method
const formats = {
  weekdayFormat: (date: Date, culture: string, localizer: any) =>
    localizer.format(date, 'dddd', culture),
  dayHeaderFormat: (date: Date, culture: string, localizer: any) =>
    localizer.format(date, 'dddd', culture),
};

// Custom event component to show the event title with hour
const EventComponent: React.FC<EventProps<AppointmentEvent>> = ({ event }) => {
  const startTime = moment(event.start).format('HH:mm');
  return (
    <div>
      <strong>{event.title}</strong> <span>({startTime})</span>
    </div>
  );
};

const App: React.FC = () => {
  const [appointments, setAppointments] = useState<AppointmentEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<AppointmentEvent | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState('month'); // default view

  // Fetch appointments from the backend
  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:3000/appointments');
      const data = await response.json();
      const events: AppointmentEvent[] = data.map((appt: any) => ({
        id: appt.idCita,
        title: appt.Nombre,
        start: new Date(appt.Fecha),
        end: new Date(new Date(appt.Fecha).getTime() + 60 * 60 * 1000),
        phone: appt.Telefono,
        note: appt.Nota,
      }));
      setAppointments(events);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleRefresh = () => {
    fetchAppointments();
  };

  const handleSelectEvent = (event: AppointmentEvent) => {
    setSelectedEvent(event);
    setShowUpdateForm(true);
  };

  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // After creation, refresh appointments and close the modal.
  const handleCreateSuccess = () => {
    handleRefresh();
    handleCloseCreateModal();
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Calendario de Citas</h1>

      {/* Button to open the create appointment modal */}
      <button onClick={handleOpenCreateModal}>Crear Cita</button>

      {/* Modal for creating a new appointment */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Agregar Nueva Cita</h2>
            <AppointmentForm onAppointmentAdded={handleCreateSuccess} />
            <button onClick={handleCloseCreateModal} style={{ marginTop: '10px' }}>
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Calendar Component */}
      <Calendar
        localizer={localizer}
        events={appointments}
        date={currentDate}
        view={currentView}
        onNavigate={(newDate: Date, view: string, action: string) => {
          console.log('Navigation action:', action, newDate, view);
          setCurrentDate(newDate);
        }}
        onView={(view: string) => {
          console.log('Changing view to:', view);
          setCurrentView(view);
        }}
        formats={formats}
        culture="es" // Force Spanish culture
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: '50px 0' }}
        messages={messages}
        components={{
          event: EventComponent, // Use the custom event component here
        }}
        onSelectEvent={handleSelectEvent}
      />

      {/* Modal for updating an appointment */}
      {showUpdateForm && selectedEvent && (
        <UpdateAppointmentForm
          appointment={selectedEvent}
          onClose={() => setShowUpdateForm(false)}
          onAppointmentUpdated={handleRefresh}
        />
      )}
    </div>
  );
};

export default App;
