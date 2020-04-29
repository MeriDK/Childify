from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import PrizeViewSet, PrizeList


prize_detail = PrizeViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
    'delete': 'destroy'
})

urlpatterns = format_suffix_patterns([
    path('prize/', PrizeList.as_view()),
    path('prize/<int:pk>/', prize_detail)
])
