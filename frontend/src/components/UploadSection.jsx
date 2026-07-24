import React, { useState } from 'react';
import { UploadCloud, FileText, Loader2 } from 'lucide-react';

export default function UploadSection({ onMatch, isLoading, error }) {
  const [resumeFile, setResumeFile] = useState(null);
  const [jdText, setJdText] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setResumeFile(file);
      setUploadError('');
    } else {
      setResumeFile(null);
      setUploadError('Please upload a valid PDF file.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setUploadError('Resume is required.');
      return;
    }
    if (!jdText.trim()) {
      setUploadError('Job Description is required.');
      return;
    }
    
    try {
      setUploadError('');
      const formData = new FormData();
      formData.append('file', resumeFile);
      
      const resumeRes = await fetch('http://localhost:5000/api/upload-resume', {
        method: 'POST',
        body: formData
      });
      if (!resumeRes.ok) throw new Error('Failed to parse Resume PDF. Ensure backend is running.');
      const resumeData = await resumeRes.json();
      
      onMatch(resumeData.resume_text, jdText);
    } catch (err) {
      setUploadError(err.message);
    }
  };

  return (
    <section className="bg-white text-void rounded-2xl p-8 md:p-12 shadow-neo relative overflow-hidden border-2 border-void transform -rotate-1">
      <div className="absolute inset-0 bg-warning/5 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="font-space text-3xl font-bold bg-warning inline-block px-2 border-2 border-void shadow-neo-sm transform rotate-1">1. Upload Resume</h2>
          <div className="border-2 border-dashed border-void rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-warning/10 transition-colors bg-offwhite shadow-neo-sm group cursor-pointer hover:shadow-neo hover:-translate-y-1 hover:-translate-x-1 duration-200">
            <UploadCloud className="w-10 h-10 text-void mb-4 group-hover:scale-110 transition-transform" />
            <p className="font-mono text-sm mb-2 font-bold text-void">Drag & drop your PDF here</p>
            <p className="text-xs text-graphite/60 mb-6 font-bold">Max file size 5MB</p>
            <label className="btn-secondary cursor-pointer">
              Browse Files
              <input type="file" accept=".pdf" className="hidden" onChange={handleFileChange} />
            </label>
            {resumeFile && <p className="mt-4 font-mono text-signal text-sm bg-void px-2 py-1 rounded shadow-neo-sm">{resumeFile.name}</p>}
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <h2 className="font-space text-3xl font-bold bg-signal inline-block px-2 border-2 border-void shadow-neo-sm transform -rotate-1">2. Paste JD</h2>
          <div className="h-full min-h-[250px]">
            <textarea 
              className="w-full h-full min-h-[250px] bg-offwhite border-2 border-void shadow-neo-sm rounded-xl p-4 font-mono text-sm focus:outline-none focus:shadow-neo focus:-translate-y-1 focus:-translate-x-1 resize-none transition-all duration-200"
              placeholder="Paste the target job description here..."
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mt-12 flex flex-col items-center">
        {(error || uploadError) && (
          <p className="text-red-600 font-mono text-sm mb-4 bg-red-100 border-2 border-red-600 px-4 py-2 shadow-neo-sm font-bold transform rotate-1">{error || uploadError}</p>
        )}
        <button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className={`btn-primary w-full md:w-auto md:px-16 md:py-4 text-lg transform rotate-1 hover:rotate-0 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2"><Loader2 className="animate-spin w-5 h-5" /> Processing...</span>
          ) : (
            'Run Deep Match'
          )}
        </button>
      </div>
    </section>
  );
}
