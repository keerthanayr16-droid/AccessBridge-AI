import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, Bell, Sun, Moon, ChevronDown, Check } from 'lucide-react';

interface TopHeaderProps {
  onSearch: (query: string) => void;
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onOpenNotifications?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onSearch,
  selectedLanguage,
  onLanguageChange,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' }
  ];

  const currentLangObj = languages.find(l => l.code === selectedLanguage) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#E2ECE7] px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Search Input Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for schemes, services or ask a question..."
            className="w-full pl-10 pr-16 py-2 bg-[#F3F7F5] border border-transparent rounded-xl text-sm text-[#1E293B] placeholder-[#819289] focus:outline-none focus:border-[#123B32] focus:bg-white transition-all shadow-inner"
          />
          <div className="absolute right-3 hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-white border border-[#CBD5E1] rounded text-[11px] font-semibold text-[#64748B] shadow-2xs pointer-events-none">
            Ctrl + K
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 ml-4">
        {/* Language Selector Dropdown */}
        <div className="relative" ref={langRef}>
          <button
            onClick={() => setIsLangOpen(!isLangOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#D5E2DC] bg-[#F7FAF8] hover:bg-[#EEF5F1] text-xs font-medium text-[#1E293B] transition"
          >
            <Globe className="w-4 h-4 text-[#123B32]" />
            <span>{currentLangObj.native}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          </button>

          {isLangOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-[#E2ECE7] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-1 text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
                Select Language
              </div>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setIsLangOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs text-[#1E293B] hover:bg-[#F2F7F4] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{lang.native}</span>
                    <span className="text-[#64748B] text-[11px]">({lang.label})</span>
                  </div>
                  {selectedLanguage === lang.code && (
                    <Check className="w-3.5 h-3.5 text-[#123B32]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotificationModal(!showNotificationModal)}
            className="relative p-2 rounded-xl text-[#475569] hover:bg-[#F2F7F4] hover:text-[#123B32] transition"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#EF4444] text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {showNotificationModal && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[#E2ECE7] p-3 z-30 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
                <h4 className="text-xs font-bold text-[#1E293B]">Notifications</h4>
                <span className="text-[11px] text-[#123B32] font-medium cursor-pointer">Mark all as read</span>
              </div>
              <div className="space-y-2 mt-2">
                <div className="p-2 rounded-lg bg-[#F8FAF9] text-xs">
                  <p className="font-semibold text-[#1E293B]">Karnataka SSP Portal Update</p>
                  <p className="text-[11px] text-[#64748B]">Post-Matric scholarship deadline extended to Nov 30.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAF9] text-xs">
                  <p className="font-semibold text-[#1E293B]">AB-PMJAY Senior Citizen 70+ Expansion</p>
                  <p className="text-[11px] text-[#64748B]">New guidelines active; verify with Aadhaar e-KYC.</p>
                </div>
                <div className="p-2 rounded-lg bg-[#F8FAF9] text-xs">
                  <p className="font-semibold text-[#1E293B]">Benchmark Evaluation Finished</p>
                  <p className="text-[11px] text-[#64748B]">AccessBridge Version C attained 95.8% precision.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl text-[#475569] hover:bg-[#F2F7F4] hover:text-[#123B32] transition"
          title="Toggle Theme"
        >
          {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
