# from .base import *


# # ===============================
# # DEBUG
# # ===============================
# DEBUG = True

# # ===============================
# # ALLOWED HOSTS (LOCAL DEV)
# # ===============================
# ALLOWED_HOSTS = [
#     "127.0.0.1",
#     "localhost",
#     "0.0.0.0",
# ]

# # ===============================
# # DATABASE (LOCAL DEV - SQLITE)
# # ===============================
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.sqlite3",
#         "NAME": BASE_DIR / "db.sqlite3",
#     }
# }
# # 
# # ===============================
# # CORS (DEV ONLY)
# # ===============================
# CORS_ALLOW_ALL_ORIGINS = True



from .base import *

DEBUG = False

ALLOWED_HOSTS = [
    "skillsync-2-xeu9.onrender.com",
    "localhost",
    "127.0.0.1",
]

CORS_ALLOW_ALL_ORIGINS = False
