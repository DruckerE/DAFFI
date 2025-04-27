const app = document.getElementById('app');

// Create main container
const mainContainer = document.createElement('div');
mainContainer.className = 'main-container';

// ====== CHAT CONTAINER ====== //
const chatContainer = document.createElement('div');
chatContainer.className = 'chat-container';

// Chat header
const chatHeader = document.createElement('header');
chatHeader.className = 'chat-header';
chatHeader.innerHTML = '<h1>Air Force Chat</h1>';

// Chat messages
const chatMessages = document.createElement('main');
chatMessages.className = 'chat-messages';
chatMessages.id = 'chatMessages';

// Starter bot message
const botMessage = document.createElement('div');
botMessage.className = 'message bot';
botMessage.textContent = 'Welcome, Airman! How can I assist you today?';

chatMessages.appendChild(botMessage);

// Chat form
const chatForm = document.createElement('form');
chatForm.className = 'chat-form';
chatForm.id = 'chatForm';

const chatInput = document.createElement('input');
chatInput.type = 'text';
chatInput.id = 'chatInput';
chatInput.placeholder = 'Type your message...';
chatInput.required = true;

const chatButton = document.createElement('button');
chatButton.type = 'submit';
chatButton.textContent = 'Send';

chatForm.appendChild(chatInput);
chatForm.appendChild(chatButton);

// Append parts
chatContainer.appendChild(chatHeader);
chatContainer.appendChild(chatMessages);
chatContainer.appendChild(chatForm);

mainContainer.appendChild(chatContainer);
app.appendChild(mainContainer);

// ====== Chat functionality ======
const API_KEY = "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"; 

chatForm.addEventListener('submit', async function (e) {
  e.preventDefault();
  const userText = chatInput.value.trim();
  if (userText) {
    const userMessage = document.createElement('div');
    userMessage.className = 'message user';
    userMessage.textContent = userText;
    chatMessages.appendChild(userMessage);
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Loading animation
    const loadingMessage = document.createElement('div');
    loadingMessage.className = 'message bot';
    loadingMessage.textContent = '...';
    chatMessages.appendChild(loadingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Call OpenAI API
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo', // You can change model if you want
          messages: [{ role: 'user', content: userText }]
        })
      });

      const data = await response.json();
      const botReply = data.choices[0].message.content.trim();

      // Update loading message with real reply
      loadingMessage.textContent = botReply;
      chatMessages.scrollTop = chatMessages.scrollHeight;

    } catch (error) {
      loadingMessage.textContent = '⚠️ Error connecting to AI.';
      console.error('Error:', error);
    }
  }
});