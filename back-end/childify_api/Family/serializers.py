from rest_framework import serializers

from .models import Family

class FamilyGetSerializer(serializers.ModelSerializer):
  class Meta:
    model = Family
    fields = ['id']

