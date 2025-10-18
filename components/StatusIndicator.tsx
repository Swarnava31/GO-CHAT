import React from 'react';
// FIX: Added .ts extension to the import path.
import { UserStatus } from '../types.ts';

interface StatusIndicatorProps {
  status: UserStatus;
  size?: 'sm' | 'md';
  className?: string;
}

const statusClasses: Record<UserStatus, string> = {
  [UserStatus.ONLINE]: 'bg-green-500',
  [UserStatus.AWAY]: 'bg-yellow-500',
  [UserStatus.BUSY]: 'bg-red-500',
  [UserStatus.OFFLINE]: 'bg-slate-500',
};

const sizeClasses = {
  sm: 'h-2.5 w-2.5',
  md: 'h-3 w-3',
};

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status, size = 'md', className = '' }) => {
  const statusColor = statusClasses[status] || 'bg-slate-500';
  const sizeClass = sizeClasses[size] || sizeClasses.md;
  
  return (
    <span 
      className={`block rounded-full ${sizeClass} ${statusColor} ${className}`} 
      title={status.charAt(0).toUpperCase() + status.slice(1)}
    />
  );
};