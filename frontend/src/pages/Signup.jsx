// src/pages/Signup.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Signup(){
  const [form, setForm] = useState({email:'', password:'', password2:''});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if(!form.email || !form.password){ setError('Please fill email & password'); return; }
    if(form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
    if(form.password !== form.password2) { setError('Passwords do not match'); return; }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, form.email, form.password);
      nav('/dashboard');
    } catch (err) {
      console.error(err);
      if(err.code === 'auth/email-already-in-use') setError('Email already used. Try signing in.');
      else if(err.code === 'auth/invalid-email') setError('Invalid email.');
      else setError('Failed to sign up. Try again.');
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
        <h2 style={{marginTop:0}}>Create account</h2>
        <form onSubmit={submit} style={{display:'grid', gap:10}}>
          <input name="email" placeholder="Email" value={form.email} onChange={change} />
          <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={change} />
          <input name="password2" type="password" placeholder="Confirm password" value={form.password2} onChange={change} />
          {error && <div style={{color:'var(--danger)'}}>{error}</div>}
          <div style={{display:'flex', gap:8}}>
            <button className="btn" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
            <button type="button" className="btn secondary" onClick={() => setForm({email:'',password:'',password2:''})}>Reset</button>
          </div>
        </form>

        <hr style={{margin:'18px 0'}}/>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" onClick={google}>Continue with Google</button>
          <Link to="/login" className="btn secondary" style={{alignSelf:'center', textDecoration:'none'}}>Already have an account?</Link>
        </div>
      </div>
    </div>
  );
}
