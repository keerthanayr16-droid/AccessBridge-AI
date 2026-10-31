import React, { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Volume2, 
  Eye, 
  ShieldCheck, 
  Server, 
  Database, 
  Check, 
  Sparkles,
  HelpCircle,
  Cpu
} from 'lucide-react';

interface SettingsViewProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  selectedLanguage,
  onLanguageChange
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [voiceAssistance, setVoiceAssistance] = useState(true);
  const [lowBandwidthMode, setLowBandwidthMode] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2ECE7] shadow-2xs">
        <h2 className="text-xl font-extrabold text-[#111827]">
          System &amp; Accessibility Settings
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Configure facilitator workspace preferences, accessibility adaptations for community beneficiaries, and model parameters.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] text-xs font-semibold text-[#15803D] flex items-center gap-2">
          <Check className="w-4 h-4 text-[#15803D]" />
          <span>Settings saved successfully!</span>
        </div>
      )}

      {/* Language & Localization */}
      <div className="bg-white rounded-3xl border border-[#E2ECE7] p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F0F4F2]">
          <Globe className="w-4 h-4 text-[#123B32]" />
          <h3 className="text-sm font-bold text-[#111827]">Default Operating Language</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { code: 'en', label: 'English', desc: 'Official statutory text' },
            { code: 'kn', label: 'ಕನ್ನಡ (Kannada)', desc: 'Karnataka state schemes' },
            { code: 'hi', label: 'हिन्दी (Hindi)', desc: 'Central & north schemes' },
            { code: 'ta', label: 'தமிழ் (Tamil)', desc: 'Southern welfare schemes' }
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`p-3.5 rounded-2xl border text-left transition ${
                selectedLanguage === lang.code
                  ? 'border-[#123B32] bg-[#F2F7F4] shadow-xs'
                  : 'border-[#E2ECE7] hover:bg-[#FAFDFB]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-[#1E293B]">{lang.label}</span>
                {selectedLanguage === lang.code && <Check className="w-3.5 h-3.5 text-[#123B32]" />}
              </div>
              <p className="text-[10px] text-[#64748B] mt-1">{lang.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Inclusive Accessibility Options */}
      <div className="bg-white rounded-3xl border border-[#E2ECE7] p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F0F4F2]">
          <Eye className="w-4 h-4 text-[#123B32]" />
          <h3 className="text-sm font-bold text-[#111827]">Accessibility &amp; Community Usability</h3>
        </div>

        <div className="space-y-4 text-xs">
          {/* Font Sizing */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-[#F8FAF9] rounded-2xl border border-[#E2ECE7]">
            <div>
              <p className="font-semibold text-[#1E293B]">Text Sizing for Low-Literacy / Elderly Beneficiaries</p>
              <p className="text-[11px] text-[#64748B]">Adjusts typography scale across answer cards and checklists.</p>
            </div>
            <div className="flex gap-1.5">
              {(['normal', 'large', 'xlarge'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFontSize(s)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition ${
                    fontSize === s ? 'bg-[#123B32] text-white' : 'bg-white border border-[#CBD5E1] text-[#475569]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between p-3 bg-[#F8FAF9] rounded-2xl border border-[#E2ECE7]">
            <div>
              <p className="font-semibold text-[#1E293B]">High Contrast Visual Mode</p>
              <p className="text-[11px] text-[#64748B]">Enhances borders and text contrast for outdoor field conditions.</p>
            </div>
            <input
              type="checkbox"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
              className="w-4 h-4 rounded text-[#123B32] focus:ring-0"
            />
          </div>

          {/* Low Bandwidth */}
          <div className="flex items-center justify-between p-3 bg-[#F8FAF9] rounded-2xl border border-[#E2ECE7]">
            <div>
              <p className="font-semibold text-[#1E293B]">Low-Bandwidth Mobile Optimization</p>
              <p className="text-[11px] text-[#64748B]">Caches guidelines locally to operate reliably over 2G/3G rural networks.</p>
            </div>
            <input
              type="checkbox"
              checked={lowBandwidthMode}
              onChange={(e) => setLowBandwidthMode(e.target.checked)}
              className="w-4 h-4 rounded text-[#123B32] focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Backend & Diagnostics */}
      <div className="bg-white rounded-3xl border border-[#E2ECE7] p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F0F4F2]">
          <Cpu className="w-4 h-4 text-[#123B32]" />
          <h3 className="text-sm font-bold text-[#111827]">Backend &amp; RAG Architecture Diagnostics</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-[#E2ECE7]">
            <p className="text-[#64748B]">Express API Server</p>
            <p className="font-bold text-[#15803D] mt-0.5 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              Online (Port 3000)
            </p>
          </div>

          <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-[#E2ECE7]">
            <p className="text-[#64748B]">Knowledge Base</p>
            <p className="font-bold text-[#1E293B] mt-0.5">
              8 Verified Guidelines Indexed
            </p>
          </div>

          <div className="p-3 bg-[#F8FAF9] rounded-2xl border border-[#E2ECE7]">
            <p className="text-[#64748B]">Benchmark Dataset</p>
            <p className="font-bold text-[#1E293B] mt-0.5">
              120 CommunityQA Prompts
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-[#123B32] hover:bg-[#0D2E26] text-white text-xs font-bold transition shadow-xs"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
