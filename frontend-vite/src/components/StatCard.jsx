import React from 'react';

const StatCard = ({ teamName, stats }) => (
  <div className="w-full md:w-1/3 bg-gray-800 border border-gray-600 rounded-lg p-4 shadow-md text-gray-200">
    <h3 className="text-2xl font-bold text-white-400 text-center mb-4">{teamName}</h3>
    <ul className="space-y-2">
      <li className="flex justify-between">
        <span className="font-medium">Goals Scored:</span>
        <span>{stats.goals_scored}</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Goals Conceded:</span>
        <span>{stats.goals_conceded}</span>
      </li>
      <li className="flex justify-between">
        <span className="font-medium">Goal Difference:</span>
        <span>{stats.goal_difference}</span>
      </li>
    </ul>
  </div>
);

export default StatCard;