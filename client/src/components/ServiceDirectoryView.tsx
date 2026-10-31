import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  CheckCircle2, 
  GraduationCap, 
  HeartPulse, 
  Users, 
  Accessibility, 
  FileText, 
  Building2, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';
import { Scheme } from '../types';

interface ServiceDirectoryViewProps {
  initialDomain?: string;
  onNavigateToWorkspace: (query: string) => void;
}

export const ServiceDirectoryView: React.FC<ServiceDirectoryViewProps> = ({
  initialDomain = 'all',
  onNavigateToWorkspace
}) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>(initialDomain);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSchemes();
  }, [selectedDomain, selectedJurisdiction]);

  const loadSchemes = async () => {
    setIsLoading(true);
    try {
      const res = await api.getSchemes({
        domain: selectedDomain === 'all' ? undefined : selectedDomain,
        jurisdiction: selectedJurisdiction === 'all' ? undefined : selectedJurisdiction,
        search: searchQuery || undefined
      });
      setSchemes(res.schemes);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const domainTabs = [
    { id: 'all', label: 'All Services', icon: Sparkles },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
    { id: 'social_welfare', label: 'Social Welfare', icon: Users },
    { id: 'disability_services', label: 'Disability Services', icon: Accessibility },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Directory Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2ECE7] shadow-2xs space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-[#111827]">
            Official Public Service Directory
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            Curated repository of central and state government schemes verified against statutory department guidelines.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-2">
          {/* Domain tabs */}
          <div className="flex flex-wrap gap-2">
            {domainTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedDomain === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedDomain(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-[#123B32] text-white shadow-xs'
                      : 'bg-[#F3F7F5] text-[#475569] hover:bg-[#EAF3EE] hover:text-[#123B32]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="w-full sm:w-72 relative">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && loadSchemes()}
              placeholder="Search schemes or conditions..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#F8FAF9] border border-[#CBD5E1] rounded-xl text-xs text-[#1E293B] focus:outline-none focus:border-[#123B32]"
            />
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-3xl border border-[#E2ECE7] p-5 shadow-2xs hover:shadow-sm hover:border-[#123B32] transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF5EF] text-[#123B32] text-[10px] font-bold uppercase tracking-wider">
                  {scheme.domain.replace('_', ' ')}
                </span>
                <span className="text-[11px] font-semibold text-[#64748B]">
                  {scheme.jurisdiction}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-[#111827] leading-snug">
                  {scheme.name}
                </h3>
                <p className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-[#123B32]" />
                  <span>{scheme.ministry}</span>
                </p>
              </div>

              <p className="text-xs text-[#334155] leading-relaxed line-clamp-2">
                {scheme.summary}
              </p>

              {/* Eligibility snippets */}
              <div className="space-y-1 bg-[#F8FAF9] p-3 rounded-2xl border border-[#EAF0EC] text-xs">
                <p className="text-[11px] font-bold text-[#1E293B]">Key Eligibility Criteria:</p>
                <ul className="space-y-0.5 text-[#475569] text-[11px]">
                  {scheme.eligibility.slice(0, 2).map((e, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#10B981] font-bold">✓</span>
                      <span className="line-clamp-1">{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer action buttons */}
            <div className="pt-2 border-t border-[#F0F4F2] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedScheme(scheme)}
                className="text-xs font-semibold text-[#123B32] hover:underline"
              >
                View Full Details
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onNavigateToWorkspace(`How do I apply for ${scheme.name}? What documents are needed?`)}
                  className="px-3 py-1.5 rounded-xl bg-[#EAF3EE] text-[#123B32] hover:bg-[#123B32] hover:text-white text-xs font-semibold transition"
                >
                  Analyze Case
                </button>
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#123B32] hover:bg-[#0D2E26] text-white text-xs font-semibold flex items-center gap-1 transition"
                >
                  <span>Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scheme Detail Modal */}
      {selectedScheme && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#E2ECE7]">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#EAF5EF] text-[#123B32] text-[10px] font-bold uppercase">
                  {selectedScheme.domain.replace('_', ' ')}
                </span>
                <h3 className="text-base font-extrabold text-[#1E293B] mt-1">{selectedScheme.name}</h3>
                <p className="text-xs text-[#64748B]">{selectedScheme.ministry} • {selectedScheme.jurisdiction}</p>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#475569] font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#334155] leading-relaxed">
              <div>
                <h4 className="font-bold text-[#1E293B] mb-1">Description:</h4>
                <p>{selectedScheme.description}</p>
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E2ECE7]">
                <h4 className="font-bold text-[#1E293B] mb-1.5">Statutory Eligibility:</h4>
                <ul className="space-y-1">
                  {selectedScheme.eligibility.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#10B981] font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E2ECE7]">
                <h4 className="font-bold text-[#1E293B] mb-1.5">Required Documents:</h4>
                <ul className="space-y-1">
                  {selectedScheme.requiredDocuments.map((doc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#123B32] font-bold">📄</span> {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#F8FAF9] rounded-xl border border-[#E2ECE7]">
                <h4 className="font-bold text-[#1E293B] mb-1.5">Scheme Benefits:</h4>
                <ul className="space-y-1">
                  {selectedScheme.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#F59E0B] font-bold">★</span> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECE7] flex justify-between items-center">
              <span className="text-[11px] text-[#64748B]">
                Version: {selectedScheme.version} • Updated: {selectedScheme.lastUpdated}
              </span>
              <a
                href={selectedScheme.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#123B32] text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Open Application Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
