import random
import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from flask_cors import CORS

class MatchPredictor:
    def __init__(self):
        self.model = None

    def train(self, match_data):
        print("Training model with match data...")
        self.model = {
            'home_advantage': match_data['home_win'].mean(),
            'total_matches': len(match_data)
        }

    def predict(self, home_team, away_team):
        if not self.model:
            return {'error': 'Model not trained'}
        
        home_win_prob = self.model['home_advantage']
        draw_prob = 0.25
        away_win_prob = 1 - home_win_prob - draw_prob

        return {
            'home_team': home_team,
            'away_team': away_team,
            'home_win': home_win_prob,
            'draw': draw_prob,
            'away_win': away_win_prob
        }

class FootballScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.base_url = 'https://www.flashscore.com'
        self.leagues = {
            '1': {'url': 'premier-league/2-england', 'name': 'Premier League'},
            '2': {'url': 'la-liga/7-spain', 'name': 'La Liga'},
            '3': {'url': 'serie-a/13-italy', 'name': 'Serie A'},
            '4': {'url': 'bundesliga/30-germany', 'name': 'Bundesliga'}
        }

    def get_league_data(self, league_id, days_back=90):
        matches = []
        if league_id not in self.leagues:
            print(f"Invalid league ID: {league_id}")
            return pd.DataFrame()

        # Mock data generation
        teams = self.get_league_teams(league_id)
        for _ in range(50):
            home_team = random.choice(teams)
            away_team = random.choice([t for t in teams if t != home_team])
            match_date = datetime.now() - timedelta(days=random.randint(1, days_back))
            home_score = random.randint(0, 3)
            away_score = random.randint(0, 3)
            matches.append({
                'date': match_date,
                'league': league_id,
                'league_name': self.leagues[league_id]['name'],
                'home_team': home_team,
                'away_team': away_team,
                'home_score': home_score,
                'away_score': away_score,
                'home_win': 1 if home_score > away_score else 0
            })
        return pd.DataFrame(matches)

    def get_league_teams(self, league_id):
        teams_map = {
            '1': [ # Premier League
                'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton', 
                'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Liverpool',
                'Manchester City', 'Manchester Utd', 'Newcastle Ut', 
                'Tottenham', 'West Ham'
            ],
            '2': [ # La Liga
                'Atletico Madrid', 'Barcelona', 'Real Madrid', 
                'Sevilla', 'Real Sociedad', 'Valencia'
            ],
            '3': [ # Serie A
                'Juventus', 'Inter Milan', 'AC Milan', 'Napoli', 
                'Roma', 'Lazio'
            ],
            '4': [ # Bundesliga
                'Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 
                'Bayer Leverkusen', 'Wolfsburg'
            ]
        }
        return teams_map.get(league_id, [])

class LeaguePredictor:
    def __init__(self):
        self.predictors = {}
        self.scraper = FootballScraper()
    
    def train_league(self, league_id):
        match_data = self.scraper.get_league_data(league_id)
        if not match_data.empty:
            predictor = MatchPredictor()
            predictor.train(match_data)
            self.predictors[league_id] = {
                'predictor': predictor,
                'teams': self.scraper.get_league_teams(league_id)
            }
            return True
        return False

    def get_leagues(self):
        return [
            {'id': k, 'name': v['name']} 
            for k, v in self.scraper.leagues.items()
        ]

    def get_teams(self, league_id):
        if league_id not in self.predictors:
            self.train_league(league_id)
        return self.predictors.get(league_id, {}).get('teams', [])

    def predict(self, league_id, home_team, away_team):
        if league_id not in self.predictors:
            if not self.train_league(league_id):
                return {'error': 'League data not available'}
        
        predictor = self.predictors[league_id]['predictor']
        prediction = predictor.predict(home_team, away_team)
        
        # Add supplementary stats
        prediction.update({
            'home_goals_avg': random.uniform(1.0, 3.0),
            'home_conceded_avg': random.uniform(0.5, 2.0),
            'home_win_rate': prediction['home_win'],
            'away_goals_avg': random.uniform(1.0, 3.0),
            'away_conceded_avg': random.uniform(0.5, 2.0),
            'away_win_rate': prediction['away_win']
        })
        
        return prediction

# Flask Application
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

predictor = LeaguePredictor()

@app.route('/api/predict', methods=['POST'])
def predict_match():
    data = request.json
    league_id = data.get('leagueId')
    home_team = data.get('homeTeam')
    away_team = data.get('awayTeam')

    try:
        prediction = predictor.predict(league_id, home_team, away_team)
        return jsonify(prediction)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/leagues', methods=['GET'])
def get_leagues():
    return jsonify(predictor.get_leagues())

@app.route('/api/teams/<league_id>', methods=['GET'])
def get_teams(league_id):
    return jsonify(predictor.get_teams(league_id))

if __name__ == '__main__':
    app.run(debug=True, port=5000)
