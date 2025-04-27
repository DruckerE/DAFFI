// chat.js

const apiKey = "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";

async function sendMessageToAI(message) {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      showBotMessage(data.choices[0].message.content.trim());
    } else {
      showBotMessage("No response from AI.");
    }

  } catch (error) {
    console.error("Error connecting to AI:", error);
    showBotMessage("Error connecting to AI.");
  }
}

function showUserMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message user';
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
}

function showBotMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
}

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
