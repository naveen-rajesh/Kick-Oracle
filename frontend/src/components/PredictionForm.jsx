import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import TeamSelector from './TeamSelector'; // Assuming you have a TeamSelector component

const teamsByLeague = {
  '1': [ // Premier League
    'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton', 'Chelsea', 
    'Crystal Palace', 'Everton', 'Fulham', 'Leicester City', 'Liverpool', 
    'Manchester City', 'Manchester Utd', 'Newcastle Ut', 'Nott\'ham Forest', 
    'Southampton', 'Tottenham', 'West Ham', 'Wolves'
  ],
  '2': [ // La Liga
    'Alavés', 'Athletic Bilbao', 'Atlético Madrid', 'Barcelona', 'Cádiz', 'Celta Vigo', 
    'Eibar', 'Elche', 'Espanyol', 'Getafe', 'Granada', 'Levante', 'Real Betis', 
    'Real Madrid', 'Real Sociedad', 'Sevilla', 'Valencia', 'Villarreal'
  ],
  '3': [ // Serie A
    'Atalanta', 'Bologna', 'Cagliari', 'Empoli', 'Fiorentina', 'Genoa', 'Inter Milan', 
    'Juventus', 'Lazio', 'Milan', 'Napoli', 'Roma', 'Salernitana', 'Sampdoria', 'Sassuolo', 
    'Spezia', 'Torino', 'Udinese'
  ],
  '4': [ // Bundesliga
    'Augsburg', 'Bayer Leverkusen', 'Bayern Munich', 'Borussia Dortmund', 'Borussia Mönchengladbach', 
    'Cologne', 'Eintracht Frankfurt', 'Freiburg', 'Hoffenheim', 'Mainz', 'RB Leipzig', 
    'Stuttgart', 'Wolfsburg'
  ]
};

const PredictionForm = ({ onPredict }) => {
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedTeam1, setSelectedTeam1] = useState('');
  const [selectedTeam2, setSelectedTeam2] = useState('');

  const handleLeagueChange = (leagueId) => {
    setSelectedLeague(leagueId);
    setSelectedTeam1(''); // Clear selected teams when league changes
    setSelectedTeam2('');
  };

  const handleTeam1Change = (team) => {
    setSelectedTeam1(team);
  };

  const handleTeam2Change = (team) => {
    setSelectedTeam2(team);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedTeam1 && selectedTeam2) {
      const matchData = {
        team1: selectedTeam1,
        team2: selectedTeam2,
      };
      onPredict(matchData);
    } else {
      alert("Please select both teams.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select League</label>
        <Select value={selectedLeague} onValueChange={handleLeagueChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select League" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Premier League</SelectItem>
            <SelectItem value="2">La Liga</SelectItem>
            <SelectItem value="3">Serie A</SelectItem>
            <SelectItem value="4">Bundesliga</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedLeague && (
        <>
          <TeamSelector
            label="Team 1"
            value={selectedTeam1}
            onValueChange={handleTeam1Change}
            teams={teamsByLeague[selectedLeague]}
          />
          <TeamSelector
            label="Team 2"
            value={selectedTeam2}
            onValueChange={handleTeam2Change}
            teams={teamsByLeague[selectedLeague]}
          />
        </>
      )}

      <button
        type="submit"
        className="w-full bg-black text-white py-1 px-400 rounded-lg hover:bg-gray-800"
        >
        Predict
      </button>
    </form>
  );
};

export default PredictionForm;
