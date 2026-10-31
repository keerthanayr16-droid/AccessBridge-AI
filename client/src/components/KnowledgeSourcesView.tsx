import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  Filter, 
  Search, 
  ShieldCheck,
  BookOpen
} from 'lucide-react';
import { api } from '../services/api';
import { PolicyDocument } from '../types';

export const KnowledgeSourcesView: React.FC = () => {
  const [documents, setDocuments] = useState<PolicyDocument[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDoc, setSelectedDoc] = useState<PolicyDocument | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('education');
  const [uploadMinistry, setUploadMinistry] = useState('');
  const [uploadSummary, setUploadSummary] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadDocuments();
  }, [selectedCategory]);

  const loadDocuments = async () => {
    try {
      const res = await api.getDocuments({
        category: selectedCategory === 'all' ? undefined : selectedCategory
      });
      setDocuments(res.documents);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle || !uploadMinistry) return;
    setIsUploading(true);
    try {
      await api.uploadDocument({
        title: uploadTitle,
        category: uploadCategory as any,
        ministry: uploadMinistry,
        summary: uploadSummary
      });
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadMinistry('');
      setUploadSummary('');
      loadDocuments();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-[#E2ECE7] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-[#EAF3EE] text-[#123B32] text-xs font-bold uppercase tracking-wider">
              Knowledge Register
            </span>
            <span className="text-xs text-[#64748B] font-medium">
              Version-Aware Policy Ingestion
            </span>
          </div>
          <h2 className="text-xl font-extrabold text-[#111827] mt-1.5">
            Official Policy &amp; Statutory Guidelines Repository
          </h2>
          <p className="text-xs text-[#64748B]">
            All RAG responses are strictly grounded in human-verified government circulars and gazettes.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#123B32] hover:bg-[#0D2E26] text-white text-xs font-bold flex items-center gap-2 transition shadow-xs"
        >
          <Upload className="w-4 h-4 text-[#4ADE80]" />
          <span>Ingest Policy Document</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[#E2ECE7] pb-3 overflow-x-auto">
        {['all', 'education', 'healthcare', 'social_welfare', 'disability_services'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
              selectedCategory === cat
                ? 'bg-[#123B32] text-white'
                : 'bg-white border border-[#E2ECE7] text-[#475569] hover:bg-[#F8FAF9]'
            }`}
          >
            {cat.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-3xl border border-[#E2ECE7] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAF9] border-b border-[#E2ECE7] text-[#475569] uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Jurisdiction</th>
                <th className="py-3 px-4">Version &amp; Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F2] text-[#334155]">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-[#FAFDFB] transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-[#EF4444] text-white text-[9px] font-bold">PDF</span>
                      <span className="font-semibold text-[#111827]">{doc.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize font-medium">{doc.category.replace('_', ' ')}</td>
                  <td className="py-3 px-4">{doc.ministry}</td>
                  <td className="py-3 px-4">{doc.jurisdiction}</td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-[11px] font-semibold">{doc.version}</span>
                    <span className="text-[#94A3B8] block text-[10px]">Effective: {doc.effectiveFrom}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'Verified'
                          ? 'bg-[#DCFCE7] text-[#15803D]'
                          : doc.status === 'Superseded'
                          ? 'bg-[#FEE2E2] text-[#B91C1C]'
                          : 'bg-[#FEF3C7] text-[#B45309]'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className="px-2.5 py-1 rounded-lg bg-[#EAF3EE] text-[#123B32] font-semibold hover:bg-[#123B32] hover:text-white transition"
                    >
                      Inspect Passages
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Inspector Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-[#E2ECE7]">
              <div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  selectedDoc.status === 'Verified' ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#FEE2E2] text-[#B91C1C]'
                }`}>
                  {selectedDoc.status} Policy Document
                </span>
                <h3 className="text-base font-extrabold text-[#1E293B] mt-1">{selectedDoc.title}</h3>
                <p className="text-xs text-[#64748B]">{selectedDoc.ministry} • Auditor: {selectedDoc.reviewer} ({selectedDoc.auditDate})</p>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#475569] font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider">
                Indexed Text Passages for Vector Retrieval:
              </h4>
              {selectedDoc.passages.map((p, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-[#E2ECE7] text-xs space-y-1">
                  <div className="flex justify-between items-center text-[#123B32] font-bold">
                    <span>{p.section}</span>
                    <span className="font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#CBD5E1]">Page {p.page}</span>
                  </div>
                  <p className="text-[#334155] leading-relaxed pt-1">{p.text}</p>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E2ECE7] flex justify-between items-center">
              <span className="text-[11px] text-[#64748B]">Source URL: {selectedDoc.sourceUrl}</span>
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl bg-[#123B32] text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <form onSubmit={handleUploadSubmit} className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2ECE7]">
              <h3 className="text-base font-extrabold text-[#1E293B]">Ingest Official Policy Document</h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="w-8 h-8 rounded-full bg-[#F3F4F6] text-[#475569] font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[#1E293B] block mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. Karnataka Post-Matric Fee Waiver Amendment 2024"
                  className="w-full p-2.5 bg-[#F8FAF9] border border-[#CBD5E1] rounded-xl text-xs focus:outline-none focus:border-[#123B32]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1E293B] block mb-1">Domain</label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAF9] border border-[#CBD5E1] rounded-xl text-xs focus:outline-none focus:border-[#123B32]"
                >
                  <option value="education">Education</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="social_welfare">Social Welfare</option>
                  <option value="disability_services">Disability Services</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-[#1E293B] block mb-1">Issuing Ministry / Department</label>
                <input
                  type="text"
                  required
                  value={uploadMinistry}
                  onChange={(e) => setUploadMinistry(e.target.value)}
                  placeholder="e.g. Social Welfare Department, Govt of Karnataka"
                  className="w-full p-2.5 bg-[#F8FAF9] border border-[#CBD5E1] rounded-xl text-xs focus:outline-none focus:border-[#123B32]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#1E293B] block mb-1">Summary / Policy Abstract</label>
                <textarea
                  rows={3}
                  value={uploadSummary}
                  onChange={(e) => setUploadSummary(e.target.value)}
                  placeholder="Summarize the legal conditions, income ceiling, or benefit changes..."
                  className="w-full p-2.5 bg-[#F8FAF9] border border-[#CBD5E1] rounded-xl text-xs focus:outline-none focus:border-[#123B32] resize-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2ECE7] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 rounded-xl border border-[#CBD5E1] text-xs font-semibold text-[#475569]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading}
                className="px-4 py-2 rounded-xl bg-[#123B32] text-white text-xs font-bold"
              >
                {isUploading ? 'Ingesting...' : 'Ingest & Index'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
