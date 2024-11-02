import { RealtimeClient } from 'openai-realtime-api';

// Export the initialization function
export function initializeChat(openai_key) {
  const client = new RealtimeClient({
    apiKey: openai_key,
    dangerouslyAllowAPIKeyInBrowser: true,
    sessionConfig: {
      instructions: "You are a friendly robot assistant. Keep your responses brief and engaging.",
      voice: 'alloy',
      input_audio_transcription: { model: 'whisper-1' }
    }
  });

  // Set up event handling for conversation updates
  client.on('conversation.updated', (event) => {
    const { delta } = event;
    if (delta?.role === 'assistant' && delta?.content) {
      // Update the robot's text with the assistant's response
      const robotText = document.querySelector('a-text');
      if (robotText) {
        robotText.setAttribute('value', delta.content);
      }
    }
  });

  // Connect to the Realtime API
  client.connect();

  // Send initial greeting
  client.sendUserMessageContent([{ type: 'input_text', text: 'Hello!' }]);

  return client;
} 