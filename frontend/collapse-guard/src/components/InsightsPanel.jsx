export default function InsightsPanel({ insights }) {
  return (
    <div>
      <h3>Insights</h3>
      <ul>
        {insights.map((insight, i) => (
          <li key={i}>{insight}</li>
        ))}
      </ul>
    </div>
  );
}