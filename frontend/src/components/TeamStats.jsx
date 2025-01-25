import React from 'react';
import { Card, CardContent } from "../ui/card";

const TeamStats = ({ stats, teamName }) => {
  if (!stats) return null;

  return (
    <div className="mt-4">
      <h4 className="font-semibold text-lg mb-2">{teamName} Statistics</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Avg. Goals Scored</p>
          <p className="font-medium">{stats.avg_goals_scored.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg. Goals Conceded</p>
          <p className="font-medium">{stats.avg_goals_conceded.toFixed(2)}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-gray-600">Win Rate</p>
          <p className="font-medium">{(stats.win_rate * 100).toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default TeamStats;