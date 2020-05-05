from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ItemView, ItemListView, ItemSetChildView, ItemConfirmView


urlpatterns = format_suffix_patterns([
    path('item/', ItemListView.as_view()),
    path('item/<int:pk>/', ItemView.as_view()),
    path('item/<int:pk>/set-child/', ItemSetChildView.as_view()),
    path('item/<int:pk>/confirm/', ItemConfirmView.as_view())
])
