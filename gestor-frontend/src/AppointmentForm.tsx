import React, { useState, ChangeEvent, FormEvent } from 'react';

interface AppointmentFormProps {
  onAppointmentAdded: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onAppointmentAdded }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Telefono: '',
    Fecha: '',
    Nota: '',
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
      const response = await fetch('http://localhost:3000/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onAppointmentAdded();
        setFormData({ Nombre: '', Telefono: '', Fecha: '', Nota: '' });
      } else {
        console.error('Error adding appointment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Añadir cita</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Nombre"
          placeholder="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="Telefono"
          placeholder="Telefono"
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
          placeholder="Nota"
          value={formData.Nota}
          onChange={handleChange}
        />
        <button type="submit">Añadir cita</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
