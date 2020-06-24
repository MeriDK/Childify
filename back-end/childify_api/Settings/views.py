from django.http import JsonResponse
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response

from User.models import User
from User.serializers import UserSerializer
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
        print('Damn')
        user = get_object_or_404(User, pk=user_id)
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
    
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

