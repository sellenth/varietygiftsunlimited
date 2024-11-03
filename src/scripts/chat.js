import { RealtimeClient } from '@openai/realtime-api-beta';

// Export the initialization function
export async function initializeChat() {
  console.log('Initializing chat...');
  
  const client = new RealtimeClient({
    apiKey: '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',
    dangerouslyAllowAPIKeyInBrowser: true,
  });

  let isProcessingAudio = false;
  let isPaused = false; // Start paused
  let audioQueue = [];
  let isPlaying = false;
  let sharedAudioContext = null;  // Add shared AudioContext

  try {
    // Connect to API first
    console.log('Attempting to connect to Realtime API...');
    await client.connect();
    console.log('Successfully connected to Realtime API');
    isProcessingAudio = true;

    // Set up session parameters
    console.log('Configuring session parameters...');
    client.updateSession({
      instructions: 'You are a great, upbeat friend.',
      voice: 'alloy',
      turn_detection: { type: 'server_vad' },
      input_audio_transcription: { model: 'whisper-1' }
    });

    // Set up audio stream with correct parameters for the API
    console.log('Requesting microphone access...');
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: {
        channelCount: 1,
        sampleRate: 24000,
        sampleSize: 16,
        volume: 1.0
      } 
    });
    console.log('Microphone access granted');

    // Create audio context with specific sample rate
    const audioContext = new AudioContext({
      sampleRate: 24000,
      channelCount: 1,
    });
    
    const source = audioContext.createMediaStreamSource(stream);
    const processor = audioContext.createScriptProcessor(2048, 1, 1);

    source.connect(processor);
    processor.connect(audioContext.destination);

    // Add pause toggle listener
    window.addEventListener('togglePause', (event) => {
      isPaused = event.detail.isPaused;
      console.log(`Audio processing ${isPaused ? 'paused' : 'resumed'}`);
    });

    // Update audio processing to respect pause state
    processor.onaudioprocess = (e) => {
      if (isPaused || !isProcessingAudio || !client.isConnected()) {
        return;
      }

      try {
        const inputData = e.inputBuffer.getChannelData(0);
        // Convert Float32Array [-1,1] to Int16Array [-32768,32767]
        const int16Data = new Int16Array(inputData.length);
        
        for (let i = 0; i < inputData.length; i++) {
          // Clamp the value between -1 and 1
          const s = Math.max(-1, Math.min(1, inputData[i]));
          // Convert to 16-bit integer
          int16Data[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
        }

        if (Math.random() < 0.01) { // Log occasionally
          console.log('Sending audio packet:', {
            samples: int16Data.length,
            sampleRate: audioContext.sampleRate,
            min: Math.min(...int16Data),
            max: Math.max(...int16Data)
          });
        }

        client.appendInputAudio(int16Data);
      } catch (error) {
        console.error('Error processing audio:', error);
        isProcessingAudio = false;
      }
    };

    // Connection state handling
    client.on('disconnect', () => {
      console.warn('Disconnected from Realtime API');
      isProcessingAudio = false;
    });

    client.on('reconnect', () => {
      console.log('Reconnected to Realtime API');
      isProcessingAudio = true;
    });

    client.on('error', (error) => {
      console.error('Realtime API error:', error);
      isProcessingAudio = false;
    });

    // Handle conversation updates
    client.on('conversation.updated', (event) => {
      const { item, delta } = event;
      if (item.role === 'assistant' && item.content[0].transcript) {
        console.log(item);
        if (item.content[0].transcript) {
          console.log('Assistant transcript:', item.content[0].transcript);
          window.dispatchEvent(new CustomEvent('assistantResponse', {
            detail: { text: item.content[0].transcript }
          }));
        }
        if (delta?.audio) {
          console.log('Received audio chunk, queue length:', audioQueue.length);
          audioQueue.push(delta.audio);
          
          // Initialize shared AudioContext if needed
          if (!sharedAudioContext) {
            sharedAudioContext = new AudioContext();
          }
          
          // Resume the context if it's suspended
          if (sharedAudioContext.state === 'suspended') {
            sharedAudioContext.resume();
          }
          
          playNextAudioChunk();
        }
      }
    });

    // Updated playNextAudioChunk function
    function playNextAudioChunk() {
      if (isPlaying || audioQueue.length === 0) {
        console.log('Skipping playback - isPlaying:', isPlaying, 'queue length:', audioQueue.length);
        return;
      }
      
      try {
        isPlaying = true;
        const audioChunk = audioQueue.shift();
        
        console.log('Playing chunk, remaining in queue:', audioQueue.length);
        
        const audioBuffer = sharedAudioContext.createBuffer(1, audioChunk.length, 24000);
        const channelData = audioBuffer.getChannelData(0);
        
        // Convert Int16 to Float32
        for (let i = 0; i < audioChunk.length; i++) {
          channelData[i] = audioChunk[i] / 32768.0;
        }
        
        const source = sharedAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(sharedAudioContext.destination);
        
        source.onended = () => {
          console.log('Chunk finished playing');
          isPlaying = false;
          playNextAudioChunk();  // Play next chunk if available
        };
        
        source.start(0);
      } catch (error) {
        console.error('Error playing audio chunk:', error);
        isPlaying = false;  // Reset playing state on error
        playNextAudioChunk();  // Try next chunk
      }
    }

    console.log('Chat initialization complete');
    return client;

  } catch (error) {
    console.error('Error during chat initialization:', error);
    isProcessingAudio = false;
    throw error;
  }
} 