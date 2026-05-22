export default function BurnoutGauge({ score }) {
  const color =
    score < 40 ? "green" :
    score < 70 ? "orange" :
    "red";

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Burnout Score</h2>
      <div style={{
        fontSize: "48px",
        fontWeight: "bold",
        color
      }}>
        {score}
      </div>
    </div>
  );
}