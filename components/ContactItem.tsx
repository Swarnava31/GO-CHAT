import React from 'react';
// FIX: Added .ts extension to the import path.
import type { User, Message } from '../types.ts';
// FIX: Added .ts extension to the import path.
import { MessageType } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { CameraIcon, VideoCameraIcon, MicrophoneIcon } from './Icons.tsx';
// FIX: Added .tsx extension to the import path.
import { StatusIndicator } from './StatusIndicator.tsx';

interface ContactItemProps {
  user: User;
  lastMessage: Message | null;
  isActive: boolean;
  onClick: () => void;
}

export const ContactItem: React.FC<ContactItemProps> = ({ user, lastMessage, isActive, onClick }) => {
  const getMessagePreview = () => {
    if (!lastMessage) return "No messages yet";
    switch (lastMessage.type) {
      case MessageType.IMAGE:
        return <span className="flex items-center gap-1.5"><CameraIcon className="w-4 h-4 text-slate-400" /> Image</span>;
      case MessageType.VIDEO:
        return <span className="flex items-center gap-1.5"><VideoCameraIcon className="w-4 h-4 text-slate-400" /> Video</span>;
      case MessageType.AUDIO:
        return <span className="flex items-center gap-1.5"><MicrophoneIcon className="w-4 h-4 text-slate-400" /> Voice message</span>;
      default:
        return lastMessage.content.length > 25 
          ? `${lastMessage.content.substring(0, 25)}...`
          : lastMessage.content;
    }
  };

  const activeClasses = isActive ? 'bg-teal-500/10' : 'hover:bg-slate-700/50';

  return (
    <li onClick={onClick}>
      <a href="#" className={`flex items-center px-4 py-3 transition duration-200 ${activeClasses}`}>
        <div className="relative flex-shrink-0">
          <img className="h-12 w-12 rounded-full object-cover" src={user.avatarUrl} alt={user.name} />
          <StatusIndicator
            status={user.status}
            className="absolute bottom-0 right-0 border-2 border-slate-800"
          />
        </div>
        <div className="ml-4 flex-1">
          <div className="flex justify-between items-baseline">
            <p className={`font-semibold ${isActive ? 'text-teal-400' : 'text-slate-200'}`}>{user.name}</p>
            {lastMessage && (
               <p className="text-xs text-slate-500">{lastMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-1 truncate">{getMessagePreview()}</p>
        </div>
      </a>
    </li>
  );
};