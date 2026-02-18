from django.urls import path
from .views import (
    DashboardStatsView,
    DashboardActivityView,
    DashboardProgressView,
)

urlpatterns = [
    path("stats/", DashboardStatsView.as_view()),
    path("activity/", DashboardActivityView.as_view()),
    path("progress/", DashboardProgressView.as_view()),
]
