from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from Child.views import ChildAPIView

urlpatterns = format_suffix_patterns([
    path('user/points/', ChildAPIView.as_view()),
])
