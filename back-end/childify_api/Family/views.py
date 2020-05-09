from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from Child.models import Child
from Family.models import Family
from Family.serializers import FamilyCreateSerializer, FamilyGetSerializer
from Parent.models import Parent
from User.models import User


class FamilyStatisticAPIView(APIView):
  def get(self, request, id):
    family = Family.object.filter(id=id)
    if family:
      parents = [{"user_id": member.user.user_id, "username": member.user.username, "is_parent": member.user.isParent} for member in Parent.object.filter(family=id)]
      childres = [{"user_id": member.user.user_id, "username": member.user.username, "is_parent": member.user.isParent} for member in Child.object.filter(family=id)]
      
      return JsonResponse({'family_id': family.first().id, 'family': parents + childres}, status=200)
    return JsonResponse({'nsg':'Family does not exist'}, status=404)

class FamilyAPIView(APIView):

  permission_classes = (IsAuthenticated,)

  def check_object_family(self, user):
    if user.isParent:
      try:
        return Parent.object.filter(user=user)
      except Parent.DoesNotExist:
        return None
    else:
      try:
        return Child.object.filter(user=user)
      except Child.DoesNotExist:
        return None

  # check if user in family
  def get(self, request):
    check = self.check_object_family(request.user)
    if check:
      return JsonResponse({'family_id': check.first().family.id}, status=200)
    return JsonResponse({}, status=412)

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
      return JsonResponse({"family":family.id}, status=201)
    return JsonResponse(serializer.errors, status=400)


class FamilyUserAPIView(APIView):

  permission_classes = (IsAuthenticated,)

  def get_object_family(self, family_id):
      return Family.object.filter(id=family_id).first()

  def get_object_parent(self, user):
      return Parent.object.filter(user=user).first()

  def get_object_child(self, user):
      return Child.object.filter(user=user).first()

  def check_object_family(self, user):
    if user.isParent:
      try:
        return Parent.object.filter(user=user)
      except Parent.DoesNotExist:
        return None
    else:
      try:
        return Child.object.filter(user=user)
      except Child.DoesNotExist:
        return None


  def post(self, request, family_id):
    if request.method == "POST":
      family = self.get_object_family(family_id)
      if not family:
        return JsonResponse({"msg": "error"}, status=400)
      if self.check_object_family(request.user):
        return JsonResponse({"msg": "already connected"}, status=405)
      if request.user.isParent:
        parent = self.get_object_parent(request.user)
        if not parent:
          Parent.object.create_parent(family, request.user)
      else:
        child = self.get_object_child(request.user)
        if not child:
          Child.object.create_child(family, request.user)

      return JsonResponse({}, status=201)
