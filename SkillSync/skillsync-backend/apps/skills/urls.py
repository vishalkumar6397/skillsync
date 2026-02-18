from django.urls import path
from .views import SkillListCreateView, SkillDetailView

urlpatterns = [
    path("", SkillListCreateView.as_view()),
    path("<int:pk>/", SkillDetailView.as_view()),
]


