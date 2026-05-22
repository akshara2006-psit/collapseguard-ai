function Card({ title, value, color, icon, small }) {
  return (
    <div className="card hover">
      <div style={{ fontSize: "22px", marginBottom: "8px" }}>
        {icon}
      </div>

      <h4 style={{ opacity: 0.7 }}>{title}</h4>

      <h1
        style={{
          color,
          fontSize: small ? "20px" : "32px",
          wordBreak: "break-word",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default Card;