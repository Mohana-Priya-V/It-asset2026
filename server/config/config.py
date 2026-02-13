import os

class Config:
    """Base configuration"""
    FLASK_ENV = os.getenv('FLASK_ENV', 'development')
    DEBUG = FLASK_ENV == 'development'
    CORS_ORIGIN = os.getenv('CORS_ORIGIN', 'http://localhost:5173')

class DevelopmentConfig(Config):
    """Development configuration"""
    pass

class ProductionConfig(Config):
    """Production configuration"""
    DEBUG = False

# Database Configuration (Ready to connect)
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'port': int(os.getenv('DB_PORT', 3306)),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'asset_angel')
}
