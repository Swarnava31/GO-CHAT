// FIX: Added .ts extension to the import path.
import { User, Message, Story, UserStatus, MessageType } from './types.ts';

export const CURRENT_USER_ID = 'user-0'; // Let's assume the current user is "You"

export const MOCK_USERS: User[] = [
  { id: CURRENT_USER_ID, name: 'You', avatarUrl: 'https://i.pravatar.cc/150?u=user-0', status: UserStatus.ONLINE },
  { id: 'user-1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=user-1', status: UserStatus.ONLINE },
  { id: 'user-2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=user-2', status: UserStatus.AWAY },
  { id: 'user-3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=user-3', status: UserStatus.BUSY },
  { id: 'user-4', name: 'Diana', avatarUrl: 'https://i.pravatar.cc/150?u=user-4', status: UserStatus.OFFLINE },
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'user-1': [
    { id: 'msg-1-1', senderId: 'user-1', type: MessageType.TEXT, content: 'Hey, how is it going?', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
    { id: 'msg-1-2', senderId: CURRENT_USER_ID, type: MessageType.TEXT, content: 'Pretty good! Just working on this new project. You?', timestamp: new Date(Date.now() - 1000 * 60 * 4) },
    { id: 'msg-1-3', senderId: 'user-1', type: MessageType.TEXT, content: 'Same here. It\'s pretty intense. Need a break soon.', timestamp: new Date(Date.now() - 1000 * 60 * 3) },
    { id: 'msg-1-4', senderId: 'user-1', type: MessageType.IMAGE, content: 'Look at this funny meme I found!', url: 'https://i.imgflip.com/1bij.jpg', timestamp: new Date(Date.now() - 1000 * 60 * 2) },
  ],
  'user-2': [
    { id: 'msg-2-1', senderId: 'user-2', type: MessageType.TEXT, content: 'Did you see the game last night?', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: 'msg-2-2', senderId: CURRENT_USER_ID, type: MessageType.TEXT, content: 'Yeah, it was a nail-biter!', timestamp: new Date(Date.now() - 1000 * 60 * 25) },
  ],
  'user-3': [
    { id: 'msg-3-1', senderId: 'user-3', type: MessageType.TEXT, content: 'Can we reschedule our meeting?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  ],
};

export const MOCK_STORIES: Story[] = [
    { id: 'story-1-1', userId: 'user-1', type: 'image', url: 'https://picsum.photos/1080/1920?random=1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), viewed: false },
    { id: 'story-2-1', userId: 'user-2', type: 'image', url: 'https://picsum.photos/1080/1920?random=2', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), viewed: true },
    { id: 'story-2-2', userId: 'user-2', type: 'image', url: 'https://picsum.photos/1080/1920?random=3', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), viewed: false },
    { id: 'story-3-1', userId: 'user-3', type: 'image', url: 'https://picsum.photos/1080/1920?random=4', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), viewed: false },
];
