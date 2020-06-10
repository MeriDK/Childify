from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from Child.models import Child
from Family.models import Family
from Parent.models import Parent
from User.models import User
from Task.models import Task
# Item is a Prize... You know... smels.
from Shop.models import Item
from Task.serializers import TaskSerializer

class UserStatisticAPIView(APIView):
  
  permission_classes = (IsAuthenticated,)
  
  def member_validation(self, family_id, user_id):
    user = Parent.object.filter(family_id=family_id).filter(user_id=user_id)
    if user:
      return user.first()
    user = Child.object.filter(family_id=family_id).filter(user_id=user_id)
    if user:
      return user.first()
    return None
  
  def get(self, request, family_id, user_id):
    user = self.member_validation(family_id, user_id)
    if user:
      response = None
      if type(user)==Parent:
        response = {'user_id': user.user_id,'family': {'name':Family.object.filter(id=family_id).first().name,'size': len(Parent.object.filter(family_id=family_id))+len(Child.object.filter(family_id=family_id))},'statistic': {'prizes': {'accomplised': 0,'amout': 3},'activity': [{'day': [],'accomplished_prizes': []},{'day':[],'reviewd_tasks':[]}]}}

        return JsonResponse(response, status=200)
      else:
        response = {'user_id': user.user_id,'family': {'name':Family.object.filter(id=family_id).first().name,'size': len(Parent.object.filter(family_id=family_id))+len(Child.object.filter(family_id=family_id))},'statistic': {'prizes': {'accomplised': 0,'amout': 3},'activity': [{'day': [],'accomplished_prizes': []},{'day':[],'reviewd_tasks':[]}]}}
        return JsonResponse(response, status=200)
    else:
      return JsonResponse({'msg': 'No family'}, status=404)

class FamilyStatisticAPIView(APIView):
  
  permission_classes = (IsAuthenticated,)

  def get(self, request, id):
    if User.object.filter(user_id=id):
      family = Parent.object.filter(user_id=id).first()
      if not family:
        family = Child.object.filter(user_id=id).first().family
      else:
        family = family.family
    
    if family:
      parents = [{'user_id': member.user.user_id, 'username': member.user.username, 'numIcon': member.user.numIcon, 'is_parent': member.user.isParent} for member in Parent.object.filter(family=family)]

      tasks = Task.object.filter(id_family=family)
      rewards = Item.objects.filter(family=family)

      selected_tasks = tasks.filter(status=2)


      childres = [{'user_id': member.user.user_id, 'username': member.user.username, 'numIcon': member.user.numIcon, 'is_parent': member.user.isParent, 'statistic': {'points': member.points, 'tasks': {'accomplised': 8, 'selected': 43, 'canceled': 2}, 'rewards': 8}} for member in Child.object.filter(family=family)]
      
      

      return JsonResponse({'family_id': family.id, 'family': parents + childres}, status=200)
    return JsonResponse({'msg':'Family does not exist'}, status=404)

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
    if self.check_object_family(request.user):
      return JsonResponse({'msg': 'already connected'}, status=405)

    family = Family.object.create_family()
    if request.user.isParent:
      Parent.object.create_parent(family, request.user, request.data['username'])
    else:
      Child.object.create_child(family, request.user, request.data['username'])
    return JsonResponse({'family':family.id}, status=201)


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


  def patch(self, request, family_id):
    if request.method == 'PATCH':
      family = self.get_object_family(family_id)
      if not family:
        return JsonResponse({'msg': 'error'}, status=400)
      if self.check_object_family(request.user):
        return JsonResponse({'msg': 'already connected'}, status=405)
      if request.user.isParent:
        parent = self.get_object_parent(request.user)
        if not parent:
          Parent.object.create_parent(family, request.user, request.data['username'])
      else:
        child = self.get_object_child(request.user)
        if not child:
          Child.object.create_child(family, request.user, request.data['username'])

      return JsonResponse({}, status=200)
