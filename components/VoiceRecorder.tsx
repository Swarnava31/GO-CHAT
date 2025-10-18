
import React, { useState, useRef } from 'react';
// FIX: Added .tsx extension to the import path.
import { MicrophoneIcon, StopIcon } from './Icons.tsx';

interface VoiceRecorderProps {
  onSendVoice: (blob: Blob) => void;
}

export const VoiceRecorder: React.FC<VoiceRecorderProps> = ({ onSendVoice }) => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onSendVoice(audioBlob);
        audioChunksRef.current = [];
        // Stop all tracks on the stream to release the microphone
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone access was denied. Please allow microphone access in your browser settings.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`p-3 rounded-full transition ${isRecording ? 'bg-red-600 hover:bg-red-500 animate-pulse' : 'bg-teal-600 hover:bg-teal-500'}`}
    >
      {isRecording 
        ? <StopIcon className="w-6 h-6 text-white" /> 
        : <MicrophoneIcon className="w-6 h-6 text-white" />
      }
    </button>
  );
};