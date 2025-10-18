
import React, { useState, useRef } from 'react';
// FIX: Added .ts extension to the import path.
import { MessageType } from '../types.ts';
// FIX: Added .ts extension to the import path.
import type { Message } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { PaperAirplaneIcon, PaperClipIcon, SparklesIcon, XMarkIcon } from './Icons.tsx';
// FIX: Added .tsx extension to the import path.
import { VoiceRecorder } from './VoiceRecorder.tsx';


interface MessageComposerProps {
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => void;
  onSmartReplyClick: () => void;
  isLoading: boolean;
}

export const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage, onSmartReplyClick, isLoading }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (file) {
      const fileType = file.type.startsWith('image') ? MessageType.IMAGE : MessageType.VIDEO;
      onSendMessage({
        type: fileType,
        content: file.name,
        url: URL.createObjectURL(file),
      });
      setFile(null);
    } else if (text.trim()) {
      onSendMessage({
        type: MessageType.TEXT,
        content: text,
      });
      setText('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSendVoice = (blob: Blob) => {
    onSendMessage({
      type: MessageType.AUDIO,
      content: 'Voice message',
      url: URL.createObjectURL(blob),
    });
  }

  return (
    <div className="bg-slate-800 rounded-xl p-2 flex items-center gap-2">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*,video/*"
        onChange={handleFileChange}
      />

      <button onClick={() => fileInputRef.current?.click()} className="p-2 rounded-full hover:bg-slate-700 transition">
        <PaperClipIcon className="w-6 h-6 text-slate-400" />
      </button>

      <div className="flex-1 relative">
        {file ? (
          <div className="flex items-center justify-between p-2 bg-slate-700 rounded-lg">
            <span className="text-sm text-slate-300 truncate">{file.name}</span>
            <button onClick={() => setFile(null)}>
              <XMarkIcon className="w-5 h-5 text-slate-400 hover:text-slate-100" />
            </button>
          </div>
        ) : (
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full bg-transparent px-3 py-2 text-slate-200 placeholder-slate-500 focus:outline-none"
            disabled={isLoading}
          />
        )}
      </div>

       <button onClick={onSmartReplyClick} disabled={isLoading} className="p-2 rounded-full hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-wait">
        <SparklesIcon className="w-6 h-6 text-teal-400" />
      </button>

      {text || file ? (
        <button onClick={handleSend} className="p-3 bg-teal-600 rounded-full hover:bg-teal-500 transition">
          <PaperAirplaneIcon className="w-6 h-6 text-white" />
        </button>
      ) : (
        <VoiceRecorder onSendVoice={handleSendVoice} />
      )}
    </div>
  );
};