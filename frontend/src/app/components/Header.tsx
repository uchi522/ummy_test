import { useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { useMockUser } from '@/contexts/MockUserContext';

export function Header() {
  const { currentUser, setCurrentUser, mockUsers } = useMockUser();
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <div className="bg-gradient-to-br from-[#F08020] to-[#FF6347] rounded-xl px-6 h-16 flex items-center justify-center shadow-lg">
          <span className="text-white text-xl font-bold tracking-wide">Ummy</span>
        </div>

        {/* Mock User Switcher */}
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
          >
            <img
              src={currentUser.avatarUrl}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-700 hidden sm:block">
              {currentUser.name}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {open && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 z-20 py-1">
                <p className="text-xs text-gray-400 px-4 pt-2 pb-1 font-medium uppercase tracking-wider">
                  Switch User
                </p>
                {mockUsers.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      setCurrentUser(user);
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-800 flex-1 text-left">{user.name}</span>
                    {currentUser.id === user.id && (
                      <Check className="w-4 h-4 text-[#F08020]" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
