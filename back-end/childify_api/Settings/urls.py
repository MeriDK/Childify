from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from Settings.views import SettingsAPIView

urlpatterns = [
    path('user/<int:user_id>/settings', SettingsAPIView.as_view()),
]