from rest_framework.response import Response

from .models import Item
from .serializers import ItemSerializer
from rest_framework import viewsets
from rest_framework import generics, mixins


class ItemListView(generics.ListCreateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def get_queryset(self):
        queryset = Item.objects.all()
        family = self.request.query_params.get('family', None)
        child = self.request.query_params.get('child', None)
        status = self.request.query_params.get('status', None)
        if family:
            queryset = queryset.filter(family=family)
        if child:
            queryset = queryset.filter(child=child)
        if status:
            queryset = queryset.filter(status=status)
        return queryset


class ItemView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def delete(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()
        if item.child:
            return Response({'message': 'you cant delete item if child chose it'}, status=400)
        return self.destroy(request, *args, **kwargs)
