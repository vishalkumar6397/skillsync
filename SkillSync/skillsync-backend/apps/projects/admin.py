from django.contrib import admin
from .models import Project, Milestone


class MilestoneInline(admin.TabularInline):
    model = Milestone
    extra = 1


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "status", "user", "created_at")
    list_filter = ("status",)
    search_fields = ("title", "description")
    inlines = [MilestoneInline]


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    list_display = ("title", "project", "is_completed", "created_at")
    list_filter = ("is_completed",)
