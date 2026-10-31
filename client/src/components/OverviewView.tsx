import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  Leaf, 
  GraduationCap, 
  HeartPulse, 
  Accessibility, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Flame, 
  Paperclip, 
  Send, 
  ExternalLink, 
  MapPin, 
  ChevronRight,
  ShieldCheck,
  FileCheck2,
  Globe2
} from 'lucide-react';
import { Scheme } from '../types';

interface OverviewViewProps {
  onNavigateToWorkspace: (initialQuery?: string) => void;
  onNavigateToDirectory: (domain?: string) => void;
  onNavigateToKnowledge: () => void;
  onNavigateToEvaluation: () => void;
  selectedLanguage: string;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onNavigateToWorkspace,
  onNavigateToDirectory,
  onNavigateToKnowledge,
  onNavigateToEvaluation,
  selectedLanguage
}) => {
  const [chatInput, setChatInput] = useState('');
  const [activeConversation, setActiveConversation] = useState(0);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  const pastConversations = [
    { title: "How to apply for education scholarship?", time: "2 min ago", query: "What documents are required for a scholarship for higher education in Karnataka?" },
    { title: "Healthcare benefits for senior citizens", time: "12 min ago", query: "Can a 75-year-old senior citizen get Ayushman Bharat healthcare cover?" },
    { title: "Disability certificate process in Karnataka", time: "1 hour ago", query: "What is the process and eligibility for a UDID disability smart card in Karnataka?" }
  ];

  const handleSendChat = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    onNavigateToWorkspace(chatInput.trim());
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* 1. Top Section: Hero Banner + Platform Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Banner (2 cols) */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D7EDE2] via-[#E2F3EA] to-[#EFF7F2] p-8 border border-[#CDE5D8] flex flex-col justify-between shadow-2xs">
          {/* Subtle architectural background silhouette */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none w-80 h-44">
            <svg viewBox="0 0 400 200" fill="#123B32" xmlns="http://www.w3.org/2000/svg">
              <path d="M200 40 C170 40 170 70 170 90 L230 90 C230 70 230 40 200 40 Z" />
              <rect x="50" y="90" width="300" height="15" rx="3" />
              <rect x="70" y="105" width="10" height="80" />
              <rect x="110" y="105" width="10" height="80" />
              <rect x="150" y="105" width="10" height="80" />
              <rect x="195" y="105" width="10" height="80" />
              <rect x="240" y="105" width="10" height="80" />
              <rect x="280" y="105" width="10" height="80" />
              <rect x="320" y="105" width="10" height="80" />
              <rect x="40" y="185" width="320" height="15" />
            </svg>
          </div>

          <div className="relative z-10 max-w-lg space-y-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#185343] tracking-wide">
              Good morning, Alex! 👋
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D3027] tracking-tight leading-snug">
              Your AI-powered assistant for public services
            </h2>
            <p className="text-sm text-[#436458] leading-relaxed">
              Find accurate information, understand your options, and help your community with confidence.
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigateToDirectory()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#123B32] hover:bg-[#0D2D26] text-white text-xs font-semibold shadow-sm transition-all duration-150 transform active:scale-98"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Illustrated Community Characters Graphic */}
          <div className="hidden sm:block absolute right-4 bottom-2 h-44 w-72 pointer-events-none select-none">
            {/* High visual fidelity community silhouettes */}
            <div className="w-full h-full relative flex items-end justify-end gap-2 pr-2">
              {/* Senior citizen */}
              <div className="w-12 h-32 bg-[#E59866]/30 rounded-t-full relative flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#E59866] mt-1" />
                <div className="w-10 h-20 bg-[#D35400] rounded-t-2xl mt-1 opacity-80" />
              </div>
              {/* Facilitator in green vest */}
              <div className="w-16 h-40 bg-[#123B32]/20 rounded-t-full relative flex flex-col items-center z-10">
                <div className="w-10 h-10 rounded-full bg-[#123B32] mt-1 text-white text-[9px] flex items-center justify-center font-bold">AGY</div>
                <div className="w-14 h-26 bg-[#165B47] rounded-t-2xl mt-1 flex items-center justify-center">
                  <div className="w-6 h-8 bg-white/80 rounded-sm shadow-xs" />
                </div>
              </div>
              {/* Mother in saffron/gold saree */}
              <div className="w-14 h-36 bg-[#F39C12]/20 rounded-t-full relative flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#E67E22] mt-1" />
                <div className="w-12 h-24 bg-[#D68910] rounded-t-2xl mt-1 opacity-90" />
              </div>
              {/* School child with bag */}
              <div className="w-11 h-28 bg-[#3498DB]/20 rounded-t-full relative flex flex-col items-center">
                <div className="w-7 h-7 rounded-full bg-[#2980B9] mt-1" />
                <div className="w-9 h-18 bg-[#1F618D] rounded-t-xl mt-1 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Platform Impact Card (1 col) */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2ECE7] shadow-2xs flex flex-col justify-between">
          <div className="flex items-center gap-2 text-[#123B32] font-bold text-sm">
            <div className="p-1.5 rounded-lg bg-[#EAF3EE]">
              <Sparkles className="w-4 h-4 text-[#123B32]" />
            </div>
            <span>Platform Impact</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3.5 rounded-2xl bg-[#F7FAF8] border border-[#EAF0EC]">
              <div className="w-7 h-7 rounded-lg bg-[#E2EFEB] text-[#123B32] flex items-center justify-center mb-1.5">
                <Users className="w-4 h-4" />
              </div>
              <p className="text-xl font-extrabold text-[#111827]">12.5K+</p>
              <p className="text-[11px] text-[#64748B] font-medium">People Helped</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAF8] border border-[#EAF0EC]">
              <div className="w-7 h-7 rounded-lg bg-[#E2EFEB] text-[#123B32] flex items-center justify-center mb-1.5">
                <FileText className="w-4 h-4" />
              </div>
              <p className="text-xl font-extrabold text-[#111827]">8.3K+</p>
              <p className="text-[11px] text-[#64748B] font-medium">Queries Answered</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAF8] border border-[#EAF0EC]">
              <div className="w-7 h-7 rounded-lg bg-[#E2EFEB] text-[#123B32] flex items-center justify-center mb-1.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="text-xl font-extrabold text-[#111827]">96%</p>
              <p className="text-[11px] text-[#64748B] font-medium">Accuracy Rate</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7FAF8] border border-[#EAF0EC]">
              <div className="w-7 h-7 rounded-lg bg-[#E2EFEB] text-[#123B32] flex items-center justify-center mb-1.5">
                <Leaf className="w-4 h-4 text-[#10B981]" />
              </div>
              <p className="text-xl font-extrabold text-[#111827]">4.2T CO₂</p>
              <p className="text-[11px] text-[#64748B] font-medium">Potential Saved*</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Access Row (4 Category Cards) */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-[#1E293B] tracking-tight">Quick Access</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Education */}
          <div
            onClick={() => onNavigateToDirectory('education')}
            className="p-4 rounded-2xl bg-white border border-[#E2ECE7] hover:border-[#123B32] hover:shadow-sm transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#EAF5EF] text-[#123B32] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Education</h4>
                <p className="text-xs text-[#64748B]">Scholarships &amp; Support</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#F3F7F5] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 2: Healthcare */}
          <div
            onClick={() => onNavigateToDirectory('healthcare')}
            className="p-4 rounded-2xl bg-white border border-[#E2ECE7] hover:border-[#123B32] hover:shadow-sm transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#EAF5EF] text-[#123B32] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Healthcare</h4>
                <p className="text-xs text-[#64748B]">Schemes &amp; Benefits</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#F3F7F5] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 3: Social Welfare */}
          <div
            onClick={() => onNavigateToDirectory('social_welfare')}
            className="p-4 rounded-2xl bg-white border border-[#E2ECE7] hover:border-[#123B32] hover:shadow-sm transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#EAF5EF] text-[#123B32] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Social Welfare</h4>
                <p className="text-xs text-[#64748B]">Pensions &amp; Assistance</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#F3F7F5] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Card 4: Disability Services */}
          <div
            onClick={() => onNavigateToDirectory('disability_services')}
            className="p-4 rounded-2xl bg-white border border-[#E2ECE7] hover:border-[#123B32] hover:shadow-sm transition cursor-pointer flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#EAF5EF] text-[#123B32] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
                <Accessibility className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#1E293B]">Disability Services</h4>
                <p className="text-xs text-[#64748B]">Rights &amp; Support</p>
              </div>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#F3F7F5] flex items-center justify-center group-hover:bg-[#123B32] group-hover:text-white transition">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Center Split Section: AI Research Assistant + Right Evidence Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Center: AI Research Assistant (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E2ECE7] shadow-2xs flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#F0F4F2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EAF3EE] text-[#123B32] flex items-center justify-center">
                <FileCheck2 className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#1E293B]">AI Research Assistant</h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#BCE1D0] bg-[#F2FBF6] text-[11px] font-semibold text-[#14532D]">
              <Globe2 className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>Multi-Language Support</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 min-h-[380px]">
            {/* Conversation list mini sidebar */}
            <div className="p-4 border-r border-[#F0F4F2] bg-[#FAFDFB] space-y-3 hidden md:block">
              <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">Previous Queries</p>
              <div className="space-y-2">
                {pastConversations.map((conv, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveConversation(idx)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition ${
                      activeConversation === idx
                        ? 'bg-[#EAF3EE] text-[#123B32] font-semibold border border-[#CFE3D8]'
                        : 'text-[#475569] hover:bg-[#F2F6F4]'
                    }`}
                  >
                    <p className="truncate">{conv.title}</p>
                    <span className="text-[10px] text-[#94A3B8] mt-1 block">{conv.time}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  setChatInput('');
                  onNavigateToWorkspace();
                }}
                className="w-full mt-3 py-2 px-3 border border-dashed border-[#B8D5C8] hover:border-[#123B32] rounded-xl text-xs font-semibold text-[#123B32] hover:bg-[#EAF3EE] transition flex items-center justify-center gap-1.5"
              >
                <span>+ New Conversation</span>
              </button>
            </div>

            {/* Chat Messages and Input (2 cols inside) */}
            <div className="md:col-span-2 p-5 flex flex-col justify-between bg-white">
              {/* Message Feed */}
              <div className="space-y-4 overflow-y-auto max-h-[300px] pr-1">
                {/* User Bubble */}
                <div className="flex justify-end">
                  <div className="max-w-md bg-[#EEF5F1] text-[#1E293B] rounded-2xl rounded-tr-xs p-3.5 text-xs font-medium border border-[#DEECE5] leading-relaxed">
                    {pastConversations[activeConversation].query}
                  </div>
                </div>

                {/* Assistant Bubble */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#123B32] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <svg className="w-4 h-4 text-[#4ADE80]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M4 19V9a8 8 0 0 1 16 0v10" />
                      <path d="M4 15h16" />
                    </svg>
                  </div>
                  <div className="bg-[#FAFDFB] border border-[#E2ECE7] rounded-2xl rounded-tl-xs p-4 text-xs text-[#1E293B] space-y-2.5 max-w-lg shadow-2xs">
                    <p className="font-semibold text-[#0F3B2E]">
                      Here are the key details based on official sources:
                    </p>

                    <div className="space-y-1.5 pl-1">
                      <p className="font-bold text-[#1E293B] flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                        Required Documents:
                      </p>
                      <ul className="space-y-1 pl-4 text-[#334155]">
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#10B981] font-bold">✓</span> Income Certificate (Nadakacheri RD Number)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#10B981] font-bold">✓</span> Caste Certificate (if applicable)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#10B981] font-bold">✓</span> Academic Records (Class 10 &amp; 12)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#10B981] font-bold">✓</span> Aadhaar Card (DBT NPCI enabled)
                        </li>
                        <li className="flex items-center gap-1.5">
                          <span className="text-[#10B981] font-bold">✓</span> Bank Account Details
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-[#EDF4F0] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <button
                        onClick={() => setShowDocumentModal(true)}
                        className="text-[#123B32] font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>View Official Source</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                      <span className="text-[#64748B]">
                        Source: National Scholarship Portal | Updated: 2024-06-12
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendChat} className="mt-4 pt-3 border-t border-[#F0F4F2]">
                <div className="flex items-center gap-2 bg-[#F3F7F5] border border-[#DCE8E2] rounded-2xl px-3 py-1.5 focus-within:border-[#123B32] focus-within:bg-white transition shadow-inner">
                  <button
                    type="button"
                    onClick={() => alert("Upload beneficiary supporting documents (Aadhaar, income slip, marksheet) in the Case Workspace.")}
                    className="p-1.5 text-[#64748B] hover:text-[#123B32] transition"
                    title="Attach reference document"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask another question in English, Kannada or Hindi..."
                    className="flex-1 bg-transparent border-none text-xs text-[#1E293B] placeholder-[#819289] focus:outline-none py-1.5"
                  />
                  <button
                    type="submit"
                    className="w-8 h-8 rounded-xl bg-[#123B32] hover:bg-[#0D2E26] text-white flex items-center justify-center transition shadow-2xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Right Column: Evidence Panel + Service Guidance */}
        <div className="space-y-6">
          {/* Evidence Panel Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#E2ECE7] shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#123B32]" />
                <h4 className="text-sm font-bold text-[#1E293B]">Evidence Panel</h4>
              </div>
              <button
                onClick={onNavigateToKnowledge}
                className="text-xs text-[#123B32] font-semibold hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#EAF0EC] space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#EF4444] text-white text-[10px] font-black tracking-wider">
                    PDF
                  </span>
                  <h5 className="text-xs font-bold text-[#1E293B] leading-tight">
                    National Scholarship Portal Guidelines
                  </h5>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold">
                  Verified
                </span>
              </div>

              <p className="text-[11px] text-[#64748B]">
                Ministry of Education • 12 Jun 2024
              </p>
              <p className="text-xs text-[#334155] leading-relaxed">
                The scheme provides financial assistance to eligible students for higher education based on Class 12 merit and parental income limits.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setShowDocumentModal(true)}
                  className="text-xs font-semibold text-[#123B32] hover:underline flex items-center gap-1"
                >
                  <span>Read Full Document</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Service Guidance Card */}
          <div className="bg-white rounded-3xl p-5 border border-[#E2ECE7] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#123B32]" />
                <h4 className="text-sm font-bold text-[#1E293B]">Service Guidance</h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#EAF5EF] text-[#123B32] text-[10px] font-bold">
                Helpful Tip
              </span>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#F4F9F6] border border-[#E0EFE6]">
              {/* Karnataka State map icon */}
              <div className="w-9 h-9 rounded-xl bg-[#123B32] text-white flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#86EFAC]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                </svg>
              </div>
              <p className="text-xs text-[#1E293B] leading-relaxed">
                You can also check state-specific schemes on the Karnataka Government Portal (SSP Karnataka).
              </p>
            </div>

            <a
              href="https://ssp.postmatric.karnataka.gov.in"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-[#123B32] hover:bg-[#0D2D26] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-2xs"
            >
              <span>Visit Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* 4. Bottom Section: Popular Queries + Recent Activity + Towards a Sustainable Future Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Popular Queries */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2ECE7] shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#F97316]" />
              <h4 className="text-sm font-bold text-[#1E293B]">Popular Queries</h4>
            </div>
            <button
              onClick={() => onNavigateToWorkspace()}
              className="text-xs text-[#123B32] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View More</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {[
              "Ayushman Bharat benefits",
              "Old age pension scheme",
              "Disability certificate",
              "Student scholarship",
              "Ration card process",
              "Healthcare schemes"
            ].map((query, i) => (
              <button
                key={i}
                onClick={() => onNavigateToWorkspace(query)}
                className="px-3 py-1.5 rounded-full bg-[#F3F7F5] hover:bg-[#EAF3EE] hover:text-[#123B32] text-xs font-medium text-[#475569] border border-[#E0EBE5] transition"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-3xl p-5 border border-[#E2ECE7] shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#123B32]" />
              <h4 className="text-sm font-bold text-[#1E293B]">Recent Activity</h4>
            </div>
            <button
              onClick={onNavigateToEvaluation}
              className="text-xs text-[#123B32] font-semibold hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-2.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-[#10B981] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#1E293B]">Education query resolved</p>
                <p className="text-[11px] text-[#64748B]">2 min ago</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#1E293B]">Document uploaded: Health Scheme Guide</p>
                <p className="text-[11px] text-[#64748B]">15 min ago</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-xs">
              <div className="w-2 h-2 rounded-full bg-[#8B5CF6] mt-1.5 shrink-0" />
              <div>
                <p className="font-semibold text-[#1E293B]">New experiment completed</p>
                <p className="text-[11px] text-[#64748B]">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainable Future Green Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0F3B2E] to-[#1B5746] p-6 text-white overflow-hidden shadow-2xs flex flex-col justify-between">
          <div className="space-y-2 relative z-10">
            <h4 className="text-base font-extrabold leading-tight">
              Towards a more inclusive and sustainable future
            </h4>
            <p className="text-xs text-[#A8D3C3] leading-relaxed">
              Empowering marginalized families through transparent public service navigation.
            </p>
          </div>

          <div className="pt-4 relative z-10">
            <button
              onClick={onNavigateToEvaluation}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#0F3B2E] text-xs font-bold hover:bg-[#EAF3EE] transition shadow-xs"
            >
              <span>Learn More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Plant seedling graphic */}
          <div className="absolute right-3 bottom-3 opacity-30 pointer-events-none">
            <Leaf className="w-20 h-20 text-[#4ADE80]" />
          </div>
        </div>
      </div>

      {/* Document Reader Modal */}
      {showDocumentModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2ECE7]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[#EF4444] text-white text-[10px] font-bold">PDF</span>
                  <h3 className="text-base font-bold text-[#1E293B]">National Scholarship Portal Guidelines 2024-25</h3>
                </div>
                <p className="text-xs text-[#64748B] mt-0.5">Ministry of Education • Version 4.2 • Effective Date: 2024-06-01</p>
              </div>
              <button 
                onClick={() => setShowDocumentModal(false)}
                className="w-8 h-8 rounded-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#475569] font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#334155] leading-relaxed">
              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E2ECE7]">
                <p className="font-bold text-[#123B32]">Section 3: Eligibility Criteria (Page 4)</p>
                <p className="mt-1">
                  Students who are above 80th percentile of successful candidates in the relevant stream from a particular Board of Examination in Class XII of 10+2 pattern or equivalent and having gross parental/family annual income up to ₹4.5 lakh per annum are eligible. The candidate must not be availing of any other scholarship scheme.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E2ECE7]">
                <p className="font-bold text-[#123B32]">Section 5: Required Verification Documents (Page 7)</p>
                <p className="mt-1">
                  Mandatory documents include: (1) Valid Income Certificate issued by Revenue Tahsildar, (2) Caste Certificate for SC/ST/OBC quota claims, (3) Class 10 and 12 Academic Marksheets, (4) Aadhaar Card with active biometric verification, (5) Student Bank Account Details mapped with Aadhaar DBT NPCI mapper, and (6) Bonafide Institutional Verification Certificate.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#F8FAF9] border border-[#E2ECE7]">
                <p className="font-bold text-[#123B32]">Section 7: Financial Assistance Rates (Page 9)</p>
                <p className="mt-1">
                  Rate of scholarship is ₹12,000 per annum at Graduation level for first three years of College and University courses and ₹20,000 per annum at Post-Graduation level.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECE7] flex justify-end gap-2">
              <button
                onClick={() => setShowDocumentModal(false)}
                className="px-4 py-2 rounded-xl bg-[#123B32] text-white text-xs font-semibold"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
