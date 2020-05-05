from django.http import JsonResponse
from rest_framework.response import Response

from .models import Item
from .serializers import ItemSerializer
from rest_framework import generics
from Child.models import Child


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

    def post(self, request, *args, **kwargs):
        if request.data.get('child', None):
            return Response({'message': 'no child in post'}, status=400)
        return self.create(request, *args, **kwargs)


class ItemView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def delete(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()
        if item.child:
            return Response({'message': 'you cant delete item if child chose it'}, status=400)
        return self.destroy(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):
        if request.data.get('child', None):
            return Response({'message': 'cant change child, use /confirm or /set-child instead'}, status=400)
        if request.data.get('family', None):
            return Response({'message': 'changing family is forbidden'}, status=400)
        return self.partial_update(request, *args, **kwargs)


class ItemSetChildView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def patch(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()

        if item.child:
            return Response({'message': 'child already set'}, status=400)

        child = request.data.get('child', None)
        if not child:
            return Response({'message': 'child info should be in body'}, status=400)

        data = {
            'child': child,
            'status': 1
        }
        # delete all unnecessary fields and set needed data
        request._full_data = data
        return self.partial_update(request, *args, **kwargs)


class ItemConfirmView(generics.UpdateAPIView):
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

    def patch(self, request, *args, **kwargs):
        queryset = Item.objects.all()
        item = queryset.filter(id=self.kwargs['pk']).first()

        if item.child is None:
            return Response({'message': 'child should be set'}, status=400)

        data = {
            'status': 2
        }
        # delete all unnecessary fields and set needed data
        request._full_data = data
        return self.partial_update(request, *args, **kwargs)
