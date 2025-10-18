import React, { useState, useEffect, useRef } from 'react';
// FIX: Added .ts extension to the import path.
import type { User, Story } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { XMarkIcon } from './Icons.tsx';

interface StoryViewerProps {
  user: User;
  stories: Story[];
  onClose: () => void;
}

const STORY_DURATION = 5000; // 5 seconds

export const StoryViewer: React.FC<StoryViewerProps> = ({ user, stories, onClose }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goToNextStory = () => {
    setCurrentStoryIndex(prevIndex => {
      if (prevIndex < stories.length - 1) {
        return prevIndex + 1;
      }
      onClose();
      return prevIndex;
    });
  };

  const goToPrevStory = () => {
    setCurrentStoryIndex(prevIndex => Math.max(0, prevIndex - 1));
  };
  
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(goToNextStory, STORY_DURATION);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [currentStoryIndex, stories.length, onClose]);

  if (!stories.length) {
    onClose();
    return null;
  }

  const currentStory = stories[currentStoryIndex];

  // This effect handles the animation of the progress bar
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(0); // Reset on story change
    const interval = setInterval(() => {
        setProgress(p => p + 100 / (STORY_DURATION / 100));
    }, 100);
    return () => clearInterval(interval);
  }, [currentStoryIndex])

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 animate-fade-in" onMouseDown={(e) => e.stopPropagation()}>
      <div className="relative w-full max-w-sm h-[80vh] bg-slate-900 rounded-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Progress Bars */}
        <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
          {stories.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
               <div
                className="h-full bg-white"
                style={{ 
                  width: `${index < currentStoryIndex ? 100 : (index === currentStoryIndex ? progress : 0)}%`,
                  transition: index === currentStoryIndex && progress > 0 ? 'width 0.1s linear' : 'none'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-5 left-4 flex items-center gap-3 z-20">
          <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
          <p className="font-bold text-white" style={{textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>{user.name}</p>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-3 text-white z-20 p-1 rounded-full bg-black/20 hover:bg-black/40 transition">
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="flex-1 w-full h-full">
            {currentStory.type === 'image' ? (
            <img src={currentStory.url} alt="Story" className="w-full h-full object-cover" />
            ) : (
            <video src={currentStory.url} autoPlay muted className="w-full h-full object-cover" onEnded={goToNextStory} />
            )}
        </div>

        {/* Navigation */}
        <div className="absolute inset-0 flex justify-between z-10">
          <div className="w-1/3 h-full cursor-pointer" onClick={goToPrevStory}></div>
          <div className="w-2/3 h-full cursor-pointer" onClick={goToNextStory}></div>
        </div>
      </div>
    </div>
  );
};
