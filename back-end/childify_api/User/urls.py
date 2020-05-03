from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView
from User.views import UserAPIView, CustomTokenObtainPairView

urlpatterns = format_suffix_patterns([
    path('user/', UserAPIView.as_view()),
    path('login/token/', CustomTokenObtainPairView.as_view()),
    path('login/refresh/', TokenRefreshView.as_view()),
    path('login/verify/', TokenVerifyView.as_view()),
])
