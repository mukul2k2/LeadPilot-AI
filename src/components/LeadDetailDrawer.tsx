'use client';

import React, { useState, useEffect } from 'react';
import { Lead } from '@/types/lead';
import { useLeads } from '@/context/LeadContext';
import { TagBadge } from './TagBadge';
import { ChatHistoryView } from './ChatHistoryView';
import {
  X,
  Phone,
  Building,
  Calendar,
  Sparkles,
  Send,
  Copy,
  ExternalLink,
  CheckCircle,
  Clock,
  RefreshCw,
  Edit3
} from 'lucide-react';

interface LeadDetailDrawerProps {
  lead: Lead | null;
  onClose: () => void;
}

export const LeadDetailDrawer: React.FC<LeadDetailDrawerProps> = ({ lead, onClose }) => {
  const { updateLead, markFollowUpSent, runAiEvaluation, isAnalyzing, analyzingLeadId, todayStr, llmConfig } = useLeads();
  const [draftText, setDraftText] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');
  const [copied, setCopied] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  useEffect(() => {
    if (lead) {
      setDraftText(lead.aiDraftMessage || '');
      setFollowUpDate(lead.nextFollowUpDate || '');
      setSentSuccess(false);
    }
  }, [lead]);

  if (!lead) return null;

  const isCurrentLeadAnalyzing = isAnalyzing && analyzingLeadId === lead.id;

  const handleCopy = () => {
    navigator.clipboard.writeText(draftText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenWhatsApp = () => {
    // Sanitize phone number (strip spaces, dashes, etc.)
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const encodedText = encodeURIComponent(draftText);
    window.open(`https://wa.me/${cleanPhone}?text=${encodedText}`, '_blank');
  };

  const handleSaveDraftChanges = () => {
    updateLead({
      ...lead,
      aiDraftMessage: draftText,
      nextFollowUpDate: followUpDate
    });
  };

  const handleMarkAsSent = () => {
    markFollowUpSent(lead.id, draftText);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
    }, 2500);
  };

  const handleTriggerAiRerun = async () => {
    await runAiEvaluation(lead.id);
  };
  const isOverdue = lead.nextFollowUpDate < todayStr && !lead.isFollowUpSent;
  const isDueToday = lead.nextFollowUpDate === todayStr && !lead.isFollowUpSent;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-4xl bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-start justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-bold text-slate-900">{lead.name}</h2>
              <TagBadge tag={lead.aiTag} size="md" />
              {isOverdue && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
                  <Clock size={12} />
                  Overdue
                </span>
              )}
              {isDueToday && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <Clock size={12} />
                  Action Today
                </span>
              )}
              {lead.isFollowUpSent && (
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1">
                  <CheckCircle size={12} />
                  Follow-up Sent
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-slate-600">
              <span className="flex items-center gap-1 font-medium text-slate-800">
                <Building size={14} className="text-slate-400" />
                {lead.company}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={14} className="text-slate-400" />
                <a href={`tel:${lead.phone}`} className="hover:underline text-indigo-600 font-medium">
                  {lead.phone}
                </a>
              </span>
              <span className="text-slate-400">|</span>
              <span><strong>Machine:</strong> {lead.equipmentInterest}</span>
              <span className="text-slate-400">|</span>
              <span><strong>Rep:</strong> {lead.assignedRep}</span>
              <span className="text-slate-400">|</span>
              <span><strong>Source:</strong> {lead.source}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body (2-Column Layout) */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50/40">
          
          {/* Left Column: WhatsApp Chat History (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <span>WhatsApp Conversation</span>
                <span className="text-xs font-normal text-slate-500">({lead.chats.length} messages)</span>
              </h3>
            </div>
            <div className="flex-1">
              <ChatHistoryView lead={lead} />
            </div>
          </div>

          {/* Right Column: AI Follow-up Copilot (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* AI Diagnosis Card */}
            <div className="bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/40 border border-indigo-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 uppercase tracking-wider">
                  <Sparkles size={15} className="text-indigo-600" />
                  AI Agent Rationale
                  <span className="text-[10px] text-indigo-700 bg-indigo-100/80 px-2 py-0.5 rounded font-mono font-semibold normal-case">
                    {llmConfig.provider === 'gemini' ? 'Gemini' : 'OpenAI'}: {llmConfig.model.replace('gemini-', '')}
                  </span>
                </div>
                <button
                  onClick={handleTriggerAiRerun}
                  disabled={isCurrentLeadAnalyzing}
                  className="text-xs text-indigo-700 hover:text-indigo-900 font-medium flex items-center gap-1 bg-white px-2 py-1 rounded border border-indigo-200 shadow-2xs hover:bg-indigo-50 disabled:opacity-50"
                  title="Re-run analysis with active model"
                >
                  <RefreshCw size={12} className={isCurrentLeadAnalyzing ? 'animate-spin' : ''} />
                  Re-evaluate
                </button>
              </div>

              <p className="text-sm font-medium text-slate-800 leading-snug">
                &ldquo;{lead.aiReason}&rdquo;
              </p>

              <div className="mt-3 pt-3 border-t border-indigo-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">Target Follow-Up Date:</span>
                <div className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-slate-400" />
                  <input
                    type="date"
                    value={followUpDate}
                    onChange={e => {
                      setFollowUpDate(e.target.value);
                      updateLead({ ...lead, nextFollowUpDate: e.target.value });
                    }}
                    className="text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded px-2 py-0.5"
                  />
                </div>
              </div>
            </div>

            {/* AI Draft Message Desk */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col flex-1">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Edit3 size={13} className="text-emerald-600" />
                  Contextual Follow-up Draft
                </label>
                <span className="text-[11px] text-slate-400">Rep can edit before sending</span>
              </div>

              <textarea
                value={draftText}
                onChange={e => setDraftText(e.target.value)}
                onBlur={handleSaveDraftChanges}
                rows={5}
                className="w-full text-sm text-slate-800 p-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent leading-relaxed resize-none bg-slate-50/50"
                placeholder="Drafting message..."
              />

              {/* Action Buttons */}
              <div className="mt-3 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors border border-slate-200"
                  >
                    <Copy size={13} />
                    {copied ? 'Copied to Clipboard!' : 'Copy Draft'}
                  </button>

                  <button
                    onClick={handleOpenWhatsApp}
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors border border-emerald-200"
                  >
                    <ExternalLink size={13} />
                    Open WhatsApp Web
                  </button>
                </div>

                <button
                  onClick={handleMarkAsSent}
                  disabled={sentSuccess}
                  className={`w-full py-2.5 px-4 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all ${
                    sentSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {sentSuccess ? (
                    <>
                      <CheckCircle size={15} />
                      Logged to Chat & Next Follow-Up Scheduled!
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Mark as Sent & Update Timeline
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 p-3 bg-amber-50/80 rounded-lg border border-amber-200/80 text-[11px] text-amber-900 leading-normal">
                <strong>Sales Rep Pro-Tip:</strong> Clicking &ldquo;Mark as Sent&rdquo; logs this copy into the buyer&apos;s WhatsApp chat thread and pushes the next follow-up date according to the lead tier (Hot +2d, Warm +5d, Cold +20d).
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
