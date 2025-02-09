# Kick-Oracle

**Kick-Oracle** is a football match winner prediction system that leverages machine learning techniques and web scraping to gather real-time team statistics. It analyzes various performance metrics to predict the probable winner of an upcoming match.

## Live Demo
🔗 [Kick-Oracle](https://kick-oracle-xcry.onrender.com/)

## Features
- **Machine Learning-Based Predictions**: Uses advanced ML models to analyze past performance and predict match outcomes.
- **Web Scraping**: Collects real-time football team statistics from the web.
- **User-Friendly Interface**: Simple UI to select teams and view predictions.
- **League-Based Team Selection**: Allows users to choose teams from different leagues.

## Technologies Used
- **Frontend**: React.js (for an interactive UI)
- **Backend**: Flask (for API and ML model integration)
- **Web Scraping**: BeautifulSoup (for extracting football statistics)
- **Machine Learning**: Scikit-learn, TensorFlow/PyTorch (for prediction models)
- **Deployment**: Render (for hosting the application)

## Installation & Setup
### Prerequisites
- Python 3.x
- Node.js (for frontend development)
- Virtual environment (recommended)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/naveen-rajesh/Kick-Oracle.git
cd Kick-Oracle/api

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the backend server
flask run
```

### Frontend Setup
```bash
cd Kick-Oracle/frontend-vite

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage
1. Open the application in your browser.
2. Select a league and teams from the dropdown list.
3. Click the **Predict** button.
4. View the predicted winner and statistics.

## Contributors
- **Naveen**
- **Shansita Shri**

