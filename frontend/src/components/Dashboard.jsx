import React from 'react';
import { CheckCircle2, AlertCircle, XCircle, MessageSquareText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ data }) {
  const { overall_score, breakdown } = data;
  const navigate = useNavigate();
  
  const matched = breakdown.filter(i => i.status === 'matched');
  const partial = breakdown.filter(i => i.status === 'partial');
  const missing = breakdown.filter(i => i.status === 'missing');

  return (
    <section className="space-y-12 animate-fade-in-up">
      <div className="flex flex-col md:flex-row items-center gap-8 bg-offwhite p-8 rounded-2xl shadow-neo border-2 border-void">
        <div className="flex flex-col items-center justify-center w-48 h-48 rounded-full border-[6px] border-void bg-warning shrink-0 shadow-neo-sm transform rotate-3">
          <span className="font-space text-6xl font-bold text-void tracking-tighter">{overall_score}</span>
          <span className="font-mono text-xs text-void font-bold mt-1 uppercase">Match Score</span>
        </div>
        <div className="flex-1 space-y-4">
          <h2 className="font-space text-4xl font-bold text-void bg-white inline-block px-3 py-1 border-2 border-void shadow-neo-sm -rotate-1">Analysis Complete</h2>
          <p className="font-mono text-void font-bold text-sm bg-white p-3 border-2 border-void shadow-neo-sm">
            We extracted {breakdown.length} core requirements from the job description and compared them against your resume using semantic similarity.
          </p>
          <div className="flex gap-4 pt-2">
            <span className="inline-flex items-center gap-2 font-mono text-sm font-bold bg-white px-2 py-1 border-2 border-void shadow-neo-sm rotate-1"><CheckCircle2 className="w-4 h-4 text-signal" /> {matched.length} Matched</span>
            <span className="inline-flex items-center gap-2 font-mono text-sm font-bold bg-white px-2 py-1 border-2 border-void shadow-neo-sm -rotate-1"><AlertCircle className="w-4 h-4 text-amber-500" /> {partial.length} Partial</span>
            <span className="inline-flex items-center gap-2 font-mono text-sm font-bold bg-white px-2 py-1 border-2 border-void shadow-neo-sm rotate-2"><XCircle className="w-4 h-4 text-red-500" /> {missing.length} Missing</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="Matched" items={matched} type="matched" navigate={navigate} />
        <Column title="Partial" items={partial} type="partial" navigate={navigate} />
        <Column title="Missing" items={missing} type="missing" navigate={navigate} />
      </div>
    </section>
  );
}

function Column({ title, items, type, navigate }) {
  const getColors = () => {
    switch (type) {
      case 'matched': return 'border-void bg-signal/10';
      case 'partial': return 'border-void bg-amber-500/10';
      case 'missing': return 'border-void bg-red-500/10';
      default: return '';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'matched': return <CheckCircle2 className="w-5 h-5 text-signal shrink-0 mt-0.5" />;
      case 'partial': return <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
      case 'missing': return <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />;
      default: return null;
    }
  };

  return (
    <div className={`rounded-2xl border-2 shadow-neo p-6 ${getColors()}`}>
      <h3 className="font-space text-xl font-bold text-void mb-6 flex items-center justify-between">
        {title}
        <span className="text-sm font-mono text-void bg-white px-2 py-1 rounded shadow-neo-sm border-2 border-void transform rotate-2">{items.length}</span>
      </h3>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
        {items.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-neo-sm border-2 border-void space-y-3 relative group hover:shadow-neo hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 cursor-default">
            <div className="flex gap-2">
              {getIcon()}
              <div className="flex-1">
                <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider mb-2 bg-void text-white shadow-neo-sm border border-void">
                  {item.weight_label}
                </span>
                <p className="text-sm font-bold text-void leading-snug">{item.requirement}</p>
              </div>
            </div>
            {type !== 'missing' && (
              <div className="pl-6 border-l-4 border-void ml-2 bg-offwhite p-2">
                <p className="text-xs font-mono text-void font-medium line-clamp-3">"{item.evidence}"</p>
              </div>
            )}
            {type !== 'matched' && (
              <button 
                onClick={() => {
                  window.dispatchEvent(new CustomEvent('open-chat', { detail: { item: item.requirement } }));
                }}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2 border-2 border-void bg-white shadow-neo-sm text-xs font-mono font-bold text-void hover:bg-warning hover:shadow-neo hover:-translate-y-0.5 hover:-translate-x-0.5 transition-all opacity-0 group-hover:opacity-100"
              >
                <MessageSquareText className="w-3 h-3" />
                Ask About This
              </button>
            )}
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm font-mono text-graphite/40 text-center py-8">No items in this category</p>
        )}
      </div>
    </div>
  );
}
