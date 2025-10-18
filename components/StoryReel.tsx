import React from 'react';
// FIX: Added .ts extension to the import path.
import type { Story, User } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { StoryAvatar } from './StoryAvatar.tsx';
// FIX: Added .ts extension to the import path.
import { CURRENT_USER_ID } from '../constants.ts';

interface StoryReelProps {
  stories: Story[];
  users: User[];
  onViewStory: (user: User) => void;
}

export const StoryReel: React.FC<StoryReelProps> = ({ stories, users, onViewStory }) => {
  const usersWithStories = users.filter(user => 
    user.id !== CURRENT_USER_ID && stories.some(s => s.userId === user.id)
  );

  return (
    <div className="px-4 py-3 border-b border-slate-700/50">
      <h3 className="text-xs font-bold uppercase text-slate-500 mb-3">Stories</h3>
      <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
        {usersWithStories.map(user => {
          const userStories = stories.filter(s => s.userId === user.id);
          const hasUnviewed = userStories.some(s => !s.viewed);
          return (
            <StoryAvatar
              key={user.id}
              user={user}
              hasUnviewedStories={hasUnviewed}
              onClick={() => onViewStory(user)}
            />
          );
        })}
      </div>
    </div>
  );
};
