from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from .models import Project, Milestone
from .serializers import ProjectSerializer


class ProjectListCreateView(generics.ListCreateAPIView):
    """
    GET  /api/projects/        -> List user's projects
    POST /api/projects/        -> Create project with optional milestones
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        """
        Pass request to serializer so we can access request.user
        inside ProjectSerializer.create()
        """
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    GET    /api/projects/:id/
    PUT    /api/projects/:id/
    DELETE /api/projects/:id/
    """
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)


class ToggleMilestoneView(generics.GenericAPIView):
    """
    PATCH /api/projects/:project_id/milestones/:milestone_id/
    """
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, project_id, milestone_id):
        milestone = get_object_or_404(
            Milestone,
            id=milestone_id,
            project__id=project_id,
            project__user=request.user,
        )

        milestone.is_completed = not milestone.is_completed
        milestone.save()

        return Response(
            {
                "status": "updated",
                "is_completed": milestone.is_completed,
            },
            status=status.HTTP_200_OK,
        )
