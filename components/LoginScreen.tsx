import React, { useState } from 'react';
// FIX: Added .tsx extension to the import path.
import { ChatBubbleLeftRightIcon } from './Icons.tsx';

interface LoginScreenProps {
  onLogin: (email: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    // A simple regex for email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email address cannot be empty.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onLogin(email);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-900 text-slate-100 p-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-block p-6 rounded-full bg-slate-800/50 mb-6">
          <ChatBubbleLeftRightIcon className="w-12 h-12 text-teal-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-100">Welcome to ChatSphere</h1>
        <p className="mt-2 text-lg text-slate-400">Enter your email to start connecting.</p>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              aria-label="Email Address"
              autoFocus
            />
            {error && <p className="text-red-400 text-sm mt-2 text-left px-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out"
          >
            Start Chatting
          </button>
        </form>
      </div>
    </div>
  );
};