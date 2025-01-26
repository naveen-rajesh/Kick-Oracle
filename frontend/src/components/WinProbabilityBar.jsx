import React from 'react';

const WinProbabilityBar = ({ team1Name, team2Name, team1Prob, team2Prob }) => {
  const team1Width = Math.round((team1Prob / (team1Prob + team2Prob)) * 100);
  const team2Width = 100 - team1Width;

  return (
    <div className="w-full p-6 space-y-4">
      <h3 className="text-xl font-bold text-center text-gray-300">Win Probability</h3>
      <div className="flex justify-between text-gray-400 font-medium">
        <span>{team1Name}: {team1Width}%</span>
        <span>{team2Name}: {team2Width}%</span>
      </div>
      <div className="flex w-full h-8 bg-gray-600 rounded-lg overflow-hidden">
        <div
          className="bg-blue-500 h-full"
          style={{ width: `${team1Width}%` }}
          title={`${team1Name}: ${team1Width}%`}
        ></div>
        <div
          className="bg-red-500 h-full"
          style={{ width: `${team2Width}%` }}
          title={`${team2Name}: ${team2Width}%`}
        ></div>
      </div>
    </div>
  );
};

export default WinProbabilityBar;
