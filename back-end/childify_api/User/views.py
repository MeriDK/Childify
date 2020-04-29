from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from User.models import User
from User.serializers import UserSerializer


class UserAPIView(APIView):

  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      user = User.object.create_user(serializer.data['email'],serializer.data['username'],serializer.data['password'],serializer.data['isParent'])
      refreshToken = RefreshToken.for_user(user=user)
      return JsonResponse({'refreshToken': str(refreshToken), 'accessToken': str(refreshToken.access_token)}, status=201)
    return JsonResponse(serializer.errors, status=400)
