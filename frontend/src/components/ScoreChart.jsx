import { PieChart, Pie, Cell } from "recharts";

function ScoreChart({ score }) {
  const data = [
    { name: "Matched", value: score },
    { name: "Remaining", value: 100 - score },
  ];

  const COLORS = ["#4CAF50", "#d1d5db"];

  return (
    <div className="chart-wrapper">
      <PieChart width={260} height={260}>
        <Pie
          data={data}
          dataKey="value"
          innerRadius={70}
          outerRadius={100}
          startAngle={90}
          endAngle={-270}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        {/* Score text inside donut */}

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fill: "white",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          {score}%
        </text>
      </PieChart>
    </div>
  );
}

export default ScoreChart;
