'use client';

import React, { useState, useEffect } from 'react';
import { useLeads } from '@/context/LeadContext';
import { LLMConfig, LLMProvider } from '@/types/lead';
import {
  Key,
  X,
  Check,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Sparkles,
  Zap,
  Globe,
  RotateCcw,
  AlertCircle
} from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GEMINI_MODELS = [
  { id: 'gemini-3.5-flash-lite', name: 'Gemini 3.5 Flash-Lite (Recommended, Ultra-Fast)' },
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash (Latest Flagship)' },
  { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
  { id: 'custom', name: 'Custom Gemini Model ID...' }
];

const OPENAI_PRESETS = [
  {
    name: 'OpenAI (Official)',
    baseUrl: 'https://api.openai.com/v1',
    models: ['gpt-4o-mini', 'gpt-4o']
  },
  {
    name: 'Groq Cloud (Ultra Low Latency)',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant']
  },
  {
    name: 'DeepSeek',
    baseUrl: 'https://api.deepseek.com/v1',
    models: ['deepseek-chat', 'deepseek-reasoner']
  },
  {
    name: 'Custom OpenAI-Compatible Endpoint',
    baseUrl: '',
    models: ['custom']
  }
];

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const { llmConfig, setLlmConfig } = useLeads();
  const [provider, setProvider] = useState<LLMProvider>(llmConfig.provider || 'gemini');
  const [model, setModel] = useState<string>(llmConfig.model || 'gemini-3.5-flash-lite');
  const [customModel, setCustomModel] = useState<string>('');
  const [apiKey, setApiKeyInput] = useState<string>(llmConfig.apiKey || '');
  const [baseUrl, setBaseUrl] = useState<string>(llmConfig.baseUrl || 'https://api.openai.com/v1');
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);

  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProvider(llmConfig.provider || 'gemini');
      setModel(llmConfig.model || 'gemini-3.5-flash-lite');
      setApiKeyInput(llmConfig.apiKey || '');
      setBaseUrl(llmConfig.baseUrl || 'https://api.openai.com/v1');
      setTestResult(null);
    }
  }, [isOpen, llmConfig]);

  if (!isOpen) return null;

  const handleProviderChange = (newProvider: LLMProvider) => {
    setProvider(newProvider);
    setTestResult(null);
    if (newProvider === 'gemini') {
      setModel('gemini-3.5-flash-lite');
    } else {
      setModel('gpt-4o-mini');
      setBaseUrl('https://api.openai.com/v1');
      setSelectedPresetIndex(0);
    }
  };

  const handlePresetChange = (idx: number) => {
    setSelectedPresetIndex(idx);
    const preset = OPENAI_PRESETS[idx];
    setBaseUrl(preset.baseUrl);
    setModel(preset.models[0]);
    setTestResult(null);
  };

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);

    const effectiveModel = model === 'custom' ? customModel.trim() : model;

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test',
          config: {
            provider,
            model: effectiveModel,
            apiKey: apiKey.trim(),
            baseUrl: baseUrl.trim()
          }
        })
      });

      const data = await res.json();
      setTestResult({
        success: data.success,
        message: data.message
      });
    } catch (err) {
      setTestResult({
        success: false,
        message: err instanceof Error ? err.message : 'Network test request failed'
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveModel = model === 'custom' ? customModel.trim() : model;

    const newConfig: LLMConfig = {
      provider,
      model: effectiveModel || (provider === 'gemini' ? 'gemini-3.5-flash-lite' : 'gpt-4o-mini'),
      apiKey: apiKey.trim(),
      baseUrl: baseUrl.trim()
    };

    setLlmConfig(newConfig);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  const handleResetToDefault = () => {
    setProvider('gemini');
    setModel('gemini-3.5-flash-lite');
    setApiKeyInput('');
    setBaseUrl('https://api.openai.com/v1');
    setTestResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl text-slate-950 font-bold">
              <Cpu size={20} />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">AI Model & API Key Settings</h3>
              <p className="text-xs text-slate-400">Zero-config default with Bring-Your-Own-Key (BYOK) override</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="p-6 space-y-5">
          
          {/* Provider Selection Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Select AI Engine / Provider
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => handleProviderChange('gemini')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  provider === 'gemini'
                    ? 'bg-white text-emerald-800 shadow-xs border border-emerald-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles size={14} className="text-emerald-600" />
                Google Gemini (Default)
              </button>

              <button
                type="button"
                onClick={() => handleProviderChange('openai')}
                className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  provider === 'openai'
                    ? 'bg-white text-indigo-800 shadow-xs border border-indigo-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap size={14} className="text-indigo-600" />
                OpenAI / Compatible
              </button>
            </div>
          </div>

          {/* GEMINI SETTINGS */}
          {provider === 'gemini' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Gemini Model Selection
                </label>
                <select
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  {GEMINI_MODELS.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                {model === 'custom' && (
                  <input
                    type="text"
                    placeholder="Enter custom Gemini model ID (e.g. gemini-3.5-flash)"
                    value={customModel}
                    onChange={e => setCustomModel(e.target.value)}
                    className="mt-2 w-full text-xs px-3 py-2 border border-slate-300 rounded-lg"
                  />
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Google Gemini API Key
                  </label>
                  <span className="text-[11px] text-slate-500">
                    {apiKey ? '🔑 Custom Key' : '⚡ Server Default Active'}
                  </span>
                </div>
                <input
                  type="password"
                  placeholder="Leave blank to use server environment key (GEMINI_API_KEY)"
                  value={apiKey}
                  onChange={e => setApiKeyInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Tip: If left blank, LeadPilot uses the pre-configured server environment.
                </p>
              </div>
            </div>
          )}

          {/* OPENAI / COMPATIBLE SETTINGS */}
          {provider === 'openai' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Provider Preset
                </label>
                <select
                  value={selectedPresetIndex}
                  onChange={e => handlePresetChange(Number(e.target.value))}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {OPENAI_PRESETS.map((p, idx) => (
                    <option key={p.name} value={idx}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Model Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. gpt-4o-mini or llama-3.3-70b"
                    value={model}
                    onChange={e => setModel(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Base URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://api.openai.com/v1"
                    value={baseUrl}
                    onChange={e => setBaseUrl(e.target.value)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={e => setApiKeyInput(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Test Connection Output */}
          {testResult && (
            <div
              className={`p-3 rounded-lg text-xs flex items-start gap-2 border ${
                testResult.success
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {testResult.success ? (
                <Check size={16} className="text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle size={16} className="text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="leading-snug">{testResult.message}</div>
            </div>
          )}

          {/* Offline Heuristic Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-600 flex items-start gap-2">
            <ShieldCheck size={16} className="text-emerald-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-normal">
              <strong>Offline Resilience:</strong> Even if your API key runs out of quota or offline evaluation is performed, LeadPilot automatically falls back to built-in heuristic parsing so the dashboard never breaks.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-medium"
            >
              <RotateCcw size={12} />
              Reset to Defaults
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 disabled:opacity-50"
              >
                {testing ? 'Testing...' : 'Test Connection'}
              </button>

              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold shadow-sm transition-all"
              >
                {saved ? 'Saved!' : 'Save & Apply'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
