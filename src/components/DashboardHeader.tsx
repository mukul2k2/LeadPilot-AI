'use client';

import React from 'react';
import { useLeads } from '@/context/LeadContext';
import { SALES_REPS } from '@/data/initialLeads';
import {
  AlertTriangle,
  Clock,
  Flame,
  Users,
  Search,
  Plus,
  Key,
  RotateCcw,
  Bot,
  Filter,
  Cpu
} from 'lucide-react';

interface DashboardHeaderProps {
  onOpenNewLead: () => void;
  onOpenApiKey: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onOpenNewLead,
  onOpenApiKey
}) => {
  const {
    leads,
    selectedRep,
    setSelectedRep,
    searchQuery,
    setSearchQuery,
    resetToDefaultData,
    apiKey,
    todayStr,
    llmConfig
  } = useLeads();

  const todayStr_val = todayStr;

  // Counts based on currently selected rep (or all)
  const repFiltered = leads.filter(l =>
    selectedRep === 'All Reps' ? true : l.assignedRep === selectedRep
  );

  const overdueCount = repFiltered.filter(
    l => l.nextFollowUpDate < todayStr_val && !l.isFollowUpSent
  ).length;

  const dueTodayCount = repFiltered.filter(
    l => l.nextFollowUpDate === todayStr_val && !l.isFollowUpSent
  ).length;

  const hotCount = repFiltered.filter(l => l.aiTag === 'Hot').length;
  const totalCount = repFiltered.length;

  const handleReset = () => {
    if (window.confirm('Reset all leads and WhatsApp chats back to the default 20 sample records?')) {
      resetToDefaultData();
    }
  };

  return (
    <header className="space-y-4">
      {/* Top Brand Bar */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-300 flex items-center justify-center text-slate-950 font-black shadow-md">
            <Bot size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white">LeadPilot AI</h1>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Packaging Machinery Sales Agent
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Empowering sales reps with instant daily follow-up prioritization & WhatsApp draft generation
            </p>
          </div>
        </div>

        {/* Global Header Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenApiKey}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              llmConfig.apiKey
                ? 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
            }`}
            title="Configure AI Model and API Key"
          >
            <Cpu size={13} className={llmConfig.apiKey ? 'text-indigo-400' : 'text-emerald-400'} />
            <span>
              {llmConfig.provider === 'gemini' ? 'Gemini' : 'OpenAI'}: {llmConfig.model.replace('gemini-', '')}
            </span>
            {llmConfig.apiKey && (
              <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded font-mono">
                BYOK
              </span>
            )}
          </button>

          <button
            onClick={handleReset}
            className="px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors border border-slate-700 flex items-center gap-1.5"
            title="Reset to 20 initial packaging sample leads"
          >
            <RotateCcw size={13} />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={onOpenNewLead}
            className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-slate-950 flex items-center gap-1.5 shadow-md transition-all active:scale-95"
          >
            <Plus size={16} className="text-slate-950 font-bold" />
            <span>+ Add New Lead</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Stats Cards (Fulfills the 10-Second Test) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Overdue Card */}
        <div className="bg-white rounded-xl p-4 border-2 border-red-200 shadow-xs flex items-center gap-3 relative overflow-hidden">
          <div className="w-10 h-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center shrink-0">
            <AlertTriangle size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-red-600 leading-none" suppressHydrationWarning>
              {overdueCount}
            </div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
              Overdue Follow-ups
            </div>
            <div className="text-[10px] text-red-500 font-medium">Needs immediate action</div>
          </div>
        </div>

        {/* Due Today Card */}
        <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Clock size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700 leading-none" suppressHydrationWarning>
              {dueTodayCount}
            </div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
              Due Today
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">Scheduled for contact</div>
          </div>
        </div>

        {/* Hot Leads Card */}
        <div className="bg-white rounded-xl p-4 border border-rose-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
            <Flame size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-rose-600 leading-none" suppressHydrationWarning>
              {hotCount}
            </div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
              Hot Deals
            </div>
            <div className="text-[10px] text-rose-500 font-medium">High purchase readiness</div>
          </div>
        </div>

        {/* Total Active Leads Card */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-800 leading-none" suppressHydrationWarning>
              {totalCount}
            </div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wide mt-1">
              Total Active Leads
            </div>
            <div className="text-[10px] text-slate-500 font-medium">5 Reps pipeline</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl p-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Sales Rep Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Filter size={13} className="text-slate-400" />
            Assigned Sales Rep:
          </span>
          <div className="flex flex-wrap gap-1">
            {SALES_REPS.map(rep => (
              <button
                key={rep}
                onClick={() => setSelectedRep(rep)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedRep === rep
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {rep}
              </button>
            ))}
          </div>
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px] flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads, company, machine, phone..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
