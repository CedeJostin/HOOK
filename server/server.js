const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'https://hook-rljwpi22m-cedejostins-projects.vercel.app', // Cambia esto al dominio de tu frontend
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,Origin' // Asegúrate de incluir 'Origin' en los encabezados permitidos
}));

// Endpoint para recibir datos de n8n
app.post('/api/webhook', (req, res) => {
  const data = req.body;
  console.log('Data received from n8n:', data);
  res.status(200).send('Data received successfully');
});

// Endpoint para que el frontend envíe mensajes al backend
app.post('/api/send-message', (req, res) => {
  const { message, sessionId } = req.body;
  console.log('Message received from frontend:', message);
  res.status(200).send({ response: 'Message processed' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
