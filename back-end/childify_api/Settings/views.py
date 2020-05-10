from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from User.models import User
from Child.models import Child
from Family.models import Family
from Parent.models import Parent

class SettingsAPIView(APIView):
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
                return JsonResponse({'username': user.username, 'email': user.email, 'family_id': family.id})
            
        return JsonResponse({'msg': 'No user exist'})
