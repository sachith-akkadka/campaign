import React from "react";

const DashboardSummary = ({ campaigns }) => {
  const counts = {
    Active: campaigns.filter(c => c.status === "Active").length,
    Paused: campaigns.filter(c => c.status === "Paused").length,
    Completed: campaigns.filter(c => c.status === "Completed").length,
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "20px",
      padding: "10px",
      background: "var(--card-bg)",
      borderRadius: "10px",
    }}>
      {Object.entries(counts).map(([key, val]) => (
        <div key={key}>
          <h3>{val}</h3>
          <p>{key}</p>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummary;
