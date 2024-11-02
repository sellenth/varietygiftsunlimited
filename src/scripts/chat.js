import { RealtimeClient } from '@openai/realtime-api-beta';

// Export the initialization function
export async function initializeChat() {

const client = new RealtimeClient({ apiKey: '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',
  dangerouslyAllowAPIKeyInBrowser: true,
 });

// Can set parameters ahead of connecting, either separately or all at once
client.updateSession({ instructions: 'You are a great, upbeat friend.' });
client.updateSession({ voice: 'alloy' });
client.updateSession({
  turn_detection: { type: 'none' }, // or 'server_vad'
  input_audio_transcription: { model: 'whisper-1' },
});

// Set up event handling
client.on('conversation.updated', (event) => {
  const { item } = event;
  console.log('Conversation updated:', item); // Debug log
  
  // Dispatch a custom event with the latest message
  if (item.role === 'assistant' && item.content?.[0]?.transcript) {
    console.log('Dispatching assistant response:', item.content[0].transcript); // Debug log
    window.dispatchEvent(new CustomEvent('assistantResponse', {
      detail: { text: item.content[0].transcript }
    }));
  }
});

// Connect to Realtime API
await client.connect();
console.log('Connected to Realtime API'); // Debug log

// Send a test message
await client.sendUserMessageContent([{ type: 'input_text', text: `How are you?` }]);
console.log('Sent initial message'); // Debug log

  return client;
} 