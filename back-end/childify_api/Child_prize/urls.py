from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ChildPrizeViewSet, ChildPrizeList


child_prize_detail = ChildPrizeViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update'
})

urlpatterns = format_suffix_patterns([
    path('child_prize/', ChildPrizeList.as_view()),
    path('child_prize/<int:pk>/', child_prize_detail)
])
