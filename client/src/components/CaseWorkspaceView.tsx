import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ExternalLink, 
  Clock, 
  HelpCircle, 
  Printer, 
  Check, 
  ChevronRight,
  ShieldCheck,
  RefreshCw,
  Info,
  CheckSquare
} from 'lucide-react';
import { api } from '../services/api';
import { RAGResponse, ClaimVerification } from '../types';

interface CaseWorkspaceViewProps {
  initialQuery?: string;
  selectedLanguage: string;
}

export const CaseWorkspaceView: React.FC<CaseWorkspaceViewProps> = ({
  initialQuery = '',
  selectedLanguage
}) => {
  const [query, setQuery] = useState(
    initialQuery || 'A student from Karnataka needs financial support for higher education. What options are available?'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RAGResponse | null>(null);
  const [context, setContext] = useState<Record<string, string>>({
    state: 'Karnataka',
    course: 'Higher Education (Degree / Post-Graduate)'
  });
  const [activeTab, setActiveTab] = useState<'guidance' | 'checklist'>('guidance');
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  const [selectedClaim, setSelectedClaim] = useState<ClaimVerification | null>(null);

  // Auto-run if initialQuery is passed
  useEffect(() => {
    if (query) {
      handleSearch();
    }
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const data = await api.askQuestion({
        query: query.trim(),
        language: selectedLanguage,
        context
      });
      setResult(data);
      if (data.claimVerifications.length > 0) {
        setSelectedClaim(data.claimVerifications[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClarificationAnswer = async (field: string, val: string) => {
    const updatedContext = { ...context, [field]: val };
    setContext(updatedContext);
    setIsLoading(true);
    try {
      const data = await api.submitClarification({
        originalQuery: query,
        submittedContext: updatedContext,
        language: selectedLanguage
      });
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStep = (idx: number) => {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-[#E2ECE7] shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#EAF3EE] text-[#123B32] text-xs font-bold uppercase tracking-wider">
              Case Session #AB-2026-KA84
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] text-[11px] font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Evidence Verification Active
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#111827] mt-1.5">
            Facilitator Case Workspace
          </h2>
          <p className="text-xs text-[#64748B]">
            Interactive guidance, conditional clarifications, claim-level policy verifications, and verified next steps.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] text-xs font-semibold text-[#334155] flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Checklist</span>
          </button>
        </div>
      </div>

      {/* Main 3-Column Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (3 cols): Query & Guided Clarification */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-[#E2ECE7] p-5 shadow-2xs space-y-5">
          <div>
            <h3 className="text-sm font-bold text-[#1E293B] mb-2 flex items-center gap-1.5">
              <span>Beneficiary Inquiry</span>
            </h3>
            <div className="relative">
              <textarea
                rows={3}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter community member's question in English, Kannada, Hindi or Tamil..."
                className="w-full p-3 bg-[#F8FAF9] border border-[#D5E2DC] rounded-2xl text-xs text-[#1E293B] placeholder-[#819289] focus:outline-none focus:border-[#123B32] focus:bg-white resize-none transition"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="mt-2 w-full py-2.5 px-4 rounded-xl bg-[#123B32] hover:bg-[#0D2E26] text-white text-xs font-bold flex items-center justify-center gap-2 transition disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Retrieving Verified Policy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#4ADE80]" />
                    <span>Analyze &amp; Verify Guidance</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Guided Clarification Block */}
          {result?.clarificationQuestions && result.clarificationQuestions.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#F4F9F6] border border-[#CBE5D7] space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#123B32]">
                <HelpCircle className="w-4 h-4 text-[#10B981]" />
                <span>Guided Clarification Required</span>
              </div>
              <p className="text-[11px] text-[#475569]">
                To avoid giving an inaccurate policy condition, please confirm these circumstances:
              </p>

              <div className="space-y-3">
                {result.clarificationQuestions.map((q) => (
                  <div key={q.id} className="p-2.5 rounded-xl bg-white border border-[#DCE8E2] text-xs space-y-1.5">
                    <p className="font-semibold text-[#1E293B]">{q.question}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {q.options.map((opt) => {
                        const isSelected = context[q.field] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleClarificationAnswer(q.field, opt)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                              isSelected
                                ? 'bg-[#123B32] text-white'
                                : 'bg-[#F1F5F3] text-[#475569] hover:bg-[#E2EFEB]'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-[#819289] italic">Why: {q.whyNeeded}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Beneficiary Circumstances Snapshot */}
          <div className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#EAF0EC] space-y-2">
            <p className="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
              Identified Parameters
            </p>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F0F4F2]">
                <span className="text-[#64748B]">State / Domicile:</span>
                <span className="font-semibold text-[#1E293B]">{context.state || 'Pan-India'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F0F4F2]">
                <span className="text-[#64748B]">Education Level:</span>
                <span className="font-semibold text-[#1E293B]">{context.course || 'Degree / UG'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#64748B]">Language Output:</span>
                <span className="font-semibold text-[#123B32] uppercase">{selectedLanguage}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column (5 cols): AI Answer & Interactive Checklist */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E2ECE7] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F4F2]">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('guidance')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'guidance'
                    ? 'bg-[#123B32] text-white'
                    : 'text-[#64748B] hover:bg-[#F2F7F4]'
                }`}
              >
                Grounded Explanation
              </button>
              <button
                onClick={() => setActiveTab('checklist')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  activeTab === 'checklist'
                    ? 'bg-[#123B32] text-white'
                    : 'text-[#64748B] hover:bg-[#F2F7F4]'
                }`}
              >
                Action Checklist ({result?.nextSteps.length || 0})
              </button>
            </div>

            {result && !result.isAbstention && (
              <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                Evidence Grounded
              </span>
            )}
          </div>

          {/* Grounded Explanation Tab */}
          {activeTab === 'guidance' && (
            <div className="space-y-4">
              {result?.isAbstention ? (
                <div className="p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] space-y-2">
                  <div className="flex items-center gap-2 font-bold text-[#B45309]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Selective Abstention Triggered</span>
                  </div>
                  <p>{result.answer}</p>
                  <p className="text-[11px] text-[#78350F] italic">
                    Reason: {result.abstentionReason}
                  </p>
                </div>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-[#FAFDFB] border border-[#DCEFE5] text-xs text-[#1E293B] leading-relaxed whitespace-pre-line font-normal">
                    {result ? result.answer : "Enter an inquiry or select a preset to analyze."}
                  </div>

                  {/* Required Documents Highlight Box */}
                  {result?.requiredDocuments && result.requiredDocuments.length > 0 && (
                    <div className="p-4 rounded-2xl bg-[#F7FAF8] border border-[#E2ECE7] space-y-2">
                      <p className="text-xs font-bold text-[#1E293B] flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-[#123B32]" />
                        <span>Mandatory Document Checklist:</span>
                      </p>
                      <div className="grid grid-cols-1 gap-1.5 text-xs">
                        {result.requiredDocuments.map((doc, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-1.5 bg-white rounded-lg border border-[#E5EFEB]">
                            <span className="w-4 h-4 rounded-full bg-[#10B981]/20 text-[#10B981] text-[10px] font-bold flex items-center justify-center">✓</span>
                            <span className="text-[#334155]">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Disclaimer alert */}
                  <div className="p-3 rounded-xl bg-[#F1F5F9] text-[11px] text-[#475569] flex items-start gap-2">
                    <Info className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
                    <span>
                      AccessBridge AI provides navigations based on official policies. Final eligibility approval is made solely by authorized government officials.
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Action Checklist Tab */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <p className="text-xs text-[#64748B]">
                Track completed steps with the beneficiary during the facilitation session:
              </p>
              {result?.nextSteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start gap-3 transition ${
                    checkedSteps[idx]
                      ? 'bg-[#EAF5EF] border-[#A8DAC2] text-[#123B32]'
                      : 'bg-white border-[#E2ECE7] text-[#1E293B] hover:bg-[#F8FAF9]'
                  }`}
                >
                  <div className="mt-0.5">
                    <input
                      type="checkbox"
                      checked={!!checkedSteps[idx]}
                      onChange={() => {}}
                      className="rounded text-[#123B32] focus:ring-0"
                    />
                  </div>
                  <span className={checkedSteps[idx] ? 'line-through opacity-80' : 'font-medium'}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (3 cols): Claim-Level Verification & Citations */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-[#E2ECE7] p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F0F4F2]">
            <h3 className="text-sm font-bold text-[#1E293B] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Claim Verifications</span>
            </h3>
            <span className="text-[11px] text-[#64748B]">{result?.claimVerifications.length || 0} claims</span>
          </div>

          <div className="space-y-2.5">
            {result?.claimVerifications.map((claim, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedClaim(claim)}
                className={`p-3 rounded-2xl border text-xs cursor-pointer transition ${
                  selectedClaim === claim
                    ? 'border-[#123B32] bg-[#F3F7F5] shadow-xs'
                    : 'border-[#EAF0EC] bg-[#FAFDFB] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      claim.status === 'VERIFIED'
                        ? 'bg-[#DCFCE7] text-[#15803D]'
                        : claim.status === 'OUTDATED_WARNING'
                        ? 'bg-[#FEF3C7] text-[#B45309]'
                        : 'bg-[#FEE2E2] text-[#B91C1C]'
                    }`}
                  >
                    {claim.status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] text-[#64748B] font-mono">
                    {Math.round(claim.confidenceScore * 100)}% Match
                  </span>
                </div>

                <p className="text-[#1E293B] font-medium leading-relaxed">
                  "{claim.claimText}"
                </p>

                {claim.sourceDocTitle && (
                  <p className="text-[10px] text-[#123B32] font-semibold mt-1.5 truncate">
                    📄 {claim.sourceDocTitle}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Selected Claim Inspector */}
          {selectedClaim && (
            <div className="p-3.5 rounded-2xl bg-[#F0F6F3] border border-[#CDE3D7] text-xs space-y-2">
              <p className="font-bold text-[#123B32]">Detailed Evidence Citation</p>
              <div className="space-y-1 text-[11px] text-[#334155]">
                <p><span className="font-semibold">Document:</span> {selectedClaim.sourceDocTitle}</p>
                <p><span className="font-semibold">Section:</span> {selectedClaim.section}</p>
                <p><span className="font-semibold">Page Number:</span> {selectedClaim.page}</p>
                <p><span className="font-semibold">Effective Date:</span> {selectedClaim.policyDate}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
