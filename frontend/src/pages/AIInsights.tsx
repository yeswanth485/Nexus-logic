import { useState, useRef, useEffect } from 'react';
import { Cpu, Sparkles, Target, Zap, MessageSquare, Trash2, Send } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { useToast } from "../components/ui/Toast";
import Spinner from "../components/ui/Spinner";

type Message = { id: string; role: 'user'|'ai'; text: string; timestamp: string; };

export default function AIInsights() {
  const { state, logAction } = useAppContext();
  const { showToast } = useToast();

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'ai', text: 'Hello! I am your Nexus Logix AI assistant. I can help you analyze shipments, fleet performance, routes, and supply chain risks. How can I assist you today?', timestamp: new Date().toISOString() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [executedActions, setExecutedActions] = useState<Set<string>>(new Set());
  const [executingId, setExecutingId] = useState<string|null>(null);

  const CHIPS = ['What shipments are delayed?', 'Which vehicles need maintenance?', 'Optimize routes for today', 'Show risk summary', 'Fleet efficiency report'];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text?: string) => {
    const msg = text || inputText.trim();
    if (!msg) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: msg, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    
    const context = {
      totalShipments: state.shipments.length,
      activeShipments: state.shipments.filter(s => s.status === 'active').length,
      delayedShipments: state.shipments.filter(s => s.status === 'delayed').map(s => s.id + ': ' + s.origin + '→' + s.destination),
      activeVehicles: state.vehicles.filter(v => v.status === 'active').length,
      maintenanceVehicles: state.vehicles.filter(v => v.status === 'maintenance').map(v => v.id),
      criticalRisks: state.riskAlerts.filter(r => r.severity === 'critical' && !r.mitigated).map(r => r.title),
    };
    
    try {
      const response = await fetch(import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL + '/api/ai-chat' : '/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, context }),
      });
      const data = await response.json();
      const aiMsg: Message = { id: (Date.now()+1).toString(), role: 'ai', text: data.reply || 'I could not process that request. Please try again.', timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMsg]);
      logAction('AI Insights', 'AI Query', msg.substring(0, 60) + (msg.length > 60 ? '...' : ''), 'info');
    } catch {
      const errMsg: Message = { id: (Date.now()+1).toString(), role: 'ai', text: 'Connection error. Please ensure the backend is running and try again.', timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleExecuteAction = async (id: string, description: string) => {
    setExecutingId(id);
    await new Promise(r => setTimeout(r, 1000));
    setExecutedActions(prev => new Set([...prev, id]));
    setExecutingId(null);
    logAction('AI Insights', 'Action Executed', description, 'success');
    showToast('success', 'Action Executed', description);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-[fade-up_0.4s_ease-out]">
      <style>{`
        @keyframes bounce { 0%,60%,100% { transform: translateY(0) } 30% { transform: translateY(-8px) } }
      `}</style>
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-display text-[var(--text-primary)]">Nexus AI Core</h1>
          <p className="text-sm text-[var(--text-secondary)]">Autonomous intelligence recommendations and conversational data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-[var(--bg-hover)] border-2 border-[var(--accent-primary)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-glow-accent)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 grayscale pointer-events-none">
                <Cpu className="w-32 h-32" />
              </div>
              <h3 className="font-semibold text-lg text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--accent-primary)]" />
                Strategic Recommendation
              </h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
                Based on the last 30 days of shipment volume, predictive models indicate a 24% surge in demand for electronics across the southern corridor. Current warehouse capacity at WH-01 (Chennai) is insufficient.
              </p>
              
              <div className="bg-[var(--bg-base)] border border-[var(--border-strong)] rounded flex flex-col gap-2 p-4">
                 <h4 className="text-xs uppercase font-bold text-[var(--text-muted)] tracking-wider mb-2">Suggested Actions</h4>
                 
                 <div onClick={() => !executedActions.has('act1') && handleExecuteAction('act1', 'Re-routed 12 inbound electronics containers to WH-02')} className={`flex items-center justify-between bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-subtle)] transition-colors ${!executedActions.has('act1') ? 'hover:border-[var(--accent-primary)] cursor-pointer' : 'opacity-70'}`}>
                    <div className="flex items-center gap-3">
                      <Target className="w-4 h-4 text-[var(--status-info)]" />
                      <span className="text-sm text-[var(--text-primary)] font-medium">Re-route 12 inbound electronics containers to WH-02 (Bengaluru)</span>
                    </div>
                    {executedActions.has('act1') ? (
                      <button disabled className="text-xs bg-transparent border border-[var(--border-default)] text-[var(--text-muted)] px-3 py-1 rounded font-bold cursor-not-allowed">✓ Done</button>
                    ) : (
                      <button disabled={executingId === 'act1'} className="flex items-center justify-center min-w-[80px] text-xs bg-[var(--accent-primary)] text-white px-3 py-1 rounded font-bold hover:brightness-110">
                        {executingId === 'act1' ? <Spinner size="sm" /> : 'Execute'}
                      </button>
                    )}
                 </div>
                 
                 <div onClick={() => !executedActions.has('act2') && handleExecuteAction('act2', 'Auto-scheduled 5 additional carriers')} className={`flex items-center justify-between bg-[var(--bg-surface)] p-3 rounded border border-[var(--border-subtle)] transition-colors ${!executedActions.has('act2') ? 'hover:border-[var(--accent-primary)] cursor-pointer' : 'opacity-70'}`}>
                    <div className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-[var(--status-warning)]" />
                      <span className="text-sm text-[var(--text-primary)] font-medium">Auto-schedule 5 additional carriers for line-haul</span>
                    </div>
                    {executedActions.has('act2') ? (
                      <button disabled className="text-xs bg-transparent border border-[var(--border-default)] text-[var(--text-muted)] px-3 py-1 rounded font-bold cursor-not-allowed">✓ Done</button>
                    ) : (
                      <button disabled={executingId === 'act2'} className="flex items-center justify-center min-w-[80px] text-xs bg-[var(--accent-primary)] text-white px-3 py-1 rounded font-bold hover:brightness-110">
                        {executingId === 'act2' ? <Spinner size="sm" /> : 'Execute'}
                      </button>
                    )}
                 </div>
              </div>
           </div>

           <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-[var(--kpi-fleet)]" />
                Cost Optimization Ops
              </h3>
              <ul className="space-y-4">
                 <li className="flex justify-between items-center text-sm">
                   <span className="text-[var(--text-primary)]">Consolidate LTL shipments on Route 4A</span>
                   <span className="text-[var(--status-success)] font-medium">+ ₹2.4L est. savings</span>
                 </li>
                 <li className="flex justify-between items-center text-sm">
                   <span className="text-[var(--text-primary)]">Switch to alternative supplier for SKU-901</span>
                   <span className="text-[var(--status-success)] font-medium">- 1.2% cost reduction</span>
                 </li>
              </ul>
           </div>
        </div>

        <div className="lg:col-span-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] shadow-[var(--shadow-card)] flex flex-col h-[550px]">
           <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between bg-[var(--bg-elevated)]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--accent-primary)]" />
                <h3 className="font-semibold text-[var(--text-primary)]">Logistics Copilot</h3>
              </div>
              <button 
                onClick={() => {
                  setMessages([{ id:'1', role:'ai', text:'Conversation cleared. How can I help you?', timestamp: new Date().toISOString() }]);
                  showToast('info', 'Cleared', 'Conversation has been reset.');
                }}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)]" title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
           </div>
           
           <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 text-sm rounded-lg max-w-[85%] ${m.role === 'user' ? 'bg-[var(--bg-hover)] border border-[var(--border-default)] rounded-br-none text-[var(--text-primary)]' : 'bg-[image:var(--gradient-card)] border border-[var(--border-strong)] rounded-tl-none text-[var(--text-secondary)] shadow-sm'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div style={{display:'flex', gap:4, padding:'12px 16px', background:'var(--bg-elevated)', borderRadius:12, width:'fit-content', border: '1px solid var(--border-default)'}}>
                    {[0,1,2].map(i => <div key={i} style={{width:6, height:6, borderRadius:'50%', background:'var(--text-secondary)', animation:'bounce 1.2s ease-in-out ' + (i*0.2) + 's infinite'}} />)}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>
           
           <div className="p-3 border-t border-[var(--border-subtle)] bg-[var(--bg-elevated)]">
             {!isTyping && (
               <div className="flex gap-2 overflow-x-auto pb-2 mb-2 custom-scrollbar no-scrollbar">
                 {CHIPS.map(chip => (
                   <button 
                     key={chip} 
                     onClick={() => sendMessage(chip)}
                     className="whitespace-nowrap px-3 py-1.5 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-full text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-colors"
                   >
                     {chip}
                   </button>
                 ))}
               </div>
             )}
             <div className="relative flex items-center">
               <input 
                 type="text" 
                 value={inputText}
                 onChange={e => setInputText(e.target.value)}
                 onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                 disabled={isTyping}
                 placeholder="Ask AI anything..." 
                 className="w-full bg-[var(--bg-input)] border border-[var(--border-default)] rounded-full pl-4 pr-10 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent-primary)] disabled:opacity-50" 
               />
               <button 
                 onClick={() => sendMessage()}
                 disabled={isTyping || !inputText.trim()}
                 className="absolute right-2 p-1.5 text-[var(--accent-primary)] hover:text-[var(--text-primary)] disabled:opacity-50"
               >
                 <Send className="w-4 h-4" />
               </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
