from rest_framework import serializers
from .models import ChildPrize


class ChildPrizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChildPrize
        fields = '__all__'
