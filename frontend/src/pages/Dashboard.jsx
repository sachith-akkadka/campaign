// src/pages/Dashboard.jsx
import React, { useEffect, useState, useCallback } from "react";
import HeaderDashboard from "../components/HeaderDashboard";
import DashboardSummary from "../components/DashboardSummary";
import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import { getCampaigns } from "../services/api";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Dashboard(){
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load campaigns");
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const filtered = campaigns.filter(c =>
    c.campaignName.toLowerCase().includes(search.toLowerCase()) ||
    c.clientName.toLowerCase().includes(search.toLowerCase())
  );

  const logout = async () => {
    await signOut(auth);
    window.location.href = '/';
  };

  return (
    <div className="container">
      <HeaderDashboard onLogout={logout} />
      <DashboardSummary campaigns={campaigns} />

      <div style={{marginBottom:12}}>
        <input className="searchbox" placeholder="Search by campaign or client..." value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>

      <div className="grid">
        <div>
          {loading ? <div className="card">Loading...</div> : <CampaignList campaigns={filtered} onChanged={fetchAll} />}
        </div>

        <aside>
          <CampaignForm onAdded={fetchAll} />
        </aside>
      </div>
    </div>
  );
}
