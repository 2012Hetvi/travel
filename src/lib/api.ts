const API_BASE = import.meta.env.VITE_API_URL || 'https://wenderlust-api.onrender.com';

export const fetchDestinations = () =>
  fetch(`${API_BASE}/api/destinations`).then(r => r.json());

export const fetchDestinationDetails = (id: number) =>
  fetch(`${API_BASE}/api/destinations/${id}/details`).then(r => r.json());