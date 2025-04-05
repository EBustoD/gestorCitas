const express = require('express');
const app = express();
const appointmentsRoute = require('./routes/appointments');
const cors = require('cors');


app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// API route for appointments
app.use('/appointments', appointmentsRoute);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Initialize the reminder job (which will use the WhatsApp client)
require('./jobs/reminder');
