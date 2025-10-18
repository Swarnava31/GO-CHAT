import React from 'react';
// FIX: Added .ts extension to the import path.
import type { User } from '../types.ts';

interface StoryAvatarProps {
  user: User;
  hasUnviewedStories: boolean;
  onClick: () => void;
}

export const StoryAvatar: React.FC<StoryAvatarProps> = ({ user, hasUnviewedStories, onClick }) => {
  const ringClasses = hasUnviewedStories
    ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-slate-800'
    : 'ring-2 ring-slate-600 ring-offset-2 ring-offset-slate-800';

  return (
    <div className="flex-shrink-0 text-center cursor-pointer group" onClick={onClick}>
      <div className={`relative inline-block p-0.5 rounded-full transition-transform group-hover:scale-105 ${ringClasses}`}>
        <img
          className="h-14 w-14 rounded-full object-cover"
          src={user.avatarUrl}
          alt={user.name}
        />
      </div>
      <p className="mt-2 text-xs text-slate-400 truncate w-16">{user.name}</p>
    </div>
  );
};
