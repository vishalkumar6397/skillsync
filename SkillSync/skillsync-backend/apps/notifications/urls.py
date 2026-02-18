from django.urls import path
from .views import (
    NotificationListView,
    UnreadCountView,
    MarkAsReadView,
    MarkAllReadView,
    NotificationDeleteView,
    ClearAllNotificationsView,
)

urlpatterns = [
    path("", NotificationListView.as_view()),
    path("unread-count/", UnreadCountView.as_view()),
    path("<int:pk>/read/", MarkAsReadView.as_view()),
    path("mark-all-read/", MarkAllReadView.as_view()),
    path("<int:pk>/", NotificationDeleteView.as_view()),
    path("", ClearAllNotificationsView.as_view()),
]
