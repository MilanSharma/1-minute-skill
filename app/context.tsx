import createContextHook from '@nkzw/create-context-hook';
import { useState } from 'react';
import { MOCK_VIDEOS } from '@/constants/mocks';

export interface User {
  id: string;
  name: string;
  balance: number;
  avatar: string;
  isCreator: boolean;
}

const DEFAULT_USER: User = {
  id: 'u1',
  name: 'Demo User',
  balance: 15.50,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  isCreator: false,
};

export const [AppContext, useApp] = createContextHook(() => {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [feed] = useState(MOCK_VIDEOS);
  const [myRequests, setMyRequests] = useState<any[]>([]);

  const requestSkill = (category: string, prompt: string, price: number) => {
    // Simulate API call
    const newRequest = {
      id: Date.now().toString(),
      category,
      prompt,
      price,
      status: 'pending', // pending, delivered
      createdAt: new Date(),
    };
    setMyRequests(prev => [newRequest, ...prev]);
    
    // Simulate balance deduction
    setUser(u => ({ ...u, balance: u.balance - price }));

    return newRequest;
  };

  return {
    user,
    feed,
    myRequests,
    requestSkill,
  };
});
