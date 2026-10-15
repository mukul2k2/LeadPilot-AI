'use client';

import React from 'react';
import { Lead } from '@/types/lead';
import { useLeads } from '@/context/LeadContext';
import { TagBadge } from './TagBadge';
import {
  AlertTriangle,
  Clock,
  Send,
  Building,
  Phone,
  ArrowRight,
  MessageSquare,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const PriorityQueue: React.FC = () => {
  const {
    leads,
    selectedRep,
    searchQuery,
    setSelectedLead,
    markFollowUpSent,
    todayStr
  } = useLeads();

  // Helper to calculate days overdue
  const getDaysOverdue = (dateStr: string) => {
    const target = new Date(dateStr).getTime();
    const today = new Date(todayStr).getTime();
    const diff = Math.floor((today - target) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  // Filter leads based on rep and search
  const filtered = leads.filter(lead => {
    if (selectedRep !== 'All Reps' && lead.assignedRep !== selectedRep) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        lead.name.toLowerCase().includes(q) ||
        lead.company.toLowerCase().includes(q) ||
        lead.equipmentInterest.toLowerCase().includes(q) ||
        lead.phone.includes(q);
      if (!match) return false;
    }
    return true;
  });

  // Overdue leads: date < today and not marked sent
  const overdueLeads = filtered
    .filter(l => l.nextFollowUpDate < todayStr && !l.isFollowUpSent)
    .sort((a, b) => {
      // Prioritize Hot over Warm over Cold, then oldest date
      const tagPriority: Record<string, number> = { Hot: 3, Warm: 2, Cold: 1 };
      if (tagPriority[b.aiTag] !== tagPriority[a.aiTag]) {
        return tagPriority[b.aiTag] - tagPriority[a.aiTag];
      }
      return a.nextFollowUpDate.localeCompare(b.nextFollowUpDate);
    });

  // Due Today leads: date === today and not marked sent
  const dueTodayLeads = filtered
    .filter(l => l.nextFollowUpDate === todayStr && !l.isFollowUpSent)
    .sort((a, b) => {
      const tagPriority: Record<string, number> = { Hot: 3, Warm: 2, Cold: 1 };
      return tagPriority[b.aiTag] - tagPriority[a.aiTag];
    });

  const totalActionNeeded = overdueLeads.length + dueTodayLeads.length;

  return (
    <section className="space-y-4">
      {/* Section Title & Status Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-600 text-white shadow-sm">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Action Required Today & Overdue
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200" suppressHydrationWarning>
                {totalActionNeeded} High Priority
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Ranked by urgency: Overdue leads shown first, followed by today&apos;s follow-ups.
            </p>
          </div>
        </div>

        {selectedRep !== 'All Reps' && (
          <span className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 px-2.5 py-1 rounded-md font-medium">
            Filtering for Rep: <strong>{selectedRep}</strong>
          </span>
        )}
      </div>

      {totalActionNeeded === 0 ? (
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-8 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-2">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-base font-bold text-emerald-900">All Follow-ups Up to Date!</h3>
          <p className="text-xs text-emerald-700 mt-1 max-w-md mx-auto">
            {selectedRep !== 'All Reps'
              ? `${selectedRep} has no pending or overdue follow-ups right now. Great job keeping leads warm!`
              : 'All scheduled follow-ups for today have been addressed. Check upcoming leads below or add a new lead.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* 1. OVERDUE LEADS */}
          {overdueLeads.map(lead => {
            const daysAgo = getDaysOverdue(lead.nextFollowUpDate);
            return (
              <div
                key={lead.id}
                className="group relative bg-white border-2 border-red-300 hover:border-red-500 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
              >
                {/* Overdue alert ribbon */}
                <div className="bg-red-500 text-white px-3.5 py-1 text-[11px] font-bold flex items-center justify-between tracking-wide">
                  <span className="flex items-center gap-1.5 uppercase" suppressHydrationWarning>
                    <Clock size={12} className="animate-spin" />
                    Overdue by {daysAgo} {daysAgo === 1 ? 'day' : 'days'}
                  </span>
                  <span className="text-[10px] font-medium opacity-90">
                    Rep: {lead.assignedRep}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base group-hover:text-red-700 transition-colors">
                          {lead.name}
                        </h3>
                        <div className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                          <Building size={13} className="text-slate-400" />
                          {lead.company}
                        </div>
                      </div>
                      <TagBadge tag={lead.aiTag} size="sm" />
                    </div>

                    <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                      <span className="font-semibold text-slate-700">Interest: </span>
                      <span className="text-slate-800 font-medium">{lead.equipmentInterest}</span>
                    </div>

                    {/* AI Reason */}
                    <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-700">
                      <Sparkles size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed">
                        <strong className="text-indigo-950 font-semibold">AI Rationale: </strong>
                        {lead.aiReason}
                      </p>
                    </div>

                    {/* AI Draft preview snippet */}
                    <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-slate-800">
                      <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                        <span>Ready WhatsApp Draft</span>
                        <span className="text-emerald-700 font-normal">({lead.chats.length} chat logs)</span>
                      </div>
                      <p className="line-clamp-2 italic text-slate-700 text-[11px] leading-relaxed">
                        &ldquo;{lead.aiDraftMessage}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="flex-1 py-2 px-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                    >
                      <span>Review & Send</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      onClick={() => markFollowUpSent(lead.id)}
                      className="px-2.5 py-2 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                      title="Quick mark as sent"
                    >
                      <CheckCircle2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 2. DUE TODAY LEADS */}
          {dueTodayLeads.map(lead => (
            <div
              key={lead.id}
              className="group relative bg-white border border-emerald-300 hover:border-emerald-500 rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden"
            >
              {/* Due Today top bar */}
              <div className="bg-emerald-600 text-white px-3.5 py-1 text-[11px] font-bold flex items-center justify-between tracking-wide">
                <span className="flex items-center gap-1.5 uppercase">
                  <Clock size={12} />
                  Scheduled For Today
                </span>
                <span className="text-[10px] font-medium opacity-90">
                  Rep: {lead.assignedRep}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors">
                        {lead.name}
                      </h3>
                      <div className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                        <Building size={13} className="text-slate-400" />
                        {lead.company}
                      </div>
                    </div>
                    <TagBadge tag={lead.aiTag} size="sm" />
                  </div>

                  <div className="mt-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <span className="font-semibold text-slate-700">Interest: </span>
                    <span className="text-slate-800 font-medium">{lead.equipmentInterest}</span>
                  </div>

                  {/* AI Reason */}
                  <div className="mt-2.5 flex items-start gap-1.5 text-xs text-slate-700">
                    <Sparkles size={14} className="text-indigo-600 shrink-0 mt-0.5" />
                    <p className="line-clamp-2 leading-relaxed">
                      <strong className="text-indigo-950 font-semibold">AI Rationale: </strong>
                      {lead.aiReason}
                    </p>
                  </div>

                  {/* AI Draft preview snippet */}
                  <div className="mt-3 p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 text-xs text-slate-800">
                    <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>Ready WhatsApp Draft</span>
                      <span className="text-emerald-700 font-normal">({lead.chats.length} chat logs)</span>
                    </div>
                    <p className="line-clamp-2 italic text-slate-700 text-[11px] leading-relaxed">
                      &ldquo;{lead.aiDraftMessage}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedLead(lead)}
                    className="flex-1 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                  >
                    <span>Review & Send</span>
                    <ArrowRight size={13} />
                  </button>
                  <button
                    onClick={() => markFollowUpSent(lead.id)}
                    className="px-2.5 py-2 bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-600 rounded-lg text-xs font-medium transition-colors"
                    title="Quick mark as sent"
                  >
                    <CheckCircle2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
