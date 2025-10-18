import React, { useState, useEffect } from 'react';
// FIX: Added .ts extension to the import path.
import type { User, Message, Story } from './types.ts';
// FIX: Added .ts extension to the import path.
import { MOCK_USERS, MOCK_MESSAGES, MOCK_STORIES, CURRENT_USER_ID } from './constants.ts';
// FIX: Added .tsx extension to the import path.
import { LoginScreen } from './components/LoginScreen.tsx';
// FIX: Added .tsx extension to the import path.
import { ContactList } from './components/ContactList.tsx';
// FIX: Added .tsx extension to the import path.
import { ChatWindow } from './components/ChatWindow.tsx';
// FIX: Added .tsx extension to the import path.
import { WelcomeScreen } from './components/WelcomeScreen.tsx';
// FIX: Added .tsx extension to the import path.
import { StoryReel } from './components/StoryReel.tsx';
// FIX: Added .tsx extension to the import path.
import { StoryViewer } from './components/StoryViewer.tsx';

const App: React.FC = () => {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [stories, setStories] = useState<Story[]>([]);
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [viewingStory, setViewingStory] = useState<User | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setUsers(MOCK_USERS);
    setMessages(MOCK_MESSAGES);
    setStories(MOCK_STORIES);
  }, []);

  const handleLogin = (email: string) => {
    setCurrentUserEmail(email);
    // Here you might fetch user-specific data
  };

  const handleSelectContact = (userId: string) => {
    setActiveContactId(userId);
  };

  const handleSendMessage = (message: Omit<Message, 'id' | 'timestamp' | 'senderId'>) => {
    if (!activeContactId) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      timestamp: new Date(),
      senderId: CURRENT_USER_ID,
      ...message,
    };

    setMessages(prevMessages => ({
      ...prevMessages,
      [activeContactId]: [...(prevMessages[activeContactId] || []), newMessage],
    }));
  };
  
  const handleViewStory = (user: User) => {
    setViewingStory(user);
  };
  
  const handleCloseStory = () => {
    setViewingStory(null);
  };

  if (!currentUserEmail) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const activeContact = users.find(u => u.id === activeContactId);

  return (
    <div className="flex h-screen w-screen bg-slate-800 text-slate-100 font-sans">
      <aside className="w-96 flex flex-col bg-slate-800 border-r border-slate-700/50">
        <header className="p-4 border-b border-slate-700/50 flex-shrink-0">
          <h1 className="text-2xl font-bold text-teal-400">ChatSphere</h1>
        </header>
        <StoryReel stories={stories} users={users} onViewStory={handleViewStory} />
        <ContactList
          users={users.filter(u => u.id !== CURRENT_USER_ID)}
          messages={messages}
          activeContactId={activeContactId}
          onSelectContact={handleSelectContact}
        />
      </aside>
      <main className="flex-1 flex flex-col">
        {activeContact ? (
          <ChatWindow
            contact={activeContact}
            messages={messages[activeContact.id] || []}
            onSendMessage={handleSendMessage}
          />
        ) : (
          <WelcomeScreen />
        )}
      </main>
      {viewingStory && (
        <StoryViewer 
          user={viewingStory}
          stories={stories.filter(s => s.userId === viewingStory.id)} 
          onClose={handleCloseStory} 
        />
      )}
    </div>
  );
};

export default App;
