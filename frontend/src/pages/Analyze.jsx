import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadSection from '../components/UploadSection';
import PageTransition from '../components/PageTransition';
import { useMatch } from '../context/MatchContext';

export default function Analyze() {
  const navigate = useNavigate();
  const { setMatchData, setResumeText, setJdText } = useMatch();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async (resume, jd) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume_text: resume, jd_text: jd })
      });
      
      if (!response.ok) {
        throw new Error('Failed to match. Please check your backend.');
      }
      
      const data = await response.json();
      setMatchData(data);
      setResumeText(resume);
      setJdText(jd);
      
      navigate('/results');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <UploadSection onMatch={handleMatch} isLoading={isLoading} error={error} />
    </PageTransition>
  );
}
