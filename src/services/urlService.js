const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createShortUrl(payload) {
  const res = await fetch(`${API_BASE_URL}/api/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create short URL");
  }

  return data;
}

export async function getAllUrls() {
  const res = await fetch(`${API_BASE_URL}/api/urls`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch URLs");
  }

  return data;
}

export async function getUrlAnalytics(shortId) {
  const res = await fetch(`${API_BASE_URL}/api/analytics/${shortId}`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch analytics");
  }

  return data;
}