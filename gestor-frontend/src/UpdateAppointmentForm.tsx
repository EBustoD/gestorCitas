// src/UpdateAppointmentForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AppointmentEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  phone: string;
  note: string;
}

interface UpdateAppointmentFormProps {
  appointment: AppointmentEvent;
  onClose: () => void;
  onAppointmentUpdated: () => void;
}

const UpdateAppointmentForm: React.FC<UpdateAppointmentFormProps> = ({ appointment, onClose, onAppointmentUpdated }) => {
  const [formData, setFormData] = useState({
    Nombre: appointment.title,
    Telefono: appointment.phone,
    // Format date for datetime-local input (YYYY-MM-DDTHH:MM)
    Fecha: new Date(appointment.start).toISOString().slice(0, 16),
    Nota: appointment.note,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/appointments/${appointment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onAppointmentUpdated();
        onClose();
      } else {
        console.error('Error updating appointment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Actualizar Cita</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Nombre"
            placeholder="Name"
            value={formData.Nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Telefono"
            placeholder="Phone (numbers only)"
            value={formData.Telefono}
            onChange={handleChange}
            required
          />
          <input
            type="datetime-local"
            name="Fecha"
            value={formData.Fecha}
            onChange={handleChange}
            required
          />
          <textarea
            name="Nota"
            placeholder="Note"
            value={formData.Nota}
            onChange={handleChange}
          />
          <button type="submit">Actualizar</button>
          <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAppointmentForm;
