from .models import ChildPrize
from .serializers import ChildPrizeSerializer
from rest_framework import viewsets
from rest_framework import generics


class ChildPrizeViewSet(viewsets.ModelViewSet):
    serializer_class = ChildPrizeSerializer
    queryset = ChildPrize.objects.all()


class ChildPrizeList(generics.ListAPIView, generics.CreateAPIView):
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
