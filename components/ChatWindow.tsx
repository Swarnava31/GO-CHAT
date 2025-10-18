import React, { useEffect, useRef, useState, useCallback } from 'react';
// FIX: Added .ts extension to the import path.
import type { User, Message } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { MessageBubble } from './MessageBubble.tsx';
// FIX: Added .tsx extension to the import path.
import { MessageComposer } from './MessageComposer.tsx';
// FIX: Added .ts extension to the import path.
import { getSmartReplies, getConversationSummary } from '../services/geminiService.ts';
// FIX: Added .tsx extension to the import path.
import { SparklesIcon, DocumentTextIcon } from './Icons.tsx';
// FIX: Added .ts extension to the import path.
import { MessageType } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { StatusIndicator } from './StatusIndicator.tsx';

interface ChatWindowProps {
  contact: User;
  messages: Message[];
  onSendMessage: (message: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => void;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ contact, messages, onSendMessage }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [smartReplies, setSmartReplies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    setSmartReplies([]);
    setSummary(null);
  }, [contact]);

  const handleFetchSmartReplies = useCallback(async () => {
    setIsLoading(true);
    try {
      const replies = await getSmartReplies(messages);
      setSmartReplies(replies);
    } catch (error) {
      console.error("Failed to get smart replies:", error);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleFetchSummary = useCallback(async () => {
    setIsLoading(true);
    setSummary("Generating summary...");
    try {
      const result = await getConversationSummary(messages);
      setSummary(result);
    } catch (error) {
      console.error("Failed to get summary:", error);
      setSummary("Error: Could not generate summary.");
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const handleSendSmartReply = (reply: string) => {
    onSendMessage({
      type: MessageType.TEXT,
      content: reply,
    });
    setSmartReplies([]);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-900">
      <header className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50 flex-shrink-0">
        <div className="flex items-center">
          <div className="relative flex-shrink-0">
            <img className="h-10 w-10 rounded-full object-cover" src={contact.avatarUrl} alt={contact.name} />
            <StatusIndicator status={contact.status} size="sm" className="absolute bottom-0 right-0 border-2 border-slate-800" />
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold">{contact.name}</h2>
            <p className="text-sm text-slate-400 capitalize">{contact.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <button onClick={handleFetchSummary} disabled={isLoading} className="p-2 rounded-full hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed" title="Summarize Conversation">
                <DocumentTextIcon className="w-6 h-6 text-slate-400" />
            </button>
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {summary && (
        <div className="p-4 m-4 bg-slate-800 rounded-lg border border-slate-700 relative">
          <button onClick={() => setSummary(null)} className="absolute top-2 right-2 text-slate-500 hover:text-slate-300">&times;</button>
          <h4 className="font-bold text-teal-400 mb-2">Conversation Summary</h4>
          <p className="text-sm text-slate-300 whitespace-pre-wrap">{summary}</p>
        </div>
      )}

      {smartReplies.length > 0 && (
          <div className="px-6 pb-2 flex gap-2 flex-wrap">
              {smartReplies.map((reply, i) => (
                  <button key={i} onClick={() => handleSendSmartReply(reply)} className="px-3 py-1.5 bg-slate-700 hover:bg-teal-500/20 text-slate-200 text-sm rounded-full transition">
                      {reply}
                  </button>
              ))}
          </div>
      )}

      <footer className="p-6 pt-0 flex-shrink-0">
        <MessageComposer
            onSendMessage={onSendMessage} 
            onSmartReplyClick={handleFetchSmartReplies}
            isLoading={isLoading}
        />
      </footer>
    </div>
  );
};