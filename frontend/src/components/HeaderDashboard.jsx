// src/components/HeaderDashboard.jsx
import React, { useEffect, useState } from "react";

export default function HeaderDashboard({ onLogout }){
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="header">
      <div className="title">
        <div style={{fontSize:22}}>📊</div>
        <div>
          <h1 style={{margin:0}}>Campaign Tracker</h1>
          <div className="small">Manage campaigns — add / update / delete</div>
        </div>
      </div>

      <div className="header-actions">
        <button className="btn secondary" onClick={onLogout} title="Logout">Logout</button>
        <button
          className="btn"
          onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
          title="Toggle theme"
          style={{padding:'8px', width:42, height:38}}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </div>
  );
}
