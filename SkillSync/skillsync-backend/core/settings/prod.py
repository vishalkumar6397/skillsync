from .base import *

DEBUG = False

ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")

# ===============================
# CORS (PRODUCTION)
# ===============================
CORS_ALLOWED_ORIGINS = [
    "https://skill-sync-sage-nu.vercel.app",  
]

CORS_ALLOW_CREDENTIALS = True
