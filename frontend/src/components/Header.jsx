// src/components/Header.jsx
import React from "react";

export default function Header({ theme, toggleTheme }) {
  return (
    <div className="header">
      <div className="title">
        <div style={{fontSize:22}}>📊</div>
        <div>
          <h1>Campaign Tracker</h1>
          <div className="small">Manage campaigns — add / update / delete</div>
        </div>
      </div>

      <div className="header-actions">
        <button
          className="btn secondary"
          onClick={() => {
            // placeholder for potential view toggles
          }}
          title="No-op"
        >
          Export
        </button>
        <button className="btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
      </div>
    </div>
  );
}
