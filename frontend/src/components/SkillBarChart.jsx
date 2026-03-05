import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

function SkillBarChart({ missing }) {
  const data = missing.map((skill) => ({
    skill: skill,
    value: 1,
  }));

  return (
    <div className="chart-wrapper">
      <BarChart
        width={320}
        height={250}
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="skill" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="value" fill="#ef4444" />
      </BarChart>
    </div>
  );
}

export default SkillBarChart;
