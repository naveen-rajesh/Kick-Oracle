import React, { useState } from 'react';
import PredictionForm from './components/PredictionForm';
import PredictionResult from './components/PredictionResult';
import { makePrediction } from './services/api';

const App = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePredict = async (matchData) => {
    try {
      const data = await makePrediction(matchData); // API call or prediction function
      setPrediction(data);
    } catch (error) {
      console.error('Error making prediction:', error);
      setPrediction({ error: 'Failed to make prediction. Please try again.' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Football Match Predictor</h1>
        <PredictionForm onPredict={handlePredict} />
        <PredictionResult prediction={prediction} />
      </div>
    </div>
  );
};

export default App;
