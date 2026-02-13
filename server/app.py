import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# CORS Configuration
CORS(app, origins=os.getenv('CORS_ORIGIN', 'http://localhost:5173'))

# Configuration
app.config['ENV'] = os.getenv('FLASK_ENV', 'development')
app.config['DEBUG'] = os.getenv('FLASK_ENV', 'development') == 'development'

# Database Configuration (when you connect it)
# app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT')}/{os.getenv('DB_NAME')}"

# Routes
@app.route('/api/v1/health', methods=['GET'])
def health():
    return {'status': 'Backend is running'}, 200

@app.route('/', methods=['GET'])
def home():
    return {'message': 'Asset Angel Backend API'}, 200

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, port=port)
