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

  // Rest of your client code...
  return client;
} 