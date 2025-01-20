function toggleChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.classList.toggle('show');
  }
  
  function addMessageToChat(message, isUser = true) {
    const messages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '10px';
    messageDiv.textContent = message;
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
  }
  
  function showTypingIndicator() {
    const messages = document.getElementById('chatMessages');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typingIndicator';
    typingIndicator.textContent = 'Escribiendo...';
    messages.appendChild(typingIndicator);
    messages.scrollTop = messages.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
 // API URL
const API_URL = 'https://hook-theta-sepia.vercel.app/api'; // Cambia a tu URL desplegada

// Generar un ID único
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// Clase de sesión
class ChatSession {
  constructor() {
    this.sessionId = this.getOrCreateSessionId();
    this.messagingHistory = [];
  }

  getOrCreateSessionId() {
    let sessionId = localStorage.getItem('chat_session_id');
    if (!sessionId) {
      sessionId = generateUUID();
      localStorage.setItem('chat_session_id', sessionId);
      localStorage.setItem('chat_session_timestamp', Date.now());
    }
    return sessionId;
  }

  addMessage(content, isUser = true) {
    this.messagingHistory.push({ content, isUser, timestamp: new Date().toISOString() });
  }

  getHistory() {
    return this.messagingHistory;
  }
}

let chatSession;

// Inicializar el chat
function initializeChat() {
  chatSession = new ChatSession();
  console.log('Chat iniciado con ID de sesión:', chatSession.sessionId);
}

// Enviar mensaje a la API
async function sendMessageToAPI(message) {
  try {
    const response = await fetch(`${API_URL}/send-message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        sessionId: chatSession.sessionId
      })
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error al enviar mensaje:', error);
    return 'Lo siento, ocurrió un error al procesar tu mensaje.';
  }
}

// Enviar mensaje al chat
async function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();

  if (message !== '') {
    input.disabled = true;
    chatSession.addMessage(message, true);
    addMessageToChat(message, true);

    input.value = '';
    showTypingIndicator();

    try {
      const response = await sendMessageToAPI(message);  // Aquí se pasa el mensaje
      removeTypingIndicator();
      chatSession.addMessage(response, false);
      addMessageToChat(response, false);
    } catch (error) {
      removeTypingIndicator();
      addMessageToChat('Lo siento, ocurrió un error al procesar tu mensaje.', false);
    } finally {
      input.disabled = false;
      input.focus();
    }
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', initializeChat);

// Enviar mensaje con Enter
document.getElementById('messageInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});