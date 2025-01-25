// App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async (matchData) => {
    try {
      const response = await axios.post('/api/predict', {
        league_id: '1', // Premier League
        home_team: matchData.team1,
        away_team: matchData.team2
      });

      setPrediction({
        winner: response.data.home_win > response.data.away_win 
          ? matchData.team1 
          : matchData.team2,
        probability: Math.max(response.data.home_win, response.data.away_win),
        home_team_stats: {
          avg_goals_scored: response.data.home_goals_avg,
          avg_goals_conceded: response.data.home_conceded_avg,
          win_rate: response.data.home_win_rate
        },
        away_team_stats: {
          avg_goals_scored: response.data.away_goals_avg,
          avg_goals_conceded: response.data.away_conceded_avg,
          win_rate: response.data.away_win_rate
        }
      });
      setError(null);
    } catch (err) {
      setError('Prediction failed. Please try again.');
      setPrediction(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Football Match Predictor</CardTitle>
        </CardHeader>
        <CardContent>
          <PredictionForm onPredict={handlePredict} />
          {prediction && <PredictionResult prediction={prediction} />}
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
