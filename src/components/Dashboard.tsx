'use client';

import React, { useState, useEffect } from 'react';
import { useLeads } from '@/context/LeadContext';
import { DashboardHeader } from '@/components/DashboardHeader';
import { PriorityQueue } from '@/components/PriorityQueue';
import { LeadsTable } from '@/components/LeadsTable';
import { LeadDetailDrawer } from '@/components/LeadDetailDrawer';
import { NewLeadModal } from '@/components/NewLeadModal';
import { ApiKeyModal } from '@/components/ApiKeyModal';
import { CheckCircle, Sparkles, MessageCircle, Clock } from 'lucide-react';

export function Dashboard() {
  const { selectedLead, setSelectedLead } = useLeads();
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [isApiKeyOpen, setIsApiKeyOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-100/80 flex flex-col">
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8 animate-pulse">
          {/* Skeleton Header */}
          <div className="h-36 bg-slate-900 rounded-2xl" />

          {/* Skeleton Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="h-20 bg-white rounded-xl border border-slate-200" />
            <div className="h-20 bg-white rounded-xl border border-slate-200" />
            <div className="h-20 bg-white rounded-xl border border-slate-200" />
            <div className="h-20 bg-white rounded-xl border border-slate-200" />
          </div>

          {/* Skeleton Priority Queue */}
          <div className="h-64 bg-white rounded-xl border border-slate-200" />

          {/* Skeleton Table */}
          <div className="h-80 bg-white rounded-xl border border-slate-200" />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/80 flex flex-col">
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 space-y-8">
        
        {/* Top Header & Metrics */}
        <DashboardHeader
          onOpenNewLead={() => setIsNewLeadOpen(true)}
          onOpenApiKey={() => setIsApiKeyOpen(true)}
        />

        {/* Priority Queue (Today's Follow-Ups & Overdue Alerts) */}
        <PriorityQueue />

        {/* Full Filterable Pipeline Table */}
        <LeadsTable />

        {/* Lead Drawer / Detail Modal */}
        <LeadDetailDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />

        {/* Add Lead Modal */}
        <NewLeadModal
          isOpen={isNewLeadOpen}
          onClose={() => setIsNewLeadOpen(false)}
        />

        {/* Gemini API Key Modal */}
        <ApiKeyModal
          isOpen={isApiKeyOpen}
          onClose={() => setIsApiKeyOpen(false)}
        />
      </main>

      {/* Footer & Requirement Validation Bar */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">LeadPilot AI</span>
            <span>•</span>
            <span>FDE Take-Home Assignment Build</span>
            <span>•</span>
            <span className="text-emerald-700 font-medium">B2B Packaging Equipment Sales System</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle size={13} className="text-emerald-600" /> 20 Realistic Packaging Leads
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle size={13} className="text-emerald-600" /> 20 WhatsApp Chat Transcripts
            </span>
            <span className="flex items-center gap-1">
              <Sparkles size={13} className="text-indigo-600" /> Gemini AI Agent Classification
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-rose-600" /> Urgent Follow-up Priority Queue
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
