import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import PageTransition from '../components/PageTransition';
import { useMatch } from '../context/MatchContext';

export default function Results() {
  const { matchData } = useMatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!matchData) {
      navigate('/analyze');
    }
  }, [matchData, navigate]);

  if (!matchData) return null;

  return (
    <PageTransition>
      <div className="space-y-16">
        <Dashboard data={matchData} />
      </div>
    </PageTransition>
  );
}
