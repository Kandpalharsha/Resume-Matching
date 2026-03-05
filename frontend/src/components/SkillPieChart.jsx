import { PieChart, Pie, Cell, Tooltip } from "recharts";

function SkillPieChart({ matched, missing }) {
  const data = [
    { name: "Matched", value: matched.length },
    { name: "Missing", value: missing.length },
  ];

  const COLORS = ["#10b981", "#ef4444"];

  return (
    <div className="chart-wrapper">
      <PieChart width={260} height={260}>
        <Pie data={data} dataKey="value" outerRadius={100}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>

      <div className="skills-section">
        <h4>Matched Skills</h4>

        <div className="skill-tags">
          {matched.map((skill) => (
            <span className="tag green" key={skill}>
              {skill}
            </span>
          ))}
        </div>

        <h4>Missing Skills</h4>

        <div className="skill-tags">
          {missing.map((skill) => (
            <span className="tag red" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkillPieChart;
