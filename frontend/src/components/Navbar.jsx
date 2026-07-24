import React, { useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useMatch } from '../context/MatchContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { matchData } = useMatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkClass = (path) => {
    const isActive = location.pathname === path;
    const isLocked = (path === '/results' || path === '/chat') && !matchData;

    if (isLocked) return 'text-gray-400 cursor-not-allowed opacity-50';
    if (isActive) return 'text-signal font-bold';
    return 'hover:text-signal transition-colors';
  };

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 flex items-center justify-center w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] lg:w-[calc(100%-6rem)] max-w-[1400px] transition-all duration-300 bg-white border-2 border-void shadow-neo ${
      scrolled ? '-translate-y-1 shadow-neo-hover' : ''
    }`}>
      <div className="flex items-center gap-6 font-space text-sm font-bold uppercase tracking-wider">
        <Link to="/analyze" className={navLinkClass('/analyze')}>Analyze</Link>
        {matchData ? (
          <Link to="/results" className={navLinkClass('/results')}>Results</Link>
        ) : (
          <span className={navLinkClass('/results')}>Results</span>
        )}
      </div>

      {location.pathname !== '/' && (
        <div className="absolute right-6">
          <button onClick={() => navigate('/')} className="btn-secondary text-sm px-4 py-2 transform rotate-1">
            Back to Home
          </button>
        </div>
      )}
    </nav>
  );
}
