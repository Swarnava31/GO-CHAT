
import React from 'react';
// FIX: Added .tsx extension to the import path.
import { ChatBubbleLeftRightIcon } from './Icons.tsx';

export const WelcomeScreen: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center bg-slate-900 h-full">
      <div className="p-8 rounded-full bg-slate-800/50 mb-6">
        <ChatBubbleLeftRightIcon className="w-16 h-16 text-teal-400" />
      </div>
      <h2 className="text-3xl font-bold text-slate-100">Welcome to ChatSphere</h2>
      <p className="mt-2 text-lg text-slate-400">Select a contact from the list to start a conversation.</p>
    </div>
  );
};