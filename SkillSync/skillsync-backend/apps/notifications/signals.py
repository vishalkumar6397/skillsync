from django.db.models.signals import post_save
from django.dispatch import receiver

from apps.skills.models import Skill
from apps.projects.models import Project
from .models import Notification


@receiver(post_save, sender=Skill)
def skill_created_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            title="New Skill Added",
            message=f"You added {instance.name}"
        )


@receiver(post_save, sender=Project)
def project_created_notification(sender, instance, created, **kwargs):
    if created:
        Notification.objects.create(
            user=instance.user,
            title="New Project Created",
            message=f"Project '{instance.title}' was created"
        )
