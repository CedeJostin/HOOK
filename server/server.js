const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: [
    'https://hook-snowy.vercel.app',
    'https://hook-cedejostins-projects.vercel.app',
    'https://hook-git-main-cedejostins-projects.vercel.app',
    'https://hook-mfrx406gl-cedejostins-projects.vercel.app'
  ], // Cambia esto al dominio de tu frontend
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
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
