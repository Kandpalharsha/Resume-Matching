import ScoreChart from "../components/ScoreChart";
import SkillPieChart from "../components/SkillPieChart";
import SkillBarChart from "../components/SkillBarChart";
import Suggestions from "../components/Suggestions";
import SkillRadarChart from "../components/SkillRadarChart";

import { useNavigate } from "react-router-dom";

function Dashboard({ result }) {
  const navigate = useNavigate(); 

  return (
    <div className="dashboard">
      <div className="chart-card">
        <h2>Match Score</h2>
        <ScoreChart score={result.match_score} />
      </div>

      <div className="chart-card">
        <h2>Skill Distribution</h2>
        <SkillPieChart
          matched={result.matched_skills}
          missing={result.missing_skills}
        />
      </div>

      <div className="chart-card">
        <h2>Skill Radar</h2>
        <SkillRadarChart matched={result.matched_skills} />
      </div>

      <div className="chart-card">
        <h2>Missing Skills</h2>
        <SkillBarChart missing={result.missing_skills} />
      </div>

      <div className="chart-card suggestions-card">
        <h2>Suggestions</h2>

        <Suggestions suggestions={result.suggestions} />

        <button className="back-btn" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
