'use client';

import React from 'react';
import { Lead, UrgencyTag } from '@/types/lead';
import { useLeads } from '@/context/LeadContext';
import { TagBadge } from './TagBadge';
import {
  Building,
  Phone,
  Calendar,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';

export const LeadsTable: React.FC = () => {
  const {
    leads,
    selectedRep,
    searchQuery,
    selectedTagFilter,
    setSelectedTagFilter,
    setSelectedLead,
    todayStr
  } = useLeads();

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    // Rep filter
    if (selectedRep !== 'All Reps' && lead.assignedRep !== selectedRep) {
      return false;
    }
    // Tag filter
    if (selectedTagFilter !== 'All' && lead.aiTag !== selectedTagFilter) {
      return false;
    }
    // Search query
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

  // Count badges
  const totalCount = leads.length;
  const hotCount = leads.filter(l => l.aiTag === 'Hot').length;
  const warmCount = leads.filter(l => l.aiTag === 'Warm').length;
  const coldCount = leads.filter(l => l.aiTag === 'Cold').length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 bg-slate-50/60">
        <div>
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <span>All Leads Pipeline</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700" suppressHydrationWarning>
              {filteredLeads.length} leads
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Click any lead to view complete WhatsApp logs, AI diagnostic reason, and edit follow-up drafts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
          <button
            onClick={() => setSelectedTagFilter('All')}
            className={`px-3 py-1.5 rounded-md transition-all ${
              selectedTagFilter === 'All'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            suppressHydrationWarning
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setSelectedTagFilter('Hot')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              selectedTagFilter === 'Hot'
                ? 'bg-rose-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-rose-700'
            }`}
            suppressHydrationWarning
          >
            Hot ({hotCount})
          </button>
          <button
            onClick={() => setSelectedTagFilter('Warm')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              selectedTagFilter === 'Warm'
                ? 'bg-amber-600 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-amber-800'
            }`}
            suppressHydrationWarning
          >
            Warm ({warmCount})
          </button>
          <button
            onClick={() => setSelectedTagFilter('Cold')}
            className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              selectedTagFilter === 'Cold'
                ? 'bg-slate-700 text-white shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            suppressHydrationWarning
          >
            Cold ({coldCount})
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100/75 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Lead & Company</th>
              <th className="py-3 px-4">Equipment Interest</th>
              <th className="py-3 px-4">AI Classification & Reason</th>
              <th className="py-3 px-4">Assigned Rep</th>
              <th className="py-3 px-4">Next Follow-Up</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-10 text-center text-slate-500">
                  <p className="font-semibold text-slate-700">No matching leads found</p>
                  <p className="text-xs text-slate-500 mt-1">Try adjusting your filters or search terms.</p>
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => {
                const isOverdue = lead.nextFollowUpDate < todayStr && !lead.isFollowUpSent;
                const isDueToday = lead.nextFollowUpDate === todayStr && !lead.isFollowUpSent;

                return (
                  <tr
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors group"
                  >
                    {/* Lead & Company */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {lead.name}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building size={12} className="text-slate-400" />
                        <span>{lead.company}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{lead.phone}</div>
                    </td>

                    {/* Equipment Interest */}
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <div className="font-medium text-slate-800 text-xs truncate">
                        {lead.equipmentInterest}
                      </div>
                      <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded mt-1 inline-block">
                        Source: {lead.source}
                      </span>
                    </td>

                    {/* AI Tag & Reason */}
                    <td className="py-3.5 px-4 max-w-[320px]">
                      <div className="mb-1">
                        <TagBadge tag={lead.aiTag} size="sm" />
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {lead.aiReason}
                      </p>
                    </td>

                    {/* Assigned Rep */}
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                      {lead.assignedRep}
                    </td>

                    {/* Next Follow-Up */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold">
                        <Calendar size={13} className="text-slate-400" />
                        <span className={isOverdue ? 'text-red-700 font-bold' : isDueToday ? 'text-emerald-700 font-bold' : 'text-slate-700'}>
                          {lead.nextFollowUpDate}
                        </span>
                      </div>
                      <div className="mt-1">
                        {isOverdue && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                            Overdue
                          </span>
                        )}
                        {isDueToday && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            Due Today
                          </span>
                        )}
                        {lead.isFollowUpSent && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-700">
                            Sent ✓
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-2xs"
                      >
                        <span>Open Lead</span>
                        <ChevronRight size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
