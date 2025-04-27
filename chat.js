// chat.js

const apiKey = "YOUR_API_KEY_HERE"; // <-- replace with your real OpenAI key

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
      console.log("API RAW Response:", data);
      showBotMessage("No response from AI (empty).");
    }

  } catch (error) {
    console.error("Error connecting to AI:", error);
    showBotMessage("Error connecting to AI.");
  }
}
