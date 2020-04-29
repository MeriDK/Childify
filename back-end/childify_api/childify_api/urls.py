"""childify_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView, TokenVerifyView

from Family.views import FamilyUserAPIView, FamilyAPIView
from User.views import UserAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('family/<int:family_id>/user', FamilyUserAPIView.as_view()),
    path('family/', FamilyAPIView.as_view()),
    path('user/', UserAPIView.as_view()),
    path('login/token', TokenObtainPairView.as_view()),
    path('login/refresh', TokenRefreshView.as_view()),
    path('login/verify', TokenVerifyView.as_view()),
    path('', include('Prize.urls')),
    path('', include('Child_prize.urls'))
]
