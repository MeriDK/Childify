from .models import Prize
from .serializers import PrizeSerializer
from rest_framework import viewsets
from rest_framework import generics


class PrizeViewSet(viewsets.ModelViewSet):
    serializer_class = PrizeSerializer
    queryset = Prize.objects.all()


class PrizeList(generics.ListAPIView, generics.CreateAPIView):
    serializer_class = PrizeSerializer

    def get_queryset(self):
        queryset = Prize.objects.all()
        family_id = self.request.query_params.get('family_id', None)
        if family_id:
            queryset = queryset.filter(family_id=family_id)
        return queryset
