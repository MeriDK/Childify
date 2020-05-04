from django.http import JsonResponse

from .models import ChildPrize
from .serializers import ChildPrizeSerializer
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import mixins

from Prize.models import Prize
from Child.models import Child


class ChildPrizeViewSet(viewsets.ModelViewSet):
    serializer_class = ChildPrizeSerializer
    queryset = ChildPrize.objects.all()


class ChildPrizeList(generics.ListAPIView, generics.GenericAPIView, mixins.CreateModelMixin):
    serializer_class = ChildPrizeSerializer

    def get_queryset(self):
        queryset = ChildPrize.objects.all()
        child_id = self.request.query_params.get('child_id', None)
        status_id = self.request.query_params.get('status_id', None)
        if child_id:
            queryset = queryset.filter(child_id=child_id)
            if status_id:
                queryset = queryset.filter(status_id=status_id)
        return queryset

    def post(self, request, *args, **kwargs):
        serializer_class = ChildPrizeSerializer(data=request.data)
        if serializer_class.is_valid():
            child = Child.object.filter(id=request.data['child_id']).first()
            prize = Prize.objects.filter(id=request.data['prize_id']).first()
            if child.family.id != prize.family_id.id:
                return JsonResponse({'message': 'child and prize have different families'}, status=400)
            queryset = ChildPrize.objects.all()
            return self.create(request, *args, **kwargs)
        return JsonResponse(serializer_class.errors, status=400)
