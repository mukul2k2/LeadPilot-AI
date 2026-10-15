'use client';

import React, { useState } from 'react';
import { useLeads } from '@/context/LeadContext';
import { SALES_REPS } from '@/data/initialLeads';
import { LeadSource } from '@/types/lead';
import { X, Plus, Sparkles, Building, User, Phone, PackageCheck } from 'lucide-react';

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({ isOpen, onClose }) => {
  const { addLead, isAnalyzing } = useLeads();
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [assignedRep, setAssignedRep] = useState('Arun Verma');
  const [equipmentInterest, setEquipmentInterest] = useState('');
  const [source, setSource] = useState<LeadSource>('Indiamart');
  const [initialBuyerMessage, setInitialBuyerMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;

    setIsSubmitting(true);
    try {
      const chats = initialBuyerMessage.trim()
        ? [
            {
              id: `c-init-${Date.now()}`,
              sender: 'buyer' as const,
              text: initialBuyerMessage.trim(),
              timestamp: 'Just now'
            }
          ]
        : [];

      await addLead({
        name: name.trim(),
        company: company.trim(),
        phone: phone.trim(),
        assignedRep,
        equipmentInterest: equipmentInterest.trim() || 'General Packaging Machinery',
        source,
        chats
      });

      onClose();
      // Reset form
      setName('');
      setCompany('');
      setPhone('+91 ');
      setEquipmentInterest('');
      setInitialBuyerMessage('');
    } catch (err) {
      console.error('Failed to create lead:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-600 rounded-lg text-white">
              <Plus size={18} />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Add New Packaging Lead</h3>
              <p className="text-xs text-slate-400">Gemini agent will automatically score and draft follow-up</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Contact Person Name *
              </label>
              <div className="relative">
                <User size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Patel"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name *
              </label>
              <div className="relative">
                <Building size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Gujarat Salt Refinery"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Phone *
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Assigned Sales Rep
              </label>
              <select
                value={assignedRep}
                onChange={e => setAssignedRep(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                {SALES_REPS.filter(r => r !== 'All Reps').map(rep => (
                  <option key={rep} value={rep}>
                    {rep}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Equipment Required
              </label>
              <div className="relative">
                <PackageCheck size={14} className="absolute left-2.5 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Band Sealer CBS-900"
                  value={equipmentInterest}
                  onChange={e => setEquipmentInterest(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Lead Source
              </label>
              <select
                value={source}
                onChange={e => setSource(e.target.value as LeadSource)}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="Indiamart">Indiamart</option>
                <option value="Website Inquiry">Website Inquiry</option>
                <option value="PackEx Expo 2026">PackEx Expo 2026</option>
                <option value="Cold Outreach">Cold Outreach</option>
                <option value="Client Referral">Client Referral</option>
                <option value="Direct WhatsApp">Direct WhatsApp</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Buyer Message / Inquiry (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Paste what the buyer asked on WhatsApp (e.g., 'Need quote for 2 units pouch packaging machine, delivery by next week')..."
              value={initialBuyerMessage}
              onChange={e => setInitialBuyerMessage(e.target.value)}
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              The AI agent will immediately analyze this message to assign Hot/Warm/Cold and draft your response.
            </p>
          </div>

          {/* Submit buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isAnalyzing}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Sparkles size={14} className={isSubmitting ? 'animate-spin' : ''} />
              <span>{isSubmitting ? 'AI Scoring Lead...' : 'Create Lead & Run Agent'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
