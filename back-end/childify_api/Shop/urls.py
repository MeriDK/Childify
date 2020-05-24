from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from .views import ItemListView, ItemReceiveView, ItemConfirmView, ItemReturnView, ItemView

urlpatterns = format_suffix_patterns([
    path('item/', ItemListView.as_view()),
    path('item/<int:pk>/receive/', ItemReceiveView.as_view()),
    path('item/<int:pk>/confirm/', ItemConfirmView.as_view()),
    path('item/<int:pk>/return/', ItemReturnView.as_view()),
    path('item/<int:pk>/', ItemView.as_view())
])
