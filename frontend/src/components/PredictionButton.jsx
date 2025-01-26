import React from 'react';

const PredictionButton = ({ handlePredict, selectedTeams, loading }) => (
  <button
    className={`w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50 ${loading ? 'cursor-not-allowed' : ''}`}
    onClick={handlePredict}
    disabled={!selectedTeams[0] || !selectedTeams[1] || loading}
  >
    {loading ? 'Predicting...' : 'Predict Match'}
  </button>
);

export default PredictionButton;