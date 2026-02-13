# Asset Angel Backend (Flask)

## Setup Instructions

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Variables
Copy `.env.example` to `.env` and update with your database credentials:
```bash
cp .env.example .env
```

### 3. Database Setup
Import the SQL schema:
```bash
mysql -u root -p asset_angel < database.sql
```

### 4. Run the Server
```bash
python app.py
```

The server will start on `http://localhost:5000`

### 5. Health Check
```bash
curl http://localhost:5000/api/v1/health
```

## Project Structure
```
server/
├── app.py                 # Main Flask application
├── routes/                # API endpoints
├── models/                # Database models (coming soon)
├── config/                # Configuration files
├── utils/                 # Utility functions
├── database.sql           # Database schema
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (local)
└── .env.example          # Environment variables template
```

## Next Steps
1. Connect to MySQL database
2. Create SQLAlchemy models
3. Implement API endpoints
4. Add authentication/JWT
5. Add input validation
