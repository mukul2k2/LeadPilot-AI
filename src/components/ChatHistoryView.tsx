'use client';

import React, { useState } from 'react';
import { Lead, ChatMessage } from '@/types/lead';
import { useLeads } from '@/context/LeadContext';
import { Send, User, Bot, Sparkles, CheckCheck } from 'lucide-react';

interface ChatHistoryViewProps {
  lead: Lead;
}

export const ChatHistoryView: React.FC<ChatHistoryViewProps> = ({ lead }) => {
  const { logChatMessage, isAnalyzing, analyzingLeadId } = useLeads();
  const [newText, setNewText] = useState('');
  const [senderType, setSenderType] = useState<'buyer' | 'rep'>('buyer');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCurrentLeadAnalyzing = isAnalyzing && analyzingLeadId === lead.id;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const textToSend = newText.trim();
    setNewText('');
    setIsSubmitting(true);

    try {
      await logChatMessage(lead.id, senderType, textToSend);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#efeae2]/40 rounded-xl border border-slate-200 overflow-hidden shadow-inner">
      {/* WhatsApp Header bar */}
      <div className="bg-[#075e54] text-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white font-semibold text-sm border border-emerald-400/40">
            {lead.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold text-sm leading-tight flex items-center gap-2">
              {lead.name}
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded text-emerald-100 font-normal">
                {lead.company}
              </span>
            </div>
            <div className="text-xs text-emerald-100/90">{lead.phone} • Rep: {lead.assignedRep}</div>
          </div>
        </div>
        <div className="text-xs text-emerald-100 bg-emerald-800 px-2.5 py-1 rounded-full font-medium">
          WhatsApp Log
        </div>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-[300px] max-h-[420px] bg-[radial-gradient(#d1d7db_1px,transparent_1px)] [background-size:16px_16px]">
        {lead.chats.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">
            <p className="font-medium text-slate-700">No chat history logged yet.</p>
            <p className="text-xs text-slate-500 mt-1">
              Add the first buyer inquiry below to trigger AI analysis.
            </p>
          </div>
        ) : (
          lead.chats.map((chat: ChatMessage) => {
            const isRep = chat.sender === 'rep';
            return (
              <div
                key={chat.id}
                className={`flex flex-col ${isRep ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm text-sm ${
                    isRep
                      ? 'bg-[#d9fdd3] text-slate-800 rounded-tr-none border border-emerald-200/60'
                      : 'bg-white text-slate-800 rounded-tl-none border border-slate-200'
                  }`}
                >
                  <div className="text-[10px] font-semibold mb-0.5 text-slate-500 flex items-center gap-1">
                    {isRep ? (
                      <>
                        <User size={10} className="text-emerald-700" />
                        <span>{lead.assignedRep} (Sales Rep)</span>
                      </>
                    ) : (
                      <>
                        <User size={10} className="text-slate-600" />
                        <span>{lead.name} (Buyer)</span>
                      </>
                    )}
                  </div>
                  <p className="whitespace-pre-wrap leading-relaxed text-[13px]">{chat.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                    <span>{chat.timestamp}</span>
                    {isRep && <CheckCheck size={12} className="text-sky-600" />}
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Real-time agent typing indicator */}
        {isCurrentLeadAnalyzing && (
          <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs animate-pulse">
            <Sparkles size={14} className="text-emerald-600 animate-spin" />
            <span>AI Agent is re-analyzing chat context & updating follow-up draft...</span>
          </div>
        )}
      </div>

      {/* Input box to log new message */}
      <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Bot size={13} className="text-indigo-600" />
            Log New WhatsApp Interaction:
          </span>
          <div className="flex items-center gap-2 text-xs">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name={`sender-${lead.id}`}
                checked={senderType === 'buyer'}
                onChange={() => setSenderType('buyer')}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${senderType === 'buyer' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>
                Buyer Message
              </span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name={`sender-${lead.id}`}
                checked={senderType === 'rep'}
                onChange={() => setSenderType('rep')}
                className="text-emerald-600 focus:ring-emerald-500"
              />
              <span className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${senderType === 'rep' ? 'bg-emerald-700 text-white' : 'text-slate-600'}`}>
                Rep Message
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-2">
          <textarea
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder={
              senderType === 'buyer'
                ? 'Paste buyer message (e.g. "We need quotation today, budget approved")...'
                : 'Enter sales rep reply...'
            }
            rows={2}
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button
            type="submit"
            disabled={!newText.trim() || isSubmitting || isCurrentLeadAnalyzing}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg flex flex-col items-center justify-center font-medium text-xs transition-colors shrink-0 shadow-sm"
          >
            <Send size={15} />
            <span className="mt-1 text-[10px]">Log & AI Run</span>
          </button>
        </div>
        <p className="text-[10px] text-slate-600 mt-1.5">
          💡 Logging a buyer message triggers the AI agent to re-score the lead (Hot/Warm/Cold) and regenerate the draft message automatically.
        </p>
      </form>
    </div>
  );
};
