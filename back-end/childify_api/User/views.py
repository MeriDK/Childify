from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from User.models import User
from User.serializers import UserSerializer, CustomTokenObtainPairSerializer


class UserAPIView(APIView):

  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      user = User.object.create_user(serializer.data['email'],serializer.data['username'],serializer.data['password'],serializer.data['isParent'])
      refreshToken = CustomRefreshToken.for_user(user=user)
      return JsonResponse({'refreshToken': str(refreshToken), 'accessToken': str(refreshToken.access_token)}, status=201)
    return JsonResponse(serializer.errors, status=400)


class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token['isParent'] = user.isParent
        return token


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
