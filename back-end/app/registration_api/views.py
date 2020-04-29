from django.http import HttpResponse, JsonResponse
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from childify_registry import settings
from childify_registry.api.models import Family, User, Parent, Child
from .serializers import UserSerializer, FamilyCreateSerializer, FamilyConnectSerializer
from rest_framework.views import APIView

class UserAPIView(APIView):

  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      user = User.object.create_user(serializer.data['email'],serializer.data['username'],serializer.data['password'],serializer.data['isParent'])
      refreshToken = RefreshToken.for_user(user=user)
      return JsonResponse({'refreshToken': str(refreshToken), 'accessToken': str(refreshToken.access_token)}, status=201)
    return JsonResponse(serializer.errors, status=400)


class FamilyAPIView(APIView):

  permission_classes = (IsAuthenticated,)

  def check_object_family(self, user):
    try:
      if user.isParent:
       return Parent.object.filter(user_id=user.user_id)
      else:
        return Child.object.filter(user_id=user.user_id)
    except Child.DoesNotExist:
      return None

  def post(self, request):
    serializer = FamilyCreateSerializer(data=request.data)
    if serializer.is_valid():
      if self.check_object_family(request.user):
        return JsonResponse({"msg": "already connected"}, status=405)

      family = Family.object.create_family(serializer.data['name'])
      if request.user.isParent:
        Parent.object.create_parent(family, request.user)
      else:
        Child.object.create_child(family, request.user)
      return JsonResponse({"family_id":family.family_id}, status=201)
    return JsonResponse(serializer.errors, status=400)


class FamilyUserAPIView(APIView):

  permission_classes = (IsAuthenticated,)

  def get_object_family(self, family_id):
    try:
      return Family.object.get(family_id=family_id)
    except Family.DoesNotExist:
      return None

  def get_object_parent(self, user_id):
    try:
      return Parent.object.get(user_id=user_id)
    except Parent.DoesNotExist:
      return None

  def get_object_child(self, user_id):
    try:
      return Child.object.get(user_id=user_id)
    except Child.DoesNotExist:
      return None

  def check_object_family(self, user):
    try:
      if user.isParent:
       return Parent.object.filter(user_id=user.user_id)
      else:
        return Child.object.filter(user_id=user.user_id)
    except Child.DoesNotExist:
      return None


  def post(self, request, family_id):
    if request.method == "POST":
      family = self.get_object_family(family_id)

      if not family:
        return JsonResponse("error", status=400)
      if self.check_object_family(request.user):
        return JsonResponse({"msg": "already connected"}, status=405)
      if request.user.isParent:
        parent = self.get_object_parent(request.data.user_id)
        print("ok")
        if not parent:
          print(family)
          Parent.object.create_parent(family, request.user)
      else:
        child = self.get_object_child(request.user.user_id)
        if not child:
          Child.object.create_child(family, request.user)

      return JsonResponse({}, status=201)

