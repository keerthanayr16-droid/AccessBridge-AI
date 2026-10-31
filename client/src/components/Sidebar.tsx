import React from 'react';
import { 
  Home, 
  MessageSquare, 
  LayoutGrid, 
  BookOpen, 
  Activity, 
  Settings, 
  LogOut, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onSelectView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onSelectView }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'workspace', label: 'Case Workspace', icon: MessageSquare },
    { id: 'directory', label: 'Service Directory', icon: LayoutGrid },
    { id: 'knowledge', label: 'Knowledge Sources', icon: BookOpen },
    { id: 'evaluation', label: 'Evaluation Lab', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0F3B2E] text-white flex flex-col justify-between shrink-0 min-h-screen select-none border-r border-[#194E3F]">
      {/* Top Branding */}
      <div>
        <div className="p-5 pb-6 border-b border-[#1A4F40]">
          <div className="flex items-center gap-3">
            {/* Arched Bridge Logo Icon */}
            <div className="w-10 h-10 rounded-xl bg-[#1A4F40] border border-[#2B6D5A] flex items-center justify-center shadow-inner">
              <svg className="w-6 h-6 text-[#4ADE80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19V9a8 8 0 0 1 16 0v10" />
                <path d="M4 15h16" />
                <path d="M9 15v4" />
                <path d="M15 15v4" />
                <circle cx="12" cy="7" r="1.5" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                AccessBridge AI
              </h1>
              <p className="text-xs text-[#8ABBA8] font-medium tracking-wide">
                Community Service Navigator
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1E5242] text-white shadow-sm border border-[#2E6B57]'
                    : 'text-[#A3C7B9] hover:bg-[#164738] hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#4ADE80]' : 'text-[#85B5A2]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4 space-y-3">
        {/* Mission Highlight Card */}
        <div className="p-3.5 rounded-2xl bg-[#154637] border border-[#255C4A] text-center relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#2B6D5A]/30 rounded-full blur-xl pointer-events-none" />
          <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-[#1F5645] flex items-center justify-center text-[#4ADE80]">
            <Sparkles className="w-4 h-4" />
          </div>
          <p className="text-xs font-semibold text-white leading-snug">
            Building an Inclusive &amp; Sustainable Society
          </p>
          <p className="text-[11px] text-[#93C4B2] mt-0.5">
            Together.
          </p>
        </div>

        {/* Facilitator User Profile */}
        <div className="pt-2 border-t border-[#1A4F40]">
          <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#164738] transition cursor-pointer">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#818CF8] text-[#1E1B4B] font-bold text-xs flex items-center justify-center shadow-sm">
                AS
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-white leading-tight">Alex Sharma</p>
                <p className="text-[11px] text-[#8CB8A5]">Facilitator</p>
              </div>
            </div>
            <ChevronDown className="w-4 h-4 text-[#8CB8A5]" />
          </div>

          <button 
            onClick={() => alert("AccessBridge AI Facilitator Session Active")}
            className="w-full mt-2 flex items-center gap-2 px-3 py-2 text-xs text-[#8CB8A5] hover:text-white hover:bg-[#164738] rounded-lg transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
