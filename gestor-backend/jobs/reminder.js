const cron = require('node-cron');
const db = require('../config/db');
const { sendWhatsAppMessage } = require('../services/whatsapp');

// Schedule a job to run every day at 8:00 AM
cron.schedule('0 8 * * *', async () => {
  console.log('Running daily appointment reminder job');
  try {
    // Query appointments scheduled for the next day
    const [rows] = await db.execute(
      "SELECT Nombre, Telefono, Fecha FROM cita WHERE DATE(Fecha) = CURDATE() + INTERVAL 1 DAY"
    );
    
    rows.forEach(appointment => {
      const { Nombre, Telefono, Fecha } = appointment;
      const message = `Hola ${Nombre}!, Esto es un mensaje automatico para recordate que tienes una cita el ${Fecha}.`;
      sendWhatsAppMessage(Telefono, message);
    });
  } catch (err) {
    console.error('Error fetching appointments:', err);
  }
});
// const cron = require('node-cron');
// const db = require('../config/db');
// const { sendWhatsAppMessage } = require('../services/whatsapp');

// // Schedule a job to run every 30 seconds for debugging
// cron.schedule('*/15 * * * * *', async () => {
//   console.log(`Debug Job triggered at: ${new Date().toLocaleString()}`);
//   try {
//     // For debugging, you might query the appointments or log other details.
//     const [rows] = await db.execute(
//       "SELECT Nombre, Telefono, Fecha FROM cita WHERE DATE(Fecha) = CURDATE() + INTERVAL 1 DAY"
//     );
    
//     rows.forEach(appointment => {
//       const { Nombre, Telefono, Fecha } = appointment;
//       console.log(`Sending debug reminder to ${Nombre} at ${Telefono} for ${Fecha}`);
//       const message = `Hello ${Nombre}, this is a debug reminder for your appointment on ${Fecha}.`;
//       sendWhatsAppMessage(Telefono, message);
//     });
//   } catch (err) {
//     console.error('Error during debug job execution:', err);
//   }
// });
