import React from 'react';

const TeamSelector = ({ teams, selectedTeam, setSelectedTeam, label }) => (
  <div>
    <label className="block text-lg font-semibold mb-2 text-gray-200">{label}</label>
    <select
      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedTeam?.id || ''}
      onChange={(e) =>
        setSelectedTeam(teams.find((team) => team.id === e.target.value))
      }
    >
      <option value="" className="bg-gray-700">Select a Team</option>
      {teams.length === 0 ? (
        <option disabled className="bg-gray-700">No teams available</option>
      ) : (
        teams.map((team) => (
          <option key={team.id} value={team.id} className="bg-gray-700">
            {team.name}
          </option>
        ))
      )}
    </select>
  </div>
);

export default TeamSelector;