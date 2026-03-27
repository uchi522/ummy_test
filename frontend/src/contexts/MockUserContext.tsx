import { createContext, useContext, useState, ReactNode } from 'react';
import { MockUser, MOCK_USERS } from '@/lib/mockData';

interface MockUserContextValue {
  currentUser: MockUser;
  setCurrentUser: (user: MockUser) => void;
  mockUsers: MockUser[];
}

const MockUserContext = createContext<MockUserContextValue | null>(null);

export function MockUserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MockUser>(MOCK_USERS[0]);

  return (
    <MockUserContext.Provider value={{ currentUser, setCurrentUser, mockUsers: MOCK_USERS }}>
      {children}
    </MockUserContext.Provider>
  );
}

export function useMockUser() {
  const ctx = useContext(MockUserContext);
  if (!ctx) throw new Error('useMockUser must be used within MockUserProvider');
  return ctx;
}
