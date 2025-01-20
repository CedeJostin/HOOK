const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../front-end')));

// Manejar todas las demás rutas para servir el frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../front-end/index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
