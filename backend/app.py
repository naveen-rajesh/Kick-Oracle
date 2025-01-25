import requests
from bs4 import BeautifulSoup
import pandas as pd
from datetime import datetime, timedelta
import time
import random

class FootballScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.base_url = 'https://www.flashscore.com'
        self.leagues = {
            'premier-league': {'url': 'premier-league/2-england', 'name': 'Premier League'},
            'la-liga': {'url': 'la-liga/7-spain', 'name': 'La Liga'},
            'bundesliga': {'url': 'bundesliga/30-germany', 'name': 'Bundesliga'},
            'serie-a': {'url': 'serie-a/13-italy', 'name': 'Serie A'},
            'ligue-1': {'url': 'ligue-1/34-france', 'name': 'Ligue 1'}
        }

    def fetch_league_data(self, league_url):
        """Helper function to fetch league data from the URL."""
        try:
            response = requests.get(league_url, headers=self.headers)
            if response.status_code != 200:
                raise Exception(f"Failed to fetch data from {league_url}, status code: {response.status_code}")
            return BeautifulSoup(response.text, 'html.parser')
        except Exception as e:
            print(f"Error fetching league data from {league_url}: {e}")
            return None

    def get_league_data(self, league_id, days_back=90):
        """Fetch and parse match data for a specific league."""
        matches = []
        if league_id not in self.leagues:
            print(f"Invalid league ID: {league_id}")
            return pd.DataFrame()

        url = f"{self.base_url}/football/{self.leagues[league_id]['url']}/results/"
        soup = self.fetch_league_data(url)
        if soup:
            match_elements = soup.find_all('div', class_='event__match')
            for match in match_elements:
                try:
                    date_str = match.find('div', class_='event__time').text.strip()
                    match_date = datetime.strptime(date_str, '%d.%m.%Y')

                    # Skip matches older than the specified 'days_back'
                    if datetime.now() - match_date > timedelta(days=days_back):
                        continue

                    home_team = match.find('div', class_='event__participant--home').text.strip()
                    away_team = match.find('div', class_='event__participant--away').text.strip()

                    score_parts = match.find('div', class_='event__scores').text.strip().split('-')
                    home_score = int(score_parts[0])
                    away_score = int(score_parts[1])

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

                except Exception as e:
                    print(f"Error parsing match: {e}")
                    continue

        return pd.DataFrame(matches)

    def get_league_teams(self, league_id):
        """Fetch and return unique teams from a league."""
        df = self.get_league_data(league_id)
        if df.empty:
            return []
        return sorted(list(set(df['home_team'].unique()) | set(df['away_team'].unique())))

# Example usage
if __name__ == '__main__':
    scraper = FootballScraper()
    league_id = 'premier-league'  # Example league
    data = scraper.get_league_data(league_id)
    print(data.head())  # Display the top rows of the fetched data
