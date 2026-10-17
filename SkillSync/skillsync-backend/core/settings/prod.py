# from .base import *

# # DEBUG = False

# # ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "").split(",")

# # # ===============================
# # # CORS (PRODUCTION)
# # # ===============================
# # CORS_ALLOWED_ORIGINS = [
# #     "https://skill-sync-sage-nu.vercel.app",  
# # ]

# # CORS_ALLOW_CREDENTIALS = True

# DEBUG = False

# ALLOWED_HOSTS = ['*']

# STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# MIDDLEWARE = [
#     'django.middleware.security.SecurityMiddleware',
#     'whitenoise.middleware.WhiteNoiseMiddleware',
#     ...
# ]


import os
from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "skillsync-2-xeu9.onrender.com",
]

CORS_ALLOWED_ORIGINS = [
    "https://skill-sync-sage-nu.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://skillsync-2-xeu9.onrender.com",
    "https://skill-sync-sage-nu.vercel.app",
]

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]
