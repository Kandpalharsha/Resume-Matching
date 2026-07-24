import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MatchProvider } from './context/MatchContext';
import Navbar from './components/Navbar';
import FloatingChat from './components/FloatingChat';
import Landing from './pages/Landing';
import Analyze from './pages/Analyze';
import Results from './pages/Results';

function App() {
  return (
    <MatchProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-offwhite text-graphite font-space selection:bg-signal selection:text-void">
          <Navbar />
          <FloatingChat />
          <main className="w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-12 pt-24 pb-16">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/analyze" element={<Analyze />} />
              <Route path="/results" element={<Results />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MatchProvider>
  );
}

export default App;
