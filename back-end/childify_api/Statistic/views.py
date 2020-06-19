from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from User.models import User
from Child.models import Child
from Family.models import Family
from Parent.models import Parent
from Task.models import Task
from Shop.models import Item

from datetime import date, timedelta, datetime
from django.utils import timezone

class StatisticAPIView(APIView):
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

                tasks = [{'title': event.name_task, 'status': event.status, 'category': event.category, 'points': event.point_task, 'time': event.date, 'executor': {'id': event.id_child.user.user_id, 'numIcon': event.id_child.user.numIcon}} for event in Task.object.filter(id_family=family).filter(id_child__isnull=False).filter(date__gte=timezone.now() -timedelta(1)).order_by('-date')[:3]]
                #rewards = Item.objects.filter(family=family).order_by('-id')[:3]
                #rewards = Task.object.filter(id_family=family).filter(id_child__isnull=False).order_by('-id')[:3]
                return JsonResponse({'events': tasks}, status=200)
            
            
        return JsonResponse({'events': []}, status=404)
