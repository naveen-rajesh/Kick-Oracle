import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeagueSelector from './components/LeagueSelector';
import TeamSelector from './components/TeamSelector';
import Loader from './components/loading';
import WinProbabilityBar from './components/WinProbabilityBar';
import StatCard from './components/StatCard'; // Import StatCard

const leagues = [
  { id: '1', name: 'Premier League', url: 'https://fbref.com/en/comps/9/Premier-League-Stats' },
  { id: '2', name: 'La Liga', url: 'https://fbref.com/en/comps/12/La-Liga-Stats' },
  { id: '3', name: 'Serie A', url: 'https://fbref.com/en/comps/11/Serie-A-Stats' },
  { id: '4', name: 'Bundesliga', url: 'https://fbref.com/en/comps/20/Bundesliga-Stats' },
  { id: '5', name: 'Ligue 1', url: 'https://fbref.com/en/comps/13/Ligue-1-Stats' },
];

const App = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState({ team1: null, team2: null });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch teams when the league changes
  useEffect(() => {
    const fetchTeams = async () => {
      if (selectedLeague) {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:5000/api/teams?league=${encodeURIComponent(selectedLeague.url)}`
          );
          setTeams(
            response.data.map((team, index) => ({
              id: String(index + 1),
              name: team,
            }))
          );
        } catch (error) {
          console.error('Error fetching teams:', error);
          setTeams([]);
        } finally {
          setLoading(false);
        }
      } else {
        setTeams([]);
      }
    };
    fetchTeams();
  }, [selectedLeague]);

  const handlePredict = async () => {
    if (!selectedTeams.team1 || !selectedTeams.team2) {
      alert('Please select both teams for prediction!');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:5000/api/predict', {
        team1: selectedTeams.team1,
        team2: selectedTeams.team2,
      });
      setPrediction(response.data);
    } catch (error) {
      console.error('Prediction error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-gray-800 shadow-xl rounded-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-white-500">Football Match Predictor</h1>

        {loading && <Loader />}

        <div className="space-y-6">
          <LeagueSelector
            leagues={leagues}
            selectedLeague={selectedLeague}
            setSelectedLeague={setSelectedLeague}
          />
          {selectedLeague && (
            <div className="space-y-4">
              <TeamSelector
                teams={teams}
                selectedTeam={selectedTeams.team1}
                setSelectedTeam={(team) =>
                  setSelectedTeams((prev) => ({ ...prev, team1: team }))
                }
                label="Select First Team"
              />
              <TeamSelector
                teams={teams}
                selectedTeam={selectedTeams.team2}
                setSelectedTeam={(team) =>
                  setSelectedTeams((prev) => ({ ...prev, team2: team }))
                }
                label="Select Second Team"
              />
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePredict}
  className="px-6 py-2 rounded bg-black text-white font-bold transition duration-300 hover:bg-white hover:text-black "
          >
            Predict Match
          </button>
        </div>

        {prediction && (
          <div className="space-y-8">
            {/* Stat Cards */}
            <div className="flex flex-col md:flex-row justify-around items-center space-y-4 md:space-y-0">
              <StatCard
                teamName={selectedTeams.team1.name}
                stats={{
                  goals_scored: prediction.team1Stats.goals_scored,
                  goals_conceded: prediction.team1Stats.goals_conceded,
                  goal_difference: prediction.team1Stats.goal_difference,
                }}
              />
              <StatCard
                teamName={selectedTeams.team2.name}
                stats={{
                  goals_scored: prediction.team2Stats.goals_scored,
                  goals_conceded: prediction.team2Stats.goals_conceded,
                  goal_difference: prediction.team2Stats.goal_difference,
                }}
              />
            </div>

            {/* Win Probability Bar */}
            <WinProbabilityBar
              team1Name={selectedTeams.team1.name}
              team2Name={selectedTeams.team2.name}
              team1Prob={prediction.team1Prob}
              team2Prob={prediction.team2Prob}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
