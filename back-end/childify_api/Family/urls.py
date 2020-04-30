from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from Family.views import FamilyUserAPIView, FamilyAPIView

urlpatterns = format_suffix_patterns([
    path('family/<int:family_id>/user', FamilyUserAPIView.as_view()),
    path('family/', FamilyAPIView.as_view()),
])
