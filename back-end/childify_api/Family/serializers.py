from rest_framework import serializers

from .models import Family

class FamilyCreateSerializer(serializers.ModelSerializer):
  class Meta:
    model = Family
    fields = ['name']

class FamilyConnectSerializer(serializers.ModelSerializer):
  class Meta:
    model = Family
    fields = []
