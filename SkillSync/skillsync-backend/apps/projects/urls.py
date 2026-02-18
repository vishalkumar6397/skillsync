from django.urls import path
from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    ToggleMilestoneView,
)

urlpatterns = [
    path("", ProjectListCreateView.as_view()),
    path("<int:pk>/", ProjectDetailView.as_view()),
    path(
        "<int:project_id>/milestones/<int:milestone_id>/",
        ToggleMilestoneView.as_view(),
    ),
]
