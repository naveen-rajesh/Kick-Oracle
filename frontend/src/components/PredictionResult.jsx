import React from 'react';
import { Card, CardContent } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import TeamStats from './TeamStats';

const PredictionResult = ({ prediction }) => {
  if (!prediction) return null;

  if (prediction.error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{prediction.error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-4">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">Prediction Result</h3>
          <p className="text-lg">
            Predicted Winner: <span className="font-bold">{prediction.winner}</span>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Win Probability: {(prediction.probability * 100).toFixed(1)}%
          </p>
        </div>

        <div className="border-t pt-4">
          <TeamStats stats={prediction.home_team_stats} teamName="Home Team" />
          <TeamStats stats={prediction.away_team_stats} teamName="Away Team" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResult;