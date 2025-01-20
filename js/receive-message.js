// api/receive-message.js
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Procesa la solicitud POST
    const data = req.body;
    console.log('Received data:', data);

    // Aquí puedes agregar la lógica para manejar la data recibida
    // Por ejemplo, guardarla en una base de datos, enviarla a otro servicio, etc.

    // Responde con un status 200 OK
    res.status(200).json({ message: 'Data received successfully' });
  } else {
    // Maneja cualquier otro método HTTP
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
