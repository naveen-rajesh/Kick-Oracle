import React from 'react';

const LeagueSelector = ({ leagues, selectedLeague, setSelectedLeague }) => (
  <div>
    <label className="block text-lg font-semibold mb-2 text-gray-200">Select League</label>
    <select
      className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedLeague?.id || ''}
      onChange={(e) =>
        setSelectedLeague(leagues.find((league) => league.id === e.target.value))
      }
    >
      <option value="" className="bg-gray-700">Select a League</option>
      {leagues.map((league) => (
        <option key={league.id} value={league.id} className="bg-gray-700">
          {league.name}
        </option>
      ))}
    </select>
  </div>
);

export default LeagueSelector;