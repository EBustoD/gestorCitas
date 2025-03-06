const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Initialize the client with local authentication
const client = new Client({
  authStrategy: new LocalAuth()
});

// Generate and display QR code in the terminal for authentication
client.on('qr', (qr) => {
  console.log('Scan the following QR code with your WhatsApp app:');
  qrcode.generate(qr, { small: true });
});

// Confirm when the client is ready
client.on('ready', () => {
  console.log('WhatsApp client is ready!');
});

client.initialize();

// Helper function to send a WhatsApp message
const sendWhatsAppMessage = async (to, message) => {
    try {
      const phoneStr = String(to); // Ensure it's a string
      const chatId = phoneStr.includes('@c.us') ? phoneStr : `${phoneStr}@c.us`;
      await client.sendMessage(chatId, message);
      console.log(`Message sent to ${to}`);
    } catch (error) {
      console.error(`Error sending message to ${to}:`, error);
    }
  };

module.exports = {
  sendWhatsAppMessage
};
