const express = require('express');
const router = express.Router();
const db = require('../config/db');

// POST: Create an appointment (existing)
router.post('/', async (req, res) => {
  const { Nombre, Telefono, Fecha, Nota } = req.body;
  console.log(req.body);
  try {
    const [result] = await db.execute(
      'INSERT INTO cita (Nombre, Telefono, Fecha, Nota) VALUES (?, ?, ?, ?)',
      [Nombre, Telefono, Fecha, Nota]
    );
    res.json({ idCita: result.insertId, message: 'Appointment created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating appointment' });
  }
});

// GET: Retrieve all appointments
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM cita');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// PUT: Update an existing appointment
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { Nombre, Telefono, Fecha, Nota } = req.body;
  try {
    const [result] = await db.execute(
      'UPDATE cita SET Nombre=?, Telefono=?, Fecha=?, Nota=? WHERE idCita=?',
      [Nombre, Telefono, Fecha, Nota, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json({ message: 'Appointment updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating appointment' });
  }
});

module.exports = router;
