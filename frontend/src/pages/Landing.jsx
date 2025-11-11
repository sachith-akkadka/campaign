// src/pages/Landing.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing({ user }) {
  const navigate = useNavigate();
  return (
    <div className="container">
      <header className="header landing">
        <div className="title">
          <div style={{fontSize:28}}>📊</div>
          <div>
            <h1 style={{margin:0}}>Campaign Tracker</h1>
            <div className="small">Track marketing campaigns — add, update, delete, and monitor status in real-time</div>
          </div>
        </div>

        <div style={{display:"flex", gap:8}}>
          {user ? (
            <>
              <button className="btn" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn" style={{textDecoration:'none'}}>Login</Link>
              <Link to="/signup" className="btn secondary" style={{textDecoration:'none'}}>Signup</Link>
            </>
          )}
        </div>
      </header>

      <main style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:24}}>
        <section style={{alignSelf:'center'}}>
          <div style={{fontSize:18, marginBottom:12}}>What's this?</div>
          <h2 style={{marginTop:0}}>A simple, beautiful Campaign Tracker</h2>
          <p style={{color:'var(--muted)', lineHeight:1.6}}>
            Add campaigns with name, client and start date. Update their status inline and remove campaigns when done.
            The app stores data on the backend and uses Firebase for user authentication (email/password + Google).
          </p>

          <div style={{marginTop:18, display:'flex', gap:12}}>
            <Link to={user ? "/dashboard" : "/signup"} className="btn" style={{textDecoration:'none'}}>Get Started</Link>
            <Link to="/login" className="btn secondary" style={{textDecoration:'none'}}>Sign in</Link>
          </div>
        </section>

        <aside className="card">
          <h3 style={{marginTop:0}}>Why use it?</h3>
          <ul style={{color:'var(--muted)'}}>
            <li>Clear campaign listing with inline status edits</li>
            <li>Search & filter campaigns</li>
            <li>Responsive design and dark/light mode</li>
          </ul>
          <div style={{height:12}}></div>
          <div style={{fontSize:13, color:'var(--muted)'}}>Tip: Signup to save your campaigns and access the dashboard.</div>
        </aside>
      </main>
    </div>
  );
}
