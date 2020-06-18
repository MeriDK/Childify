from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from Statistic.views import StatisticAPIView

urlpatterns = [
    path('user/<int:user_id>/family/statistic', StatisticAPIView.as_view()),
]