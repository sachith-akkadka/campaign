import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // if user logs in/out navigate accordingly
  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Landing user={user} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard/*"
        element={<ProtectedRoute user={user}><Dashboard /></ProtectedRoute>}
      />
      <Route path="*" element={<Landing user={user} />} />
    </Routes>
  );
}

function ProtectedRoute({ user, children }) {
  // simple guard: redirect to login if not authenticated
  if (!user) {
    return <RequireLogin />;
  }
  return children;
}
function RequireLogin() {
  // small centered message + link to login
  return (
    <div style={{minHeight:"70vh", display:"grid", placeItems:"center"}}>
      <div style={{textAlign:"center"}}>
        <h2>You must sign in to view the dashboard</h2> //
        <a href="/login" className="btn" style={{textDecoration:'none'}}>Go to Login</a>
      </div>
    </div>
  );
}
