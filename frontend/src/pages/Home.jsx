function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>AI Resume Intelligence Platform</h1>

        <p>
          Analyze your resume against job descriptions using AI. Get skill
          insights, match score, and improvement suggestions to land your dream
          tech job.
        </p>
        <a href="/analyzer" className="start-btn">
          Start Resume Analysis
        </a>
      </div>
          <div className="features">
        <h2>Platform Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI Skill Matching</h3>
            <p>
              Detects relevant technical skills using NLP and semantic
              similarity.
            </p>
          </div>

          <div className="feature-card">
            <h3>Resume Match Score</h3>
            <p>
              Calculate compatibility between your resume and job requirements.
            </p>
          </div>

          <div className="feature-card">
            <h3>Skill Gap Analysis</h3>
            <p>Identify missing technologies required for the role.</p>
          </div>

          <div className="feature-card">
            <h3>Data Visualization</h3>
            <p>Visual analytics dashboard with charts and skill radar.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
