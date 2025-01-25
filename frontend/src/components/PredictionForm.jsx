import React, { useState, useEffect } from 'react';
import { PredictionService } from '../services/api';
import TeamSelector from './TeamSelector';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';

const PredictionForm = ({ onPredict }) => {
  const [leagues, setLeagues] = useState([]);
  const [teams, setTeams] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedHomeTeam, setSelectedHomeTeam] = useState('');
  const [selectedAwayTeam, setSelectedAwayTeam] = useState('');

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leagueData = await PredictionService.getLeagues();
        setLeagues(leagueData);
      } catch (error) {
        console.error('Failed to fetch leagues', error);
      }
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchTeams = async () => {
      if (selectedLeague) {
        try {
          const teamData = await PredictionService.getTeams(selectedLeague);
          setTeams(teamData);
          setSelectedHomeTeam('');
          setSelectedAwayTeam('');
        } catch (error) {
          console.error('Failed to fetch teams', error);
        }
      }
    };
    fetchTeams();
  }, [selectedLeague]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedHomeTeam && selectedAwayTeam) {
      try {
        const prediction = await PredictionService.predictMatch({
          leagueId: selectedLeague,
          homeTeam: selectedHomeTeam,
          awayTeam: selectedAwayTeam
        });
        onPredict(prediction);
      } catch (error) {
        console.error('Prediction failed', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select League</label>
        <Select value={selectedLeague} onValueChange={setSelectedLeague}>
          <SelectTrigger>
            <SelectValue placeholder="Select League" />
          </SelectTrigger>
          <SelectContent>
            {leagues.map(league => (
              <SelectItem key={league.id} value={league.id}>
                {league.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedLeague && (
        <>
          <TeamSelector
            label="Home Team"
            value={selectedHomeTeam}
            onValueChange={setSelectedHomeTeam}
            teams={teams}
          />
          <TeamSelector
            label="Away Team"
            value={selectedAwayTeam}
            onValueChange={setSelectedAwayTeam}
            teams={teams.filter(team => team !== selectedHomeTeam)}
          />
        </>
      )}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        disabled={!selectedHomeTeam || !selectedAwayTeam}
      >
        Predict Match
      </button>
    </form>
  );
};

export default PredictionForm;
