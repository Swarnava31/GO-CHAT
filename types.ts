export enum UserStatus {
  ONLINE = 'online',
  AWAY = 'away',
  BUSY = 'busy',
  OFFLINE = 'offline',
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  status: UserStatus;
}

export enum MessageType {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
}

export interface Message {
  id: string;
  senderId: string;
  type: MessageType;
  content: string;
  url?: string;
  timestamp: Date;
}

export interface Story {
  id: string;
  userId: string;
  type: 'image' | 'video';
  url: string;
  timestamp: Date;
  viewed: boolean;
}
