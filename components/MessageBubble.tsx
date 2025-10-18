
import React from 'react';
// FIX: Added .ts extension to the import path.
import type { Message } from '../types.ts';
// FIX: Added .ts extension to the import path.
import { MessageType } from '../types.ts';
// FIX: Added .ts extension to the import path.
import { CURRENT_USER_ID } from '../constants.ts';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isCurrentUser = message.senderId === CURRENT_USER_ID;

  const renderContent = () => {
    switch (message.type) {
      case MessageType.IMAGE:
        return (
          <img
            src={message.url}
            alt="User upload"
            className="rounded-lg max-w-xs lg:max-w-md cursor-pointer"
            onClick={() => window.open(message.url, '_blank')}
          />
        );
      case MessageType.VIDEO:
        return (
          <video
            src={message.url}
            controls
            className="rounded-lg max-w-xs lg:max-w-md"
          />
        );
      case MessageType.AUDIO:
        return <audio src={message.url} controls className="w-64" />;
      case MessageType.TEXT:
      default:
        return <p className="text-base">{message.content}</p>;
    }
  };

  const bubbleClasses = isCurrentUser
    ? 'bg-teal-600'
    : 'bg-slate-700';
  
  const bubbleContainerClasses = `flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`;

  return (
    <div className={bubbleContainerClasses}>
      <div className={`p-1 rounded-2xl ${bubbleClasses} ${message.type !== MessageType.TEXT ? 'bg-opacity-100' : ''}`}>
        {message.type === MessageType.TEXT ? (
             <div className="px-3 py-2">
                {renderContent()}
             </div>
        ) : (
            renderContent()
        )}
      </div>
      <span className="text-xs text-slate-500 mt-1.5 px-1">
        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};