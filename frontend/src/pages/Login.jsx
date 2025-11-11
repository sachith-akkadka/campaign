// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login(){
  const [form, setForm] = useState({email:'', password:''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if(!form.email || !form.password){ setError("Please fill both email and password"); return; }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, form.email, form.password);
      nav('/dashboard');
    } catch (err) {
      console.error(err);
      if(err.code === 'auth/user-not-found') setError("No account found. Please sign up or use Google.");
      else if(err.code === 'auth/wrong-password') setError("Incorrect password. Try again or reset it.");
      else if(err.code === 'auth/invalid-email') setError("Invalid email format.");
      else setError("Failed to sign in. Try again.");
    } finally { setLoading(false); }
  };

  const google = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      nav('/dashboard');
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    } finally { setLoading(false); }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth:480, margin:'24px auto'}}>
        <h2 style={{marginTop:0}}>Sign in</h2>
        <form onSubmit={submit} style={{display:'grid', gap:10}}>
          <input name="email" placeholder="Email" value={form.email} onChange={change} />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={change} />
          {error && <div style={{color:'var(--danger)'}}>{error}</div>}
          <div style={{display:'flex', gap:8}}>
            <button className="btn" type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</button>
            <button type="button" className="btn secondary" onClick={() => { setForm({email:'',password:''}); setError(''); }}>Reset</button>
          </div>
        </form>

        <hr style={{margin:'18px 0'}}/>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={google}>Sign in with Google</button>
          <Link to="/signup" className="btn secondary" style={{alignSelf:'center', textDecoration:'none'}}>Create account</Link>
        </div>
      </div>
    </div>
  );
}
