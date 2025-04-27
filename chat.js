// chat.js

// Send message to AI
async function sendMessageToAI(message) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key is missing. Check your environment variables.");
    showBotMessage("Error: Missing API key.");
    return;
  }

  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 100
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      showBotMessage(data.choices[0].text.trim());
    } else {
      showBotMessage("No response from AI.");
    }

  } catch (error) {
    console.error("Error connecting to AI:", error);
    showBotMessage("Error connecting to AI.");
  }
}

// Show user message
function showUserMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
}

// Show bot message
function showBotMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
}

// Handle form submit
document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chatForm');

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const chatInput = document.getElementById('chatInput');
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
      showUserMessage(userMessage);
      sendMessageToAI(userMessage);
      chatInput.value = "";
    }
  });
});
