// src/components/CampaignCard.jsx
import React, { useState } from "react";
import { updateCampaign, deleteCampaign } from "../services/api";

export default function CampaignCard({ campaign, onChanged }) {
  const [busy, setBusy] = useState(false);

  const handleStatus = async (e) => {
    const status = e.target.value;
    try {
      setBusy(true);
      await updateCampaign(campaign._id, { status });
      onChanged && onChanged();
    } catch {
      alert("Failed to update status");
    } finally { setBusy(false); }
  };

  const handleDelete = async () => {
    if(!window.confirm("Delete this campaign?")) return;
    try {
      setBusy(true);
      await deleteCampaign(campaign._id);
      onChanged && onChanged();
    } catch {
      alert("Delete failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="campaign card">
      <div className="kicker small">{new Date(campaign.startDate).toLocaleDateString()}</div>
      <div style={{display:'flex', justifyContent:'space-between', gap:12}}>
        <div>
          <h3 style={{margin:'0 0 6px'}}>{campaign.campaignName}</h3>
          <div className="small">Client: {campaign.clientName}</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="small">Status</div>
          <select value={campaign.status} onChange={handleStatus} disabled={busy}>
            <option>Active</option>
            <option>Paused</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'flex-end', marginTop:8}}>
        <button className="btn danger" onClick={handleDelete} disabled={busy}>{busy ? '...' : 'Delete'}</button>
      </div>
    </div>
  );
}
