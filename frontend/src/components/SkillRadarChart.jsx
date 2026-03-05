import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

import skillsDB from "../data/skillsDB";

function SkillRadarChart({ matched }) {
  const categories = {
    Frontend: 0,
    Backend: 0,
    Database: 0,
    DevOps: 0,
    AI: 0,
  };

  matched.forEach((skill) => {
    const category = skillsDB[skill.toLowerCase()];

    if (category) {
      categories[category] += 1;
    }
  });

  const data = Object.keys(categories).map((cat) => ({
    category: cat,
    value: categories[cat],
  }));

  return (
    <div className="chart-wrapper">
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="70%"
        width={320}
        height={280}
        data={data}
      >
        <PolarGrid />

        <PolarAngleAxis dataKey="category" />

        <PolarRadiusAxis />

        <Radar
          dataKey="value"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.6}
        />
      </RadarChart>
    </div>
  );
}

export default SkillRadarChart;
