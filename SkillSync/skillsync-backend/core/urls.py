from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


# =========================
# Health check (Render)
# =========================
def health_check(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    # =========================
    # Admin
    # =========================
    path("admin/", admin.site.urls),

    # =========================
    # Health check (IMPORTANT)
    # =========================
    path("health/", health_check),  
    # =========================
    # Authentication & Users
    # =========================
    path("api/auth/", include("apps.users.urls")),
    path("api/users/", include("apps.users.urls")),

    # =========================
    # Core APIs
    # =========================
    path("api/skills/", include("apps.skills.urls")),
    path("api/projects/", include("apps.projects.urls")),
    path("api/notifications/", include("apps.notifications.urls")),
    path("api/dashboard/", include("apps.dashboard.urls")),
]
