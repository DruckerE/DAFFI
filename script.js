// script.js

async function fetchAIResponse(prompt) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  if (!apiKey) {
    console.error("API key not found. Make sure it is set in Vercel.");
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
        prompt: prompt,
        max_tokens: 100
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      displayResponse(data.choices[0].text);
    } else {
      displayResponse("No response from AI.");
    }

  } catch (error) {
    console.error("Error connecting to AI:", error);
    displayResponse("Error connecting to AI.");
  }
}

// Display the AI's response in your app
function displayResponse(text) {
  const chatMessages = document.getElementById('chatMessages');
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message bot';
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
}

// Handle form submission
document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chatForm');

  if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const chatInput = document.getElementById('chatInput');
      const userText = chatInput.value.trim();
      if (userText !== "") {
        displayUserMessage(userText);
        fetchAIResponse(userText);
        chatInput.value = "";
      }
    });
  }
});

function displayUserMessage(text) {
  const chatMessages = document.getElementById('chatMessages');
  const userDiv = document.createElement('div');
  userDiv.className = 'message user';
  userDiv.textContent = text;
  chatMessages.appendChild(userDiv);
}
