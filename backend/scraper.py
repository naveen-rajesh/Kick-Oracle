import requests
from bs4 import BeautifulSoup

# Function to scrape key stats for a team
def scrape_team_stats(league_url, team_name):
    try:
        response = requests.get(league_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')

        # Debug: Print part of the page to see if it contains the data we expect
        print(f"Scraping stats for {team_name} from {league_url}")

        # Find the relevant table for team statistics (update this if necessary)
        table = soup.find('table', {'class': 'stats_table'})  # Assuming table class
        if not table:
            print("No stats table found.")
            return None
        
        rows = table.find_all('tr')

        team_stats = {}
        
        for row in rows:
            cols = row.find_all('td')
            
            # Check if this row corresponds to the selected team
            if team_name.lower() in row.text.lower():
                team_stats['team_name'] = team_name
                
                # Extract the relevant stats
                team_stats['goals_scored'] = cols[7].text.strip()  # Example for Goals Scored
                team_stats['goals_conceded'] = cols[8].text.strip()  # Goals Conceded
                
                # Extract xG and count the occurrences of 'W' (wins)
                xG_string = cols[14].text.strip()  # Expected Goals column
                team_stats['xG_wins_count'] = xG_string.count('W')  # Count 'W' for wins
                
                team_stats['shots_on_target'] = cols[16].text.strip()  # Shots on Target
                return team_stats
        return None
    except Exception as e:
        print(f"Error scraping stats for {team_name}: {e}")
        return None


# Function to scrape stats for two teams
def scrape_two_teams_stats(league_url, team1_name, team2_name):
    print(f"Starting scrape for {team1_name} and {team2_name}...")
    
    team1_stats = scrape_team_stats(league_url, team1_name)
    team2_stats = scrape_team_stats(league_url, team2_name)
    
    if team1_stats and team2_stats:
        print("Successfully fetched stats for both teams.")
        return team1_stats, team2_stats
    else:
        print("Failed to fetch stats for one or both teams.")
        return None


# Example usage
if __name__ == '__main__':
    league_url = 'https://fbref.com/en/comps/9/Premier-League-Stats'  # Modify as needed
    team1_name = 'Liverpool'  # Modify to select the first team
    team2_name = 'Manchester Utd'  # Modify to select the second team
    
    teams_stats = scrape_two_teams_stats(league_url, team1_name, team2_name)
    
    if teams_stats:
        team1_stats, team2_stats = teams_stats
        print(f"Stats for {team1_name}:")
        print(f"Goals Scored: {team1_stats['goals_scored']}")
        print(f"Goals Conceded: {team1_stats['goals_conceded']}")
        print(f"xG Wins Count: {team1_stats['xG_wins_count']}")
        print(f"Shots on Target: {team1_stats['shots_on_target']}\n")
        
        print(f"Stats for {team2_name}:")
        print(f"Goals Scored: {team2_stats['goals_scored']}")
        print(f"Goals Conceded: {team2_stats['goals_conceded']}")
        print(f"xG Wins Count: {team2_stats['xG_wins_count']}")
        print(f"Shots on Target: {team2_stats['shots_on_target']}")
    else:
        print("Failed to fetch stats for one or both teams.")
