import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

app = Flask(__name__)
CORS(app)

LEAGUES = {
    '1': ('Premier League', 'https://fbref.com/en/comps/9/Premier-League-Stats'),
    '2': ('La Liga', 'https://fbref.com/en/comps/12/La-Liga-Stats'),
    '3': ('Serie A', 'https://fbref.com/en/comps/11/Serie-A-Stats'),
    '4': ('Bundesliga', 'https://fbref.com/en/comps/20/Bundesliga-Stats'),
    '5': ('Ligue 1', 'https://fbref.com/en/comps/13/Ligue-1-Stats')
}

class FootballPredictor:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.prepare_training_data()

    def prepare_training_data(self):
        # Simulated historical match data
        data = {
            'team_goals_scored': np.random.randint(0, 5, 1000),
            'team_goals_conceded': np.random.randint(0, 3, 1000),
            'opponent_goals_scored': np.random.randint(0, 5, 1000),
            'home_advantage': np.random.rand(1000),
            'team_ranking': np.random.randint(1, 20, 1000),
            'match_result': np.random.choice([0, 1], 1000)  # Binary outcome: 0 (loss/draw), 1 (win)
        }
        df = pd.DataFrame(data)
        
        X = df.drop('match_result', axis=1)
        y = df['match_result']
        
        X_scaled = self.scaler.fit_transform(X)
        X_train, _, y_train, _ = train_test_split(X_scaled, y, test_size=0.2, random_state=42)
        
        self.model.fit(X_train, y_train)

    def predict_match_outcome(self, team1_stats, team2_stats):
        # Prepare input features as a DataFrame with the same column names
        features = pd.DataFrame([{
            'team_goals_scored': team1_stats['goals_scored'],
            'team_goals_conceded': team1_stats['goals_conceded'],
            'opponent_goals_scored': team2_stats['goals_scored'],
            'home_advantage': team1_stats.get('home_advantage', 0.5),
            'team_ranking': team1_stats.get('ranking', 10)
        }])
        
        # Scale features
        features_scaled = self.scaler.transform(features)
        
        # Predict probability
        prediction = self.model.predict_proba(features_scaled)[0]
        return prediction[1]  # Probability of team1 winning

# Initialize predictor
predictor = FootballPredictor()

def scrape_league_teams(league_url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    }
    
    try:
        response = requests.get(league_url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        teams = []
        tables = soup.find_all('table')
        for table in tables:
            team_rows = table.find_all('tr')
            for row in team_rows:
                team_cell = row.find('td', {'data-stat': 'team'})
                if team_cell and team_cell.text.strip():
                    team_name = team_cell.text.strip()
                    if team_name not in teams:
                        teams.append(team_name)
        
        if not teams:
            potential_teams = soup.find_all(string=lambda text: 
                text and any(keyword in text for keyword in 
                ['FC', 'United', 'City', 'Real', 'Athletic', 'Atletico', 'Madrid', 'Barcelona']))
            teams = list(set(team.strip() for team in potential_teams if team.strip()))
        
        return teams
    
    except requests.RequestException:
        return []

@app.route('/api/teams', methods=['GET'])
def get_teams():
    league_url = request.args.get('league')
    teams = scrape_league_teams(league_url)
    return jsonify(teams)

@app.route('/api/predict', methods=['POST'])
def predict_match():
    # Simulate comprehensive team statistics
    team1_stats = {
        'goals_scored': np.random.randint(30, 70),
        'goals_conceded': np.random.randint(20, 50),
        'goal_difference': np.random.randint(-10, 30),
        'home_advantage': 0.6,
        'ranking': np.random.randint(1, 20),
        'win_rate': np.random.uniform(0.4, 0.7)
    }
    
    team2_stats = {
        'goals_scored': np.random.randint(30, 70),
        'goals_conceded': np.random.randint(20, 50),
        'goal_difference': np.random.randint(-10, 30),
        'home_advantage': 0.4,
        'ranking': np.random.randint(1, 20),
        'win_rate': np.random.uniform(0.4, 0.7)
    }
    
    # ML-powered prediction
    team1_win_prob = predictor.predict_match_outcome(team1_stats, team2_stats)
    team2_win_prob = 1 - team1_win_prob
    
    return jsonify({
        'team1Prob': team1_win_prob * 100,
        'team2Prob': team2_win_prob * 100,
        'team1Stats': team1_stats,
        'team2Stats': team2_stats
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), debug=True)