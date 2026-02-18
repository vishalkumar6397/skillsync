from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Count

from apps.skills.models import Skill
from apps.projects.models import Project, Milestone
from apps.notifications.models import Notification


class DashboardStatsView(APIView):
    """
    Dashboard top cards:
    - total skills
    - total projects
    - completed projects
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        total_skills = Skill.objects.filter(user=user).count()
        total_projects = Project.objects.filter(user=user).count()
        completed_projects = Project.objects.filter(
            user=user,
            status="completed"
        ).count()

        return Response({
            "total_skills": total_skills,
            "total_projects": total_projects,
            "completed_projects": completed_projects,
        })


class DashboardActivityView(APIView):
    """
    Unified recent activity feed
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        activities = []

        # Recent skills
        for skill in Skill.objects.filter(user=user).order_by("-created_at")[:5]:
            activities.append({
                "type": "skill",
                "message": f"Added skill {skill.name}",
                "date": skill.created_at,
            })

        # Recent projects
        for project in Project.objects.filter(user=user).order_by("-created_at")[:5]:
            activities.append({
                "type": "project",
                "message": f"Created project {project.title}",
                "date": project.created_at,
            })

        # Recent notifications
        for note in Notification.objects.filter(user=user).order_by("-created_at")[:5]:
            activities.append({
                "type": "notification",
                "message": note.title,
                "date": note.created_at,
            })

        # Sort all by date (latest first) and limit
        activities = sorted(
            activities,
            key=lambda x: x["date"],
            reverse=True
        )[:10]

        return Response(activities)


class DashboardProgressView(APIView):
    """
    Analytics for charts & progress bars
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # Skills by category (for pie/bar charts)
        skills_by_category = (
            Skill.objects
            .filter(user=user)
            .values("category")
            .annotate(count=Count("id"))
        )

        # Project progress (milestones completion)
        project_progress = []
        projects = Project.objects.filter(user=user)

        for project in projects:
            milestones = Milestone.objects.filter(project=project)
            total = milestones.count()
            completed = milestones.filter(is_completed=True).count()

            progress = 0
            if total > 0:
                progress = int((completed / total) * 100)

            project_progress.append({
                "project_id": project.id,
                "title": project.title,
                "progress": progress,
            })

        return Response({
            "skills_by_category": skills_by_category,
            "project_progress": project_progress,
        })
