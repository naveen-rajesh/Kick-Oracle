import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const PredictionService = {
  async predictMatch(matchData) {
    try {
      const response = await axios.post(`${BASE_URL}/predict`, matchData);
      return response.data;
    } catch (error) {
      console.error('Prediction error:', error);
      throw error;
    }
  },

  async getLeagues() {
    const response = await axios.get(`${BASE_URL}/leagues`);
    return response.data;
  },

  async getTeams(leagueId) {
    const response = await axios.get(`${BASE_URL}/teams/${leagueId}`);
    return response.data;
  }
};
