import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const PredictionService = {
  // Updated function to handle team stats instead of match predictions
  async fetchTeamStats(matchData) {
    try {
      const response = await axios.post(
        `${BASE_URL}/predict`,
        matchData,
        {
          headers: {
            'Content-Type': 'application/json', // Explicitly set
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching team stats:', error);
      throw error;
    }
  },

  async getLeagues() {
    try {
      const response = await axios.get(`${BASE_URL}/leagues`);
      return response.data;
    } catch (error) {
      console.error('Error fetching leagues:', error);
      throw error;
    }
  },

  async getTeams(leagueId) {
    try {
      const response = await axios.get(`${BASE_URL}/teams/${leagueId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching teams:', error);
      throw error;
    }
  },
};
