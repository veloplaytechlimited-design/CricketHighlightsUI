const API_BASE = "https://1ee25a17-2143-4567-be72-2acca84e752a.mock.pstmn.io"; 
// Replace with your Postman mock server base URL

export async function createMatch(payload) {
  const response = await fetch(`${API_BASE}/matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to create match");
  }

  return response.json();
}

export async function getMatchStatus(matchId) {
  const response = await fetch(
    `${API_BASE}/matches/${matchId}/status`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch status");
  }

  return response.json();
}

export async function getClips(matchId) {
  const response = await fetch(
    `${API_BASE}/matches/${matchId}/clips`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch clips");
  }

  return response.json();
}
