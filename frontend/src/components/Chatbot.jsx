import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User } from 'lucide-react';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';

export default function Chatbot({ resumeText, jdText, breakdown, extractedContext, initialQuery }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'I am MatchWise, your AI career assistant. I have analyzed your resume against the job description. What would you like to know or improve?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialQuery) {
      setInput(`How can I improve my resume to show: "${initialQuery}"?`);
    }
  }, [initialQuery]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: newMessages.slice(1),
          context: { resume_text: resumeText, jd_text: jdText, breakdown, extracted_context: extractedContext }
        })
      });
      
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Error connecting to the AI. Please ensure the backend is running and the OPENAI_API_KEY is valid.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const chips = [
    "Why was my top skill marked partial?",
    "Rewrite my weakest bullet",
    "What should I fix first?"
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col border-2 border-void shadow-neo">
      <div className="flex items-center justify-between p-4 bg-warning select-none border-b-2 border-void shrink-0">
        <div className="flex items-center gap-2 text-void">
          <Bot className="w-5 h-5" />
          <span className="font-space font-bold text-lg uppercase tracking-tight">MatchWise</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-offwhite custom-scrollbar border-b-2 border-void">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded border-2 border-void flex items-center justify-center shrink-0 shadow-neo-sm transform ${msg.role === 'user' ? 'bg-void text-white rotate-3' : 'bg-signal text-void -rotate-2'}`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-4 rounded-xl border-2 border-void shadow-neo max-w-[85%] ${
              msg.role === 'user' 
                ? 'bg-void text-white font-mono text-sm' 
                : 'bg-white text-void text-sm font-space leading-relaxed font-medium'
            }`}>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(msg.content.replace(/\n/g, '<br/>')) }} />
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded border-2 border-void bg-signal text-void shadow-neo-sm -rotate-2 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-xl bg-white border-2 border-void shadow-neo text-void text-sm font-bold">
              <span className="animate-pulse">Processing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 bg-white shrink-0">
        <div className="flex gap-2 overflow-x-auto mb-4 pb-2 custom-scrollbar">
          {chips.map((chip, idx) => (
            <button 
              key={idx} 
              onClick={() => handleSend(chip)}
              className="whitespace-nowrap px-3 py-1.5 rounded-lg border-2 border-void text-xs font-mono font-bold text-void hover:bg-warning hover:shadow-neo hover:-translate-y-1 hover:-translate-x-1 transition-all bg-offwhite"
            >
              {chip}
            </button>
          ))}
        </div>
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="relative"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask MatchWise..."
            className="w-full bg-white border-2 border-void shadow-neo-sm text-void font-bold text-sm rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:shadow-neo focus:-translate-y-1 focus:-translate-x-1 font-mono transition-all"
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-void text-white border-2 border-void shadow-neo-sm hover:-translate-y-[60%] hover:-translate-x-1 hover:shadow-neo hover:bg-signal hover:text-void rounded transition-all disabled:opacity-50 disabled:pointer-events-none"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
