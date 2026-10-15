export type UrgencyTag = 'Hot' | 'Warm' | 'Cold';

export type LeadSource = 
  | 'Indiamart' 
  | 'Website Inquiry' 
  | 'PackEx Expo 2026' 
  | 'Cold Outreach' 
  | 'Client Referral' 
  | 'Direct WhatsApp';

export interface ChatMessage {
  id: string;
  sender: 'rep' | 'buyer';
  text: string;
  timestamp: string; // ISO string or human formatted date
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  phone: string;
  assignedRep: string; // e.g., 'Arun Verma', 'Neha Patil', 'Karan Mehta', 'Vikram Singh', 'Sneha Rao'
  source: LeadSource;
  equipmentInterest: string; // e.g. "Continuous Band Sealer CBS-900"
  lastContactDate: string; // YYYY-MM-DD
  nextFollowUpDate: string; // YYYY-MM-DD
  
  // AI Agent Outputs
  aiTag: UrgencyTag;
  aiReason: string; // 1-line crisp rationale
  aiDraftMessage: string; // Natural, contextual WhatsApp follow-up copy
  aiLastEvaluatedAt: string; // ISO timestamp
  
  // Follow-up interaction state
  isFollowUpSent: boolean;
  notes?: string;
  chats: ChatMessage[];
}

export interface AgentAnalysisResult {
  aiTag: UrgencyTag;
  aiReason: string;
  nextFollowUpDate: string;
  aiDraftMessage: string;
  modelUsed?: string;
}

export type LLMProvider = 'gemini' | 'openai' | 'custom';

export interface LLMConfig {
  provider: LLMProvider;
  model: string;
  apiKey: string;
  baseUrl?: string;
}
