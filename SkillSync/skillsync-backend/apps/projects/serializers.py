from rest_framework import serializers
from .models import Project, Milestone
from apps.skills.models import Skill


# =========================
# Milestone Serializer
# =========================
class MilestoneSerializer(serializers.ModelSerializer):
    # Map frontend `completed` -> backend `is_completed`
    completed = serializers.BooleanField(
        source="is_completed",
        required=False
    )

    class Meta:
        model = Milestone
        fields = (
            "id",
            "title",
            "completed",
        )
        read_only_fields = ("id",)


# =========================
# Project Serializer
# =========================
class ProjectSerializer(serializers.ModelSerializer):
    # 🔒 Always guarantee a valid status
    status = serializers.ChoiceField(
        choices=Project.STATUS_CHOICES,
        default="planned"
    )

    # Frontend field mappings
    userId = serializers.IntegerField(source="user.id", read_only=True)
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)
    updatedAt = serializers.DateTimeField(source="updated_at", read_only=True)

    startDate = serializers.DateField(
        source="start_date",
        required=False,
        allow_null=True
    )
    endDate = serializers.DateField(
        source="end_date",
        required=False,
        allow_null=True
    )

    milestones = MilestoneSerializer(many=True, required=False)

    skills = serializers.PrimaryKeyRelatedField(
        queryset=Skill.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Project
        fields = (
            "id",
            "userId",
            "title",
            "description",
            "status",
            "skills",
            "milestones",
            "startDate",
            "endDate",
            "createdAt",
            "updatedAt",
        )

    # =========================
    # CREATE
    # =========================
    def create(self, validated_data):
        milestones_data = validated_data.pop("milestones", [])
        skills = validated_data.pop("skills", [])

        project = Project.objects.create(
            user=self.context["request"].user,
            **validated_data
        )

        if skills:
            project.skills.set(skills)

        for m in milestones_data:
            Milestone.objects.create(
                project=project,
                title=m.get("title"),
                is_completed=m.get("is_completed", False),
            )

        return project

    # =========================
    # UPDATE  ✅ (THIS WAS MISSING)
    # =========================
    def update(self, instance, validated_data):
        milestones_data = validated_data.pop("milestones", None)
        skills = validated_data.pop("skills", None)

        # Update scalar fields safely
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        # Update skills if provided
        if skills is not None:
            instance.skills.set(skills)

        # Replace milestones if provided
        if milestones_data is not None:
            instance.milestones.all().delete()
            for m in milestones_data:
                Milestone.objects.create(
                    project=instance,
                    title=m.get("title"),
                    is_completed=m.get("is_completed", False),
                )

        return instance
