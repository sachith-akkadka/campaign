// src/services/api.js

const API_BASE = "https://campaign-tracker-theta.vercel.app/api";

async function handleResponse(res) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "API request failed");
  }
  return res.json();
}

// Fetch all campaigns
export async function getCampaigns(query = {}) {
  const params = new URLSearchParams(query).toString();
  const res = await fetch(`${API_BASE}/campaigns${params ? `?${params}` : ""}`);
  return handleResponse(res);
}

// Create a new campaign
export async function createCampaign(data) {
  const res = await fetch(`${API_BASE}/campaigns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

// Update campaign
export async function updateCampaign(id, updates) {
  const res = await fetch(`${API_BASE}/campaigns/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return handleResponse(res);
}

// Delete campaign
export async function deleteCampaign(id) {
  const res = await fetch(`${API_BASE}/campaigns/${id}`, { method: "DELETE" });
  return handleResponse(res);
}
