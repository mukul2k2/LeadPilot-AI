'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Lead, UrgencyTag, ChatMessage, AgentAnalysisResult, LLMConfig } from '@/types/lead';
import { INITIAL_LEADS } from '@/data/initialLeads';

export const DEFAULT_LLM_CONFIG: LLMConfig = {
  provider: 'gemini',
  model: 'gemini-3.5-flash-lite',
  apiKey: '',
  baseUrl: 'https://api.openai.com/v1'
};

interface LeadContextType {
  leads: Lead[];
  selectedLead: Lead | null;
  setSelectedLead: (lead: Lead | null) => void;
  selectedRep: string;
  setSelectedRep: (rep: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTagFilter: UrgencyTag | 'All';
  setSelectedTagFilter: (tag: UrgencyTag | 'All') => void;
  apiKey: string;
  setApiKey: (key: string) => void;
  llmConfig: LLMConfig;
  setLlmConfig: (config: LLMConfig) => void;
  isAnalyzing: boolean;
  analyzingLeadId: string | null;
  todayStr: string;
  
  // Actions
  addLead: (newLeadData: Partial<Lead>) => Promise<Lead>;
  updateLead: (updatedLead: Lead) => void;
  markFollowUpSent: (leadId: string, sentMessage?: string) => void;
  logChatMessage: (leadId: string, sender: 'rep' | 'buyer', text: string) => Promise<void>;
  runAiEvaluation: (leadId: string) => Promise<void>;
  resetToDefaultData: () => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const STORAGE_KEY = 'leadpilot_leads_v2';
const API_KEY_STORAGE = 'leadpilot_gemini_key';
const LLM_CONFIG_STORAGE = 'leadpilot_llm_config_v2';

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [todayStr, setTodayStr] = useState<string>(() => new Date().toISOString().split('T')[0]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedRep, setSelectedRep] = useState<string>('All Reps');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTagFilter, setSelectedTagFilter] = useState<UrgencyTag | 'All'>('All');
  const [apiKey, setApiKey] = useState<string>('');
  const [llmConfig, setLlmConfigState] = useState<LLMConfig>(DEFAULT_LLM_CONFIG);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analyzingLeadId, setAnalyzingLeadId] = useState<string | null>(null);

  // Initialize from LocalStorage or mock data
  useEffect(() => {
    try {
      const storedLeads = localStorage.getItem(STORAGE_KEY);
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      } else {
        setLeads(INITIAL_LEADS);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      }

      const storedKey = localStorage.getItem(API_KEY_STORAGE);
      if (storedKey) {
        setApiKey(storedKey);
      }

      const storedLlmConfig = localStorage.getItem(LLM_CONFIG_STORAGE);
      if (storedLlmConfig) {
        setLlmConfigState(JSON.parse(storedLlmConfig));
      } else if (storedKey) {
        setLlmConfigState(prev => ({ ...prev, apiKey: storedKey }));
      }

      setTodayStr(new Date().toISOString().split('T')[0]);
    } catch {
      setLeads(INITIAL_LEADS);
    }
  }, []);

  // Save to LocalStorage whenever leads change
  const saveLeads = (newLeads: Lead[]) => {
    setLeads(newLeads);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLeads));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  const handleSetApiKey = (key: string) => {
    setApiKey(key);
    setLlmConfigState(prev => {
      const updated = { ...prev, apiKey: key };
      try {
        localStorage.setItem(LLM_CONFIG_STORAGE, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    try {
      localStorage.setItem(API_KEY_STORAGE, key);
    } catch (e) {
      console.error('Failed to save API key:', e);
    }
  };

  const handleSetLlmConfig = (newConfig: LLMConfig) => {
    setLlmConfigState(newConfig);
    if (newConfig.apiKey) {
      setApiKey(newConfig.apiKey);
    }
    try {
      localStorage.setItem(LLM_CONFIG_STORAGE, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save LLM config:', e);
    }
  };

  const updateLead = (updated: Lead) => {
    const updatedLeads = leads.map(l => (l.id === updated.id ? updated : l));
    saveLeads(updatedLeads);
    if (selectedLead?.id === updated.id) {
      setSelectedLead(updated);
    }
  };

  const markFollowUpSent = (leadId: string, sentMessage?: string) => {
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;

    const messageToSend = sentMessage || targetLead.aiDraftMessage;
    const newChat: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'rep',
      text: messageToSend,
      timestamp: 'Just now'
    };

    // Calculate next date (Hot: +2 days, Warm: +5 days, Cold: +20 days)
    const nextOffset = targetLead.aiTag === 'Hot' ? 2 : targetLead.aiTag === 'Warm' ? 5 : 20;
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + nextOffset);

    const updated: Lead = {
      ...targetLead,
      isFollowUpSent: true,
      lastContactDate: new Date().toISOString().split('T')[0],
      nextFollowUpDate: nextDate.toISOString().split('T')[0],
      chats: [...targetLead.chats, newChat],
      aiDraftMessage: `Hi ${targetLead.name.split(' ')[0]}, just following up on our earlier message regarding the ${targetLead.equipmentInterest}. Let me know if you need any additional specifications or trial arrangements.`
    };

    updateLead(updated);
  };

  const runAiEvaluation = async (leadId: string) => {
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;

    setIsAnalyzing(true);
    setAnalyzingLeadId(leadId);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: targetLead, config: llmConfig, apiKey })
      });

      if (!res.ok) {
        throw new Error(`Agent API returned ${res.status}`);
      }

      const result = (await res.json()) as AgentAnalysisResult;
      const updated: Lead = {
        ...targetLead,
        aiTag: result.aiTag,
        aiReason: result.aiReason,
        nextFollowUpDate: result.nextFollowUpDate,
        aiDraftMessage: result.aiDraftMessage,
        aiLastEvaluatedAt: new Date().toISOString(),
        isFollowUpSent: false
      };

      updateLead(updated);
    } catch (err) {
      console.error('Failed to run AI evaluation:', err);
    } finally {
      setIsAnalyzing(false);
      setAnalyzingLeadId(null);
    }
  };

  const logChatMessage = async (leadId: string, sender: 'rep' | 'buyer', text: string) => {
    const targetLead = leads.find(l => l.id === leadId);
    if (!targetLead) return;

    const newChat: ChatMessage = {
      id: `c-${Date.now()}`,
      sender,
      text,
      timestamp: 'Just now'
    };

    const leadWithNewChat: Lead = {
      ...targetLead,
      lastContactDate: new Date().toISOString().split('T')[0],
      chats: [...targetLead.chats, newChat],
      isFollowUpSent: sender === 'rep'
    };

    // Immediately update local state
    updateLead(leadWithNewChat);

    // Trigger AI evaluation with updated chat
    setIsAnalyzing(true);
    setAnalyzingLeadId(leadId);

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: leadWithNewChat, config: llmConfig, apiKey })
      });

      if (res.ok) {
        const result = (await res.json()) as AgentAnalysisResult;
        const reAnalyzedLead: Lead = {
          ...leadWithNewChat,
          aiTag: result.aiTag,
          aiReason: result.aiReason,
          nextFollowUpDate: result.nextFollowUpDate,
          aiDraftMessage: result.aiDraftMessage,
          aiLastEvaluatedAt: new Date().toISOString()
        };
        updateLead(reAnalyzedLead);
      }
    } catch (err) {
      console.error('AI analysis after chat message failed:', err);
    } finally {
      setIsAnalyzing(false);
      setAnalyzingLeadId(null);
    }
  };

  const addLead = async (newLeadData: Partial<Lead>): Promise<Lead> => {
    setIsAnalyzing(true);
    const newId = `lead-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];

    // Create preliminary lead
    const preliminaryLead: Lead = {
      id: newId,
      name: newLeadData.name || 'New Prospect',
      company: newLeadData.company || 'Enterprise Machinery Client',
      phone: newLeadData.phone || '+91 98000 00000',
      assignedRep: newLeadData.assignedRep || 'Arun Verma',
      source: newLeadData.source || 'Website Inquiry',
      equipmentInterest: newLeadData.equipmentInterest || 'Industrial Packaging Machinery',
      lastContactDate: today,
      nextFollowUpDate: today,
      aiTag: 'Warm',
      aiReason: 'New lead added. Awaiting first interaction evaluation.',
      aiDraftMessage: `Hi ${newLeadData.name?.split(' ')[0] || 'there'}, thank you for reaching out regarding our ${newLeadData.equipmentInterest || 'machinery'}. When is a good time for a brief 5-minute call today?`,
      aiLastEvaluatedAt: new Date().toISOString(),
      isFollowUpSent: false,
      chats: newLeadData.chats || []
    };

    // Run AI to analyze initial details or initial chat
    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead: preliminaryLead, config: llmConfig, apiKey })
      });

      if (res.ok) {
        const result = (await res.json()) as AgentAnalysisResult;
        preliminaryLead.aiTag = result.aiTag;
        preliminaryLead.aiReason = result.aiReason;
        preliminaryLead.nextFollowUpDate = result.nextFollowUpDate;
        preliminaryLead.aiDraftMessage = result.aiDraftMessage;
      }
    } catch (err) {
      console.error('AI analysis for new lead failed:', err);
    } finally {
      setIsAnalyzing(false);
    }

    const updatedLeads = [preliminaryLead, ...leads];
    saveLeads(updatedLeads);
    setSelectedLead(preliminaryLead);
    return preliminaryLead;
  };

  const resetToDefaultData = () => {
    saveLeads(INITIAL_LEADS);
    setSelectedLead(null);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        selectedLead,
        setSelectedLead,
        selectedRep,
        setSelectedRep,
        searchQuery,
        setSearchQuery,
        selectedTagFilter,
        setSelectedTagFilter,
        apiKey,
        setApiKey: handleSetApiKey,
        llmConfig,
        setLlmConfig: handleSetLlmConfig,
        isAnalyzing,
        analyzingLeadId,
        todayStr,
        addLead,
        updateLead,
        markFollowUpSent,
        logChatMessage,
        runAiEvaluation,
        resetToDefaultData
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error('useLeads must be used within a LeadProvider');
  }
  return context;
}
