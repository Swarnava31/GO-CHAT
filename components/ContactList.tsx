
import React from 'react';
// FIX: Added .ts extension to the import path.
import type { User, Message } from '../types.ts';
// FIX: Added .tsx extension to the import path.
import { ContactItem } from './ContactItem.tsx';

interface ContactListProps {
  users: User[];
  messages: Record<string, Message[]>;
  activeContactId: string | null;
  onSelectContact: (userId: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ users, messages, activeContactId, onSelectContact }) => {
  return (
    <nav className="flex-1 overflow-y-auto">
      <ul>
        {users.map(user => {
            const userMessages = messages[user.id] || [];
            const lastMessage = userMessages.length > 0 ? userMessages[userMessages.length - 1] : null;

            return (
              <ContactItem
                key={user.id}
                user={user}
                lastMessage={lastMessage}
                isActive={user.id === activeContactId}
                onClick={() => onSelectContact(user.id)}
              />
            );
        })}
      </ul>
    </nav>
  );
};