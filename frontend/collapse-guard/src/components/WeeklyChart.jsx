import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function WeeklyChart({ weeklyData }) {
  const formatted = weeklyData.map((week, index) => ({
    week: `Week ${index + 1}`,
    commits: week[0]
  }));

  return (
    <LineChart width={600} height={300} data={formatted}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="week" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="commits" />
    </LineChart>
  );
}