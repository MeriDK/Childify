from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ItemView, ItemListView


urlpatterns = format_suffix_patterns([
    path('item/', ItemListView.as_view()),
    path('item/<int:pk>/', ItemView.as_view())
])
