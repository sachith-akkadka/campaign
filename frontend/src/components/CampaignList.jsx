// src/components/CampaignList.jsx
import React from "react";
import CampaignCard from "./CampaignCard";

export default function CampaignList({ campaigns, onChanged }) {
  if(!campaigns || campaigns.length===0) return <div className="card">No campaigns yet.</div>;

  return (
    <div className="cards">
      {campaigns.map(c => <CampaignCard key={c._id} campaign={c} onChanged={onChanged} />)}
    </div>
  );
}
