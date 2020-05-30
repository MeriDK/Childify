from django.shortcuts import render
from Child.models import Child
from django.http import JsonResponse
from rest_framework.views import APIView

class ChildAPIView(APIView):
    
  def get(self, request):
    user = request.user
    if user.isParent:
        return JsonResponse({"msg": "only for child"}, status=405)
    else:
        child =  Child.object.filter(user=user).first()

    return JsonResponse({'points': child.points}, status=201)
# Create your views here.