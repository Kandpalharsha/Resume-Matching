import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useMatch } from '../context/MatchContext';
import Chatbot from './Chatbot';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState(null);
  const { matchData, resumeText, jdText } = useMatch();

  // Listen for open-chat events from other components
  React.useEffect(() => {
    const handleOpenChat = (e) => {
      setIsOpen(true);
      if (e.detail?.item) {
        setInitialQuery(e.detail.item);
      }
    };
    window.addEventListener('open-chat', handleOpenChat);
    return () => window.removeEventListener('open-chat', handleOpenChat);
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full border-2 border-void shadow-neo hover:shadow-neo-hover hover:-translate-y-1 hover:-translate-x-1 transition-all flex items-center justify-center ${
          isOpen ? 'bg-void text-white' : 'bg-warning text-void'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Floating Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 z-50 w-[90vw] max-w-sm h-[600px] max-h-[75vh] flex flex-col rounded-2xl overflow-hidden animate-fade-in-up border-2 border-void shadow-neo bg-white">
          {matchData ? (
            <Chatbot 
              resumeText={resumeText} 
              jdText={jdText} 
              breakdown={matchData.breakdown} 
              extractedContext={matchData.extracted_context}
              initialQuery={initialQuery}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6 bg-offwhite">
              <div className="w-16 h-16 bg-warning border-2 border-void shadow-neo-sm rounded-xl flex items-center justify-center transform -rotate-6">
                <MessageSquare className="w-8 h-8 text-void" />
              </div>
              <div>
                <h3 className="font-space font-bold text-2xl text-void mb-2">Chat Locked</h3>
                <p className="font-mono text-sm text-graphite/80 leading-relaxed border-l-2 border-void pl-3 text-left">
                  Please run an analysis first to chat with your resume.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
