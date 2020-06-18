from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from User.models import User
from Child.models import Child
from Family.models import Family
from Parent.models import Parent

class SettingsAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, user_id):
        user = User.object.filter(user_id=user_id).first()
        if user:
            if user.isParent:
                family = Parent.object.filter(user=user).first()
                if family:
                    family = family.family
            else:
                family = Child.object.filter(user=user).first()
                if family:
                    family = family.family
            if family:
                return JsonResponse({'username': user.username,'numIcon': user.numIcon, 'email': user.email, 'family_id': family.id})
            
            return JsonResponse({'username': user.username,'numIcon': user.numIcon, 'email': user.email, 'family_id': None})
            
        return JsonResponse({'msg': 'No user exist'})

    def patch(self, request, user_id):
        user = User.object.filter(user_id=user_id).first()
        if user:
            user.username = request.data['username']
            user.numIcon = request.data['numIcon']
            user.email = request.data['email']
            user.save()
            return JsonResponse({'code': 200, 'msg': 'well done'})
        return JsonResponse({'code': 404, 'msg': request.data}) 
    
    def delete(self, request, user_id):
        user = User.object.filter(user_id=user_id).first()
        if user:
            if user.isParent:
                member = Parent.object.filter(user=user).first()
            else:
                member = Child.object.filter(user=user).first()
            
            if member:
                family = member.family
            
            if family:
                member.delete()
                return JsonResponse({'code': 200, 'msg': request.data})
            
        return JsonResponse({'msg': 'No user exist'})

