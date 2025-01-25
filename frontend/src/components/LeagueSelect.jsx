import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const LeagueSelect = ({ leagues, selectedLeague, onLeagueChange }) => {
  return (
    <Select value={selectedLeague} onValueChange={onLeagueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select League" />
      </SelectTrigger>
      <SelectContent>
        {leagues.map((league) => (
          <SelectItem key={league.id} value={league.id}>
            {league.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

// Example usage in a parent component
const ParentComponent = () => {
  const leagues = [
    { id: '1', name: 'Premier League' },
    { id: '2', name: 'La Liga' },
    { id: '3', name: 'Serie A' },
    { id: '4', name: 'Bundesliga' },
  ];

  const [selectedLeague, setSelectedLeague] = useState('');

  const handleLeagueChange = (value) => {
    setSelectedLeague(value);
  };

  return (
    <div>
      <h2>Select a League</h2>
      <LeagueSelect leagues={leagues} selectedLeague={selectedLeague} onLeagueChange={handleLeagueChange} />
      <p>Selected League ID: {selectedLeague}</p>
    </div>
  );
};

export default ParentComponent;
