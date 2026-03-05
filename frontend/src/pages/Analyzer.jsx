import { useState } from "react";

import UploadResume from "../components/UploadResume";
import JobInput from "../components/JobInput";
import Dashboard from "./Dashboard";
import { analyzeResume } from "../services/api";

function Analyzer() {
  const [file, setFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file || !jobText) {
      alert("Please upload resume and paste job description");
      return;
    }

    setLoading(true);

    try {
      const data = await analyzeResume(file, jobText);

      setResult(data);
    } catch (error) {
      console.error("Analysis failed", error);
      alert("Something went wrong during analysis");
    }

    setLoading(false);
  };

  return (
    <div className="analyzer-container">
      <div className="analyzer-card">
        <h2>Smart Resume Analysis</h2>

        <p>
          Upload your resume and compare it with job requirements to evaluate
          your match score and skill gaps.
        </p>

        <UploadResume setFile={setFile} />

        <JobInput jobText={jobText} setJobText={setJobText} />

        <button className="analyze-btn" onClick={handleAnalyze}>
          Analyze Resume
        </button>
      </div>

      {/* Loading Animation */}

      {loading && (
        <div className="loader">
          <div className="spinner"></div>

          <p>Analyzing Resume with AI...</p>
        </div>
      )}

      {/* Dashboard Results */}

      {result && !loading && <Dashboard result={result} />}
    </div>
  );
}

export default Analyzer;
