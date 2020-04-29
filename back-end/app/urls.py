from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from childify_registry.api import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('family/<int:family_id>/user', views.FamilyUserAPIView.as_view()),
    path('family/', views.FamilyAPIView.as_view()),
    path('user/',views.UserAPIView.as_view()),
    path('login/token', TokenObtainPairView.as_view()),
    path('login/refresh', TokenRefreshView.as_view()),
    path('login/verify', TokenVerifyView.as_view())
]
