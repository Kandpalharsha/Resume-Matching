import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import PageTransition from '../components/PageTransition';
import { useMatch } from '../context/MatchContext';

export default function Chat() {
  const { matchData, resumeText, jdText } = useMatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!matchData) {
      navigate('/analyze');
    }
  }, [matchData, navigate]);

  if (!matchData) return null;

  return (
    <PageTransition>
      <div className="h-[80vh] flex flex-col pt-4">
        <div className="mb-4">
          <h1 className="text-3xl font-space font-bold tracking-tight text-offwhite">Talk to Your Resume</h1>
          <p className="text-gray-400 mt-2">Ask questions about your match, or generate tailored cover letter paragraphs and bullet points.</p>
        </div>
        <div className="flex-1 min-h-0 bg-void rounded-2xl shadow-2xl border border-gray-800 flex overflow-hidden">
          <Chatbot 
            resumeText={resumeText} 
            jdText={jdText} 
            breakdown={matchData.breakdown} 
            extractedContext={matchData.extracted_context}
          />
        </div>
      </div>
    </PageTransition>
  );
}
