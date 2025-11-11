// src/components/CampaignForm.jsx
import React, { useState } from "react";
import { createCampaign } from "../services/api";

export default function CampaignForm({ onAdded }) {
  const [form, setForm] = useState({campaignName:'', clientName:'', startDate:'', status:'Active'});
  const [loading, setLoading] = useState(false);

  const change = e => setForm({...form, [e.target.name]: e.target.value});

  const submit = async (e) => {
    e.preventDefault();
    if(!form.campaignName || !form.clientName || !form.startDate) { alert("Fill required fields"); return; }
    try {
      setLoading(true);
      await createCampaign(form);
      setForm({campaignName:'', clientName:'', startDate:'', status:'Active'});
      onAdded && onAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to add campaign");
    } finally { setLoading(false); }
  };

  return (
    <div className="card">
      <h3 style={{marginTop:0}}>Add Campaign</h3>
      <form onSubmit={submit} style={{display:'grid', gap:10}}>
        <input name="campaignName" placeholder="Campaign Name" value={form.campaignName} onChange={change} />
        <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={change} />
        <input type="date" name="startDate" value={form.startDate} onChange={change} />
        <select name="status" value={form.status} onChange={change}>
          <option>Active</option>
          <option>Paused</option>
          <option>Completed</option>
        </select>
        <div style={{display:'flex', gap:8}}>
          <button className="btn" type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add'}</button>
          <button type="button" className="btn secondary" onClick={()=>setForm({campaignName:'', clientName:'', startDate:'', status:'Active'})}>Reset</button>
        </div>
      </form>
    </div>
  );
}
