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
        if league_id in self.predictors:
            return self.predictors[league_id]['teams']
        return []

    def predict(self, league_id, home_team, away_team):
        if league_id not in self.predictors:
            if not self.train_league(league_id):
                return {'error': 'League data not available'}
        
        predictor = self.predictors[league_id]['predictor']
        return predictor.predict(home_team, away_team)
