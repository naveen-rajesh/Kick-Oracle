const API_BASE_URL = 'http://localhost:5000';

export const fetchLeagues = async () => {
  const response = await fetch(`${API_BASE_URL}/leagues`);
  if (!response.ok) throw new Error('Failed to fetch leagues');
  return response.json();
};

export const fetchTeams = async (leagueId) => {
  const response = await fetch(`${API_BASE_URL}/teams/${leagueId}`);
  if (!response.ok) throw new Error('Failed to fetch teams');
  return response.json();
};

export const makePrediction = async (matchData) => {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  });
  if (!response.ok) throw new Error('Failed to make prediction');
  return response.json();
};
