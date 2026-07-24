import React, { createContext, useContext, useState } from 'react';

const MatchContext = createContext();

export function MatchProvider({ children }) {
  const [matchData, setMatchData] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jdText, setJdText] = useState('');
  
  const resetMatch = () => {
    setMatchData(null);
    setResumeText('');
    setJdText('');
  };

  return (
    <MatchContext.Provider value={{ 
      matchData, setMatchData, 
      resumeText, setResumeText, 
      jdText, setJdText,
      resetMatch 
    }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  return useContext(MatchContext);
}
